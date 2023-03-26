"""
Django settings for Placeit_Saas project.

Generated by 'django-admin startproject' using Django 4.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from pathlib import Path

from django.urls import reverse_lazy
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


ROOT_URLCONF = 'Placeit_Saas.urls'


WSGI_APPLICATION = 'Placeit_Saas.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/



# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

##### Custom Setup
load_dotenv()


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('Secret_key')
# print(os.getenv('PG_ADMIN_DBName'),os.getenv('PG_ADMIN_PASSWORD'),os.getenv('PG_ADMIN_USERNAME'))
if os.getenv("use_pg") == "False":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.getenv('PG_ADMIN_DBName'),
            'USER': os.getenv('PG_ADMIN_USERNAME'),
            'PASSWORD': os.getenv('PG_ADMIN_PASSWORD'),
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # # additional dependencies
    'rest_framework',
    'django_rest_passwordreset',
    "log_viewer",
    'guardian',
    'django_filters',
    'drf_api_logger',
    "phonenumber_field",
    'meta',

    ##########
    "user_module",
    "api_module",
    "frontend_module",
    "department_module",
    "company_module",
    "form_module"

]




# django password reset
DJANGO_REST_PASSWORDRESET_TOKEN_CONFIG = {
    "CLASS": "django_rest_passwordreset.tokens.RandomStringTokenGenerator",
    "DEFAULT_AUTHENTICATION_CLASSES":[
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication'
    ],
    "OPTIONS": {
        "min_length": 20,
        "max_length": 30
    },
}



# login url
LOGIN_URL = reverse_lazy('Login')


# django rest framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50,
    # 'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',

    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication'
        , ]
}


# password validator
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'Options': {
            'user_attriutes': ('email', "First_name", "Last_name"),
            'max_similarity': 0.4
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'Options': {
            'max_similarity': 7
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



# static file handler


STATICFILES_DIRS = [
    BASE_DIR / 'templates/React/static/',
    BASE_DIR / 'templates/Static/'
]
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "static"

# meid roots
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# email

EMAIL_HOST_USER =os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD =os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DATA_UPLOAD_MAX_MEMORY_SIZE = 100000000
FILE_UPLOAD_MAX_MEMORY_SIZE = 100000000




# dajngo phone number

PHONENUMBER_DEFAULT_REGION = "IN"
PHONENUMBER_DB_FORMAT = "NATIONAL"
PHONENUMBER_DEFAULT_FORMAT = "NATIONAL"


# Default User auth model
AUTH_USER_MODEL = 'user_module.User'


# # auth backend
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend', # this is default
    'guardian.backends.ObjectPermissionBackend',
)


MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    #additional dependencies
    'drf_api_logger.middleware.api_logger_middleware.APILoggerMiddleware',
]


DRF_API_LOGGER_DATABASE = True



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates',
                 BASE_DIR / 'templates/Static/errors',
                 BASE_DIR / 'templates/Static',
                 BASE_DIR / 'templates/React/templates/React_frontend/',
                 ]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



# Log viewer settings
LOG_VIEWER_FILES_PATTERN = '*.log*'
LOG_VIEWER_FILES_DIR = 'logsdir/'
LOG_VIEWER_PAGE_LENGTH = 25       # total log lines per-page
LOG_VIEWER_MAX_READ_LINES = 1000  # total log lines will be read
LOG_VIEWER_PATTERNS = ['INFO', 'DEBUG', 'WARNING', 'ERROR', 'CRITICAL']



from pathlib import Path
Path("./logsdir").mkdir(parents=True, exist_ok=True)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {

        'console':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/root_logger.log',
            'formatter': 'verbose'
        },
        'UserAuth':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/auth.log',
            'formatter': 'verbose'
        },
        'Form_Admin':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/Form.log',
            'formatter': 'verbose'
        },
        'Form_Response_toUser':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/Form_Response_toUser.log',
            'formatter': 'verbose'
        },
        'Form_UserResponse':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/Form_UserResponse.log',
            'formatter': 'verbose'
        },
        'Company_and_visiting':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/Company_and_visiting.log',
            'formatter': 'verbose'
        },
        'Department':{
            'level':'DEBUG',
            'class': 'logging.FileHandler',
            'filename':'./logsdir/Department.log',
            'formatter': 'verbose'
        },

    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'console': {
            'handlers':['console'],
            'level':'INFO',
            'propogate':True,

        },
        'UserLogger': {
            'handlers':['UserAuth'],
            'level':'INFO',
            'propogate':True,
        },
        'Form_Admin_Logger': {
            'handlers':['Form_Admin'],
            'level':'INFO',
            'propogate':True,
        },
        'Form_Response_to_User_Logger': {
            'handlers':['Form_Response_toUser'],
            'level':'INFO',
            'propogate':True,
        },
        'Form_UserResponse_Logger': {
            'handlers':['Form_UserResponse'],
            'level':'INFO',
            'propogate':True,
        },
        'Company_and_visiting_Logger': {
            'handlers':['Company_and_visiting'],
            'level':'INFO',
            'propogate':True,
        },
        'Department_Logger': {
            'handlers':['Department'],
            'level':'INFO',
            'propogate':True,
        },

    },
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    }
}


# drf logger
DRF_API_LOGGER_DATABASE = True
DRF_API_LOGGER_SIGNAL = True
DRF_LOGGER_QUEUE_MAX_SIZE = 50
DRF_API_LOGGER_EXCLUDE_KEYS = []


META_SITE_PROTOCOL="http"
META_SITE_DOMAIN="127.0.0.1:8000"
META_USE_OG_PROPERTIES=True
META_SITE_TYPE="educational"