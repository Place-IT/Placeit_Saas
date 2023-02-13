
window.log_data=[]

export function logdata(function_name,log_type,message)
{
    log_data.push(
        {function_name:function_name,
        log_type:log_type,
        message:message,
        })
}