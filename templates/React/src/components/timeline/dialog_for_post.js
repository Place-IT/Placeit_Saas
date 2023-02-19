import react, {useEffect, useState} from "react";
import DialogManual from "../Basetemplate/Dialog_manula";
import {selectError, SuccessSelector} from "../../features/timeline/Timelineslicer";
import {TextField} from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {PostSubmission} from "../../features/timeline/PostSubmission";
import {BasicDetailsU} from "../../features/UserAuth/AuthSlicer";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

export default  function Post_card(props)
{
    const dispatch = useDispatch();
    const UserDetail = useSelector(BasicDetailsU);
    const [Content,setContent]=useState("");

    const [state,setState]=useState({
        "major_Response":props.ar,
        "Form_id":props.id,
        "answer":[
            ]});
    const [question,setQuestions]=useState({})

    useEffect(() => {
        if(props.ar)
        {
            logdata("Post_card","init",`Post_card initated "Apply for this Drive"`)
            setContent("Apply for this Drive")
        }
        else
        {
            logdata("Post_card","init",`Post_card initated "Are u sure u dont want to apply for this Drive?"`)
            setContent("Are u sure u dont want to apply for this Drive?")
        }
        let a= {}

        props.questions.forEach(ev=>{
            // console.log(ev,ev.Extract_from)
            let answer=""
        if(ev.type === 'E' )
        {
            try {
                JSON.parse(ev.Extract_from).forEach((ev2,index)=>{
                    if(index === 0)
                    {
                        answer+=`${UserDetail[ev2]}`
                    }
                    else
                    {
                        answer+=`   ${UserDetail[ev2]}`
                    }
                })
            }
            catch (e)
            {
                logdata("Post_card questions","error",`Post_card initated ${e}`)
                // console.log(e,"error")
            }
        }

        a[`${ev.Text_q}`]={"Answer":answer,"form":ev.form,"Question":ev.id}
        })

        // setState({...state,answer: a})
        setQuestions(a)
        logdata("Post_card questions","error",`Post_card initated ${a}`)
        // console.log(a)
    }, []);


    function dispatch_function(ev)
    {
        let b={...state}
            b.answer=Object.values(question)
        logdata("Post_card dispatch_function","info",`dispatch_function data:${b}`)
        // console.log(b)
        dispatch(PostSubmission(b))
    }
    function Custom_success(ev,q_text)
    {


        let b={...question}
        b[`${q_text}`]={"Answer": ev.target.value,"form":ev.form,"Question":ev.id}
        logdata("Post_card Custom_success","info",`Custom_success data:${b}`)
        setQuestions(b)
    }
    return<>
        <DialogManual  tittle={props.tittle} Content={Content}
                       Success={SuccessSelector}
                       maxWidth={"lg"}
                       dispatch_function={dispatch_function} Error={selectError}>


            {Object.entries(question).map(ev=>{
                // console.log(ev[0],ev[1])
                return<TextField  label={ev[0]} type="search" fullWidth variant="standard"  margin="dense"
                            value={ev[1].Answer}
                            onChange={ev2=>Custom_success(ev2,ev[0])}
                />
            })}

        </DialogManual>
    </>
}