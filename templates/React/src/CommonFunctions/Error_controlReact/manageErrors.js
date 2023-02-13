 function manageError(response) {
    if (response.status === 500) {
        window.location.href = "/error/500/"
    } else if (response.status === 400) {
        window.location.href = "/error/400/"
    } else if (response.status === 403) {
        window.location.href = "/error/403/"
    } else if (response.status === 404) {
        window.location.href = "/error/404/"
    } else {
        return response
    }
}

export default function manageErrorHoc(ev,function_to_run_on_error)
{
    if (function_to_run_on_error !== undefined)
    {
        return manageError(ev)
    }
    return ev
}