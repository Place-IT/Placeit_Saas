from django.conf.global_settings import EMAIL_HOST_USER
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from django.core.validators import validate_email, MinValueValidator, \
    MaxValueValidator, RegexValidator, validate_image_file_extension
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.crypto import get_random_string
from django_rest_passwordreset.signals import reset_password_token_created

from phonenumber_field.modelfields import PhoneNumberField
from department_module.models import Department


class UserManager(BaseUserManager):

    def create_user_custom(self, email, password, **kwargs):
        if email is None:
            raise TypeError('Users must have an  email.')
        if password is None:
            raise TypeError('users must have a password.')

        user = self.model(email=self.normalize_email(email))
        user.password = make_password(password)
        user.save(using=self._db)
        Group.objects.get(name='Student').user_set.add(user)

        return user

    def create_user(self, email, password, **kwargs):
        if email is None:
            raise TypeError('Users must have an  email.')
        if password is None:
            raise TypeError('users must have a password.')
        user = self.model(email=self.normalize_email(email))
        user.password = make_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.create_user(email, password)
        for x in Group.objects.all():
            x.user_set.add(user)

        user.is_staff = True
        user.is_active = True
        user.is_superuser=True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True, validators=[validate_email,   RegexValidator(
        regex='^[a-zA-Z0-9._%+-]+\-coemumbai@bvp.edu.in$',
        message='Email does not belong to bvp.edu',
        code='invalid_username'
    ),], blank=False)
    MIS_no = models.IntegerField(unique=True, validators=[], null=True, blank=True)

    Bio=models.TextField(default="  ",blank=True)

    First_name = models.CharField(max_length=225, null=True, blank=True)
    middle_name = models.CharField(max_length=225, null=True, blank=True)
    Last_name = models.CharField(max_length=225, null=True, blank=True)
    Date_Of_Birth = models.DateField(null=True, blank=True)

    Country_name = models.CharField(max_length=20, null=True, blank=True)
    State_name = models.CharField(max_length=20, null=True, blank=True)
    Locality_name = models.CharField(max_length=20, null=True, blank=True)
    PostalCode = models.IntegerField(null=True, validators=[RegexValidator(
        regex="^[0-9]{6}|[0-9]{3}\s[0-9]{3}$",
        message='Invalid postal Code',
        code='invalid_username'
    )], blank=True)

    Building_name_And_RoomNumber = models.CharField(null=True, blank=True,max_length=400)


    Student_phone_number = PhoneNumberField(region="IN", null=True, blank=True, )
    Parent_phone_number = PhoneNumberField(region="IN",null=True, blank=True)

    Roll_no = models.IntegerField(null=True, validators=[MinValueValidator(0), MaxValueValidator(100)], blank=True)

    JEE = models.DecimalField(max_digits=5, null=True, decimal_places=2,
                              validators=[MinValueValidator(0), MaxValueValidator(100)], blank=True)
    MhCET = models.DecimalField(max_digits=5, decimal_places=2, null=True,
                                validators=[MinValueValidator(0), MaxValueValidator(100)], blank=True)
    SSC = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(100)],
                              null=True, blank=True)
    HSC = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(100)],
                              null=True, blank=True)
    Diploma = models.DecimalField(max_digits=5, decimal_places=2,
                                  validators=[MinValueValidator(0), MaxValueValidator(100)],
                                  null=True, blank=True)

    Sem1 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem2 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem3 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem4 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem5 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem6 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)

    Sem7 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    Sem8 = models.DecimalField(max_digits=5, decimal_places=2,
                               validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)

    # avg of all

    DeadKT = models.BooleanField(default=False)
    No_Of_DeadKT = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(30)], null=True, blank=True)

    LiveKT = models.BooleanField(default=False)
    No_Of_LiveKT = models.IntegerField(default=False, validators=[MinValueValidator(0), MaxValueValidator(30)],
                                       null=True, blank=True)

    Gate_Status = models.BooleanField(default=False)
    future_options = models.CharField(max_length=10, null=True,
                                      choices=[("job", 'Job'), ("Hs", "Higher-Studies"), ("entru", "Entrepreneurship")],
                                      blank=True)

    linkedin_profile = models.URLField(validators=[RegexValidator(
        regex="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$",
        message='Username must be Alphanumeric',
        code='invalid_username'
    )], null=True, blank=True, )
    Github_profile = models.URLField(validators=[RegexValidator(
        regex="^https?://((www|\w\w)\.)?github.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$",
        message='Username must be Alphanumeric',
        code='invalid_username'
    )], null=True, blank=True, )

    Resume_profile = models.URLField(null=True, blank=True, validators=[RegexValidator(
        regex="((http|https)://)(www.)?" +
              "[a-zA-Z0-9@:%._\\+~#?&//=]" +
              "{2,256}\\.[a-z]" +
              "{2,6}\\b([-a-zA-Z0-9@:%" +
              "._\\+~#?&//=]*)",
        message='Username must be Alphanumeric',
        code='invalid_username'
    )])

    Internship = models.TextField(null=True, blank=True)

    Affliated_Department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True,blank=True)

    collage_passingYear = models.IntegerField(validators=[MinValueValidator(2015), MaxValueValidator(2050)], null=True, blank=True)

    collage_joinig_year = models.IntegerField(validators=[MinValueValidator(2015), MaxValueValidator(2050)], null=True, blank=True)


    i_card_image = models.ImageField(upload_to='UserImage', blank=True, null=True, validators=[validate_image_file_extension])

    re_password = models.CharField(max_length=128, help_text='just to check password twice', blank=True, null=True)
    email_token = models.CharField(max_length=53, blank=True, null=True)
    email_token_dateTime_expire = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    email_verified = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    is_faculty = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    @property
    def Full_name(self):
        return f'{self.First_name} {self.middle_name} {self.Last_name}'

    #
    # @property
    # def name(self):
    #     return f'{self.First_name} {self.Last_name}'

    def __str__(self):
        return f"{self.email}"

    class Meta:
        permissions = [("can_view_all_student", "access to view all student")]

    def create_email_Token(self):
        print(timezone.now() > self.email_token_dateTime_expire, timezone.now(), self.email_token_dateTime_expire)
        if timezone.now() > self.email_token_dateTime_expire:
            self.email_token = get_random_string(length=20)
            self.email_token_dateTime_expire = timezone.now() + timezone.timedelta(seconds=600)
            return True
        else:
            return False

    def get_absolute_url(self):
        return reverse('user-detail', kwargs={'pk': self.pk})

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokes
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('reset-password-confirm-frontend')),
            reset_password_token.key)
    }
    # print(reverse('reset-password-confirm-frontend'))
    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Placeit"),
        # message:
        email_plaintext_message,
        # from:
        EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
