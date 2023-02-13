export default function errorRedirect(number=404)
{
    window.location.href=`${window.location.origin}/errors/${number}`
}