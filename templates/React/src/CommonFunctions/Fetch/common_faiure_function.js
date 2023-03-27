import {logdata} from "../Logger/Logevents";

export default function commonFailurerfunction (res){

    if (Reflect.has(res,"error"))
    {return {response:res,type:false}}
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
    console.log(
        {response:{error:output},type:false}
    )
    return {response:{error:output},type:false}

}
