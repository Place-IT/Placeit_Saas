
// input={
//     Dispatch: true or false
//     CustomFucnction: function
//     type:"input type"
//     state: function
//     setState: set function to be used
//     withdiv: skip or true
// }
// import Formcss  from "./../../components/CommonCss/form.module.css";
import React, {useState} from "react";
import basicSuccess from "./BasicSuccess";
import IconButton from "@mui/material/IconButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {logdata} from "../Logger/Logevents";



export default function InputCreatorB(input)
{
    input=input.input
    const [dualmode,setDualmode]=useState(false)
    let type=""

    function onChange(ev)
    {
        if (input.CustomFucnction === undefined)
        {
            basicSuccess(ev,input)

        }
        else
        {
            input.CustomFucnction(ev)
        }
    }


   if(input.withdiv !==undefined)
   {
       // logdata("propsDispatchthink","success",`dispatch the function with data ${props.daemon}`)
       type=Object.entries(input.iconElement[dualmode === true ? 1 : 0])[0]
       // console.log(type)
   }



return<>
    {
        input.nolabel === undefined && <label className="block font-semibold">{input.labelText}</label>

    }
    {input.withdiv ===undefined && <input type={input.type}  value={input.state[input.name]}
                                          className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-700 rounded-md"
                                          onChange={ev=>onChange(ev)}/>
    }
    {input.withdiv !==undefined
        && <div className=" flex flex-row border-4 border w-full   hover:outline-none  group-hover:bg-red-300 ">

            <input type={type[0]}  value={input.state[input.name]}
            className=" w-full h-5 px-3 py-5 mt-2  focus:border-transparent focus:ring-0   "
                    onChange={ev=>onChange(ev)}
            style={{border:0,outline:0}}
            />
            <div        className="py-2">
                <IconButton  aria-label="upload picture" component="span" onClick={()=>setDualmode(!dualmode)}>
                    {type[1]}
                </IconButton>
            </div>
        </div>}
</>
}
