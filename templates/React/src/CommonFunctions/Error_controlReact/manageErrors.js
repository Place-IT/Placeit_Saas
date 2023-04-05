 function manageError(response) {

}

export default function manageErrorHoc(ev,function_to_run_on_error)
{
    if (function_to_run_on_error !== undefined)
    {
        return manageError(ev)
    }
    return ev
}

function set_response(data,ret)
{
    ret["response"]=data
}
 export function Delete_check(response,ret) {
     if (response.ok) {
         set_response({Completed:"Succesfully deleted"},ret)
         return true
     } else if (response.status === 204) {
         console.log("successss")
         set_response({Completed:"Succesfully deleted"},ret)
         return true
     } else {
         set_response({error:"some error has occured"},ret)
         return false
     }
 }