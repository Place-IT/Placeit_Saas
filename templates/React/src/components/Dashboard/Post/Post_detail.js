import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {PostFetch} from "../../../features/post/PostFetch";
import {FetchResponses} from "../../../features/post/fetch_responses";
import {PlaceStudent} from "../../../features/post/PlaceStudent";
import {UnPlaceStudent} from "../../../features/post/UnPlaceStudent";
import {selectResult, SuccessSelector} from "../../../features/post/PostSlicer";
import {selectError, selectStatus} from "../../../features/Department/StudentSLicer";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import ScrollableTabsButtonForce from "../../../CommonFunctions/CTabs";
import {DeletePost} from "../../../features/post/Delete_post";



function create_question_and_answer(setQuestion,setResponse_1,setResponse_2,setResponse_3,data)
{
   let columns = [
       { field: 'id', headerName: 'ID', width: 170 ,
           renderCell: (params) =>
           {
               return <a href={`/profile/${params.row.id}/`}>{params.row.id}</a>
           }
       }
    ];
   let ittcolumn= {}

   data.data[0].questions_set.forEach(
       ev=>{
           ittcolumn[ev.id]=ev.Text_q.replaceAll(/\s/g,'')
           columns.push(
               {
                   field: ev.Text_q.replaceAll(/\s/g,''),
                   headerName: ev.Text_q,
                   width: 250,
                   editable: false,
               }
           )
       }

   )
    let  response_1 = [
    ];
    let  response_2 = [
    ];
    let  response_3 = [
    ];
   data.data2.forEach(
       (ev,index)=>{
           let row={}
           ev.additional_response_set.forEach(ev2=>{
               row[ittcolumn[ev2.Question]]=ev2.Answer
           })
            row["id"]=Number(ev.user_id)

           //user already placed in this company
           if(ev.user_already_placed)
           {
               response_2.push(row)
           }
           else
           if(ev.is_user_eligible["final"])
           {
               response_1.push(row)
           }
           else{
               response_3.push(row)
           }
       }
   )
    setQuestion(columns)
    setResponse_1(response_1)
    setResponse_2(response_2)
    setResponse_3(response_3)

}

export default function  PostDetail(props)  {
    useEffect(()=>{
        logdata("Post_Detail","init",`Post_Detail init with following props:${props}`)
    },[])

    let { pkId } = useParams();

    const dispatch = useDispatch();

    const [re,setRe]= useState(false)
    const [redirect,setRedirect]= useState(false)
    const [call,setCall]= useState(false)
    const [up,setUp]= useState(false)
    const [update,setUpdate]= useState(false)
    const [question,setQuestion]= useState([])


    //eligible and not placed
    const [Response_1,setResponse_1]= useState([])
    //eligible and  placed
    const [Response_2,setResponse_2]= useState([])
    //responded but not eligible anymore
    const [Response_3,setResponse_3]= useState([])

    const data = useSelector(selectResult);
    const Success = useSelector(SuccessSelector);
    // console.log("Sqsqsqsqsqsqsqsq",up === false && Success.ss === true && Success.ss1 === true,up === false , Success.ss === true , Success.ss1 === true,Success.ss1)

    if(up === false && Success.ss === true && Success.ss1 === true)
    {

        create_question_and_answer(setQuestion,setResponse_1,setResponse_2,setResponse_3,data)
        setUp(true)
    }

    if(call === false && Success.update === true)
    {
        dispatch(PostFetch(pkId))
        dispatch(FetchResponses(pkId))
        setCall(true)
        setUp(false)
    }
    if(Success.update === true && update === false && Success.ss === true && Success.ss1 === true)
    {

        setUpdate(true)
    }
    function place_student(student)
    {
        let a=[]
        student.forEach(ev=>a.push(Number(ev.id)))
        setCall(false)
        // setRe(true)
        // setRedirect(window.location.pathname)
        dispatch(PlaceStudent({"students_list":a,"Form_id":pkId,"response_Type":"placed"}))
    }
    function unPlaceStudent(student)
    {
        let a=[]
        student.forEach(ev=>a.push(Number(ev.id)))
        setCall(false)
        // console.log(a)
        // setRe(true)
        // setRedirect(window.location.pathname)
        dispatch(UnPlaceStudent({"students_list":a,"Form_id":pkId,"response_Type":"placed"}))
    }

    function Delete()
    {
        setRe(true)
        setRedirect("/dashboard/post_list/")
        dispatch(DeletePost(pkId))
        // window.location.href="/dashboard/post_list/"
    }
    // console.log(data,check,data.data.length)

    return (
        <>
            <UpperHoc redirect={redirect}  Re={re}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>
                    <div className="m-4 lg:m-10 ">
                        <div className="flex m-4  text-md justify-between">
                            <Link to={`/dashboard/post_list/`}>
                                <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                    <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                    <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                                </div>
                            </Link>
                            <div
                                onClick={ev=>{
                                    Delete()
                                }}
                                className=" flex flex-row bg-red-600 rounded-full px-4 py-2 cursor-pointer">
                                <p href="#" className="px-2"><i className='bx bx-task-x text-white text-xl md:text-3xl'></i></p>
                                <p className="text-md md:text-2xl text-white md:px-2 font-bold">Delete</p>
                            </div>
                        </div>

                        <div className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3    " style={{height:"100vh"}}>
                            <ScrollableTabsButtonForce
                                data={data.data[0]}
                            Response_1={Response_1}
                            Response_2={Response_2}
                            Response_3={Response_3}
                            question={question}
                            place_student={place_student}
                            unPlaceStudent={unPlaceStudent}
                            />
                        </div>
                    </div>
                </div>
            </UpperHoc>
        </>

    );

}

