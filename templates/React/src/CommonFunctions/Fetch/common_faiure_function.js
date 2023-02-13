import {logdata} from "../Logger/Logevents";

export default function commonFailurerfunction (res){

    if (Reflect.has(res,"error"))
    {
        return {response:res,type:false}
    }
    console.log(res,"sssssssssssssssssssssssssssssssss",Object.entries(res))
    let output=""
    Object.entries(res).forEach(ev=>{
        if(Array.isArray(ev[1]))
        {
            output += `${ev[0]} - ${ev[1].join("")}  \n`
        }
        else
        {
            output += `${ev[0]} - ${ev[1]}  \n`
        }

    })

    // logdata("commonFailurerfunction","init",`Data url:"${url}"  req_obj:"${req_obj}"`)
    return {response:{error:output},type:false}

}
