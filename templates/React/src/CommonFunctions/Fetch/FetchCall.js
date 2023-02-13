import getCookie from "./getCookie"
import {logdata} from "../Logger/Logevents";

export default async function FetchCall(url,method,body,content_Type='application/json')
{

    let req_obj={
        mode: 'cors',
        credentials: 'include',
        method: method,
        cache: 'no-store',
        headers: {
            'Content-Type': content_Type,
            'X-CSRFToken': getCookie('csrftoken')
            },
         }
        if (body !== false)
        {
            if(Object.keys(body).includes("image"))
            {
                //because if image object is strigified before
                req_obj.body=body.form_data
            }
            else
            {
                req_obj.body= JSON.stringify(body)
            }
            logdata("FetchCall","pre-init",`no stringy error`)
        }
    logdata("FetchCall","init",`Data url:"${url}"  req_obj:"${req_obj}"`)

    let req = new Request(url, req_obj);
    return await fetch(req)
        // .then(ev=>manageErrorHoc(ev,function_to_run_on_error))
        .then(
            ev => ev.json()
        )

}





 async function FetchCall_success_failure_Key(
                                             url,method,body,successFunc=false,FailureFunc=false
                                            ,success=["success"],
                                            Failure=["success"],content_type='application/json'
                                             )
 {
    logdata("FetchCall_success_failure_Key","init",`Data url:"${url}" method:"${method}" body:"${body}" successFunc:"${successFunc}"`)
    let response=await FetchCall(url, method, body,content_type);

     let response_up=false
     let indicator=0
    success.forEach(ev=>{

        if (Reflect.has(response,ev))
        {
            if (successFunc === false)
            {
                indicator=0
                response_up={response:response,type:true}
            }
            else
            {
                indicator=1
                response_up=successFunc(response)
            }
        }
    })

     if (response_up === false) {
         Failure.forEach(ev => {
             if (Reflect.has(response, ev)) {
                 if (FailureFunc === false) {
                     indicator=2
                     response_up={response: response, type: false}
                 } else {
                     indicator=3
                     response_up = FailureFunc(response)
                 }
             }
         })

     }
     logdata("FetchCall_success_failure_Key","Completed",`Data response_up:"${response_up}" indicator:"${indicator}" `)
     return response_up
}





export { FetchCall_success_failure_Key as  FetchCallSFK }