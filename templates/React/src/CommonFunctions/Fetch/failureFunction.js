export default function wrapper(notin)
{
    return function failureDefaultFunction(res){
            
        if (notin.find((value, index, array)=>Reflect.has(res,value) === true) !== undefined)
        {
            return {response:res,type:false}
        }

        let output=""
        Object.entries(res).forEach(ev=>{output += `${ev[0]} - ${ev[1].join("")}  \n`})

        return {response:{error:output},type:false}
    
    }
}