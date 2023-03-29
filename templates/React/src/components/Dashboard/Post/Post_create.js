import React, {useEffect, useState} from "react";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectError, selectStatus, SuccessSelector,selectResult} from "../../../features/post/PostSlicer";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {useDispatch, useSelector} from "react-redux";
import {BasicDetailsU} from "../../../features/UserAuth/AuthSlicer";
import {PostCreation} from "../../../features/post/postCreation";
import Question from "./Question";
import {Compnay_visitng_record} from "../../../features/company/Visitng_record";
import basicSuccess from "../../../CommonFunctions/UniversalForm/BasicSuccess";




export default function  PostCreate(props)  {
    useEffect(()=>{
        logdata("Post_Detail","init",`Post_Detail init with following props:${props}`)
    },[])

    const [data,setData]=useState({
        "Visitng_record":"",
        "Type":"sl",
        "Creator_note":"",
        "expire_date_time":new Date().toISOString(),
        "Originator":1,
        "conditions": {
            "conditon_1": 0.00,
            "conditon_2": 0.00,
            "conditon_3": 0.00,
            "conditon_4": false,
            "conditon_5": false
        },
        "questions":[]})

    const [err,setErr]=useState({show:false,msg:""})
    const [Call,setCall]=useState(false)
    const [vr,setVr]=useState([])
    const [questions,setQuestions]=useState({})
    const UserDetail = useSelector(BasicDetailsU);
    const Successs = useSelector(SuccessSelector);
    const data2=useSelector(selectResult);
    const dispatch = useDispatch();

    function dispatch_function(ev)
    {
        logdata("dispatch_function","init",`dispatch with following state ${data}`)
        let a= {...data}
        a.Originator=UserDetail.id
        a.questions=Object.values(questions)
        a.conditions_copy=a.conditions
        a.conditions=null
        // console.log(a,data,JSON.stringify(a),Object.values(questions),questions)
        dispatch(PostCreation(a))

        logdata("dispatch_function","completed",`dispatch completefd`)
    }

    function Setcondition(condition,value)
    {
        let data_= {...data}
        data.conditions[condition]=value
        setData(data_)
    }
    if(!Call && Successs.cvr_fetch === false)
    {
        setCall(true)
        dispatch(Compnay_visitng_record(""))
    }
    if(Call === true && Successs.cvr_fetch === true )
    {
        let c=[]
        data2.Compnay_visitng_record.forEach(ev=>{
            c.push({vv:ev.String_repr,id:ev.id})
        })
        setVr(c)
        setCall(false)
    }


    function HandleAddQuestion(ev)
    {
        let a=Math.floor(Math.random() * 1000000000)
        let questions_={...questions}
        questions_[`${a}`]={"type":"UA","Text_q":"Question Text","Extract_from":""}
        setQuestions(questions_)
    }
    function HandleQuestionUpdate(id,key,value)
    {
        let questions_={...questions}
        questions_[id][key]=value
        setQuestions(questions_)
    }
    function HandledeleteQuestion(id)
    {
        let questions_={...questions}
        delete questions_[id]
        setQuestions(questions_)
    }
    return (
        <>
            <UpperHoc  redirect="/dashboard/post_list/" Re={true} hard={true}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>
                    <div className="m-4 lg:m-10 ">
                        <div className="flex m-4  text-md justify-between">
                            <Link to={`/dashboard/post_list/`}>
                                <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                    <p  className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                    <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                                </div>
                            </Link>

                        </div>

                        <div className="border-2 border-gray-300 m-4 rounded p-4">
                            <div
                                className="px-5 my-8 md:mx-10 mx-auto max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                                Select visits
                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <select
                                    value={data.Visitng_record}
                                    onChange={ev=>{
                                        setData({...data,Visitng_record: ev.target.value})
                                    }}
                                    className="text-xl font-bold rounded border-2 border-purple-700 text-gray-600 h-14 w-full md:w-1/2 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                    <option value="" disabled selected hidden>Visiting Records</option>
                                    {vr.map(ev=><option value={ev.id}>{ev.vv}</option>)}
                                </select>
                            </div>
                            <div className="flex justify-center items-center flex-col ">
                            <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                Post Exporation Date-Time
                            </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                            <div className="w-full mb-4 md:w-1/2">
                                <input  type="datetime-local"
                                        id="first_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                       placeholder="Enter the Post Expiration date Time"
                                       value={data.expire_date_time}
                                       onChange={ev=>setData({...data,expire_date_time: ev.target.value})}

                                />
                            </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Creator Note
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <textarea id="message" rows="4"
                                              value={data.Creator_note}
                                              onChange={ev=>setData({...data,Creator_note: ev.target.value})}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                              placeholder="Enter the Post Expiration date Time"
                                             />
                                </div>

                            </div>
                        </div>
                        <div className="border-2 border-gray-300 m-4 rounded p-4">
                            <div
                                className="px-5 my-8 md:mx-10 mx-auto max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                                Conditions <i className='bx bxs-caret-down-circle'></i>
                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white">
                                    Condition (Sem avg percentage)
                                </div>
                                <div className="w-full mb-4 md:w-1/2">

                                    <input
                                           type="number"
                                           min="0.00" max="100.00"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                           placeholder="Enter the minimum marks without %"
                                           value={data.conditions.conditon_1}
                                           onChange={ev=>Setcondition("conditon_1",ev.target.value)}
                                    />
                                </div>

                                <div className="text-xl font-bold w-full md:w-1/2 bg-white">
                                    Condition (10th marks)
                                </div>
                                <div className="w-full mb-4 md:w-1/2">
                                    <label htmlFor=""
                                           className="block text-sm font-medium text-gray-900 dark:text-white">SSC
                                        marks</label>
                                    <input
                                        type="number"
                                        min="0.00" max="100.00"
                                        id="first_name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                           placeholder="Enter the minimum marks without %"
                                           value={data.conditions.conditon_2}
                                           onChange={ev=>Setcondition("conditon_2",ev.target.value)}
                                    />
                                </div>
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white">
                                    Condition (12th marks)
                                </div>
                                <div className="w-full mb-4 md:w-1/2">
                                    <label htmlFor=""
                                           className="block text-sm font-medium text-gray-900 dark:text-white">HSC
                                        marks</label>
                                    <input
                                           type="number"
                                           min="0.00" max="100.00"
                                           value={data.conditions.conditon_3}
                                           onChange={ev=>Setcondition("conditon_3",ev.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                           placeholder="Enter the minimum marks without %"  />
                                </div>
                                <div className="text-xl mb-4 font-bold w-full md:w-1/2 bg-white">
                                    Condition (About KTs)
                                </div>
                                <div className="w-full mb-4 md:w-1/2">
                                    <input id="default-checkbox" type="checkbox"
                                           value={data.conditions.conditon_4}
                                           onChange={ev=>Setcondition("conditon_4",ev.target.value)}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " />
                                        <label htmlFor="default-checkbox"
                                               className="ml-2 text-sm font-medium text-gray-900 ">No Live KTs</label>
                                </div>
                                <div className="w-full mb-4 md:w-1/2">
                                    <input id="default-checkbox" type="checkbox"
                                           value={data.conditions.conditon_5}
                                           onChange={ev=>Setcondition("conditon_5",ev.target.value)}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                        <label htmlFor="default-checkbox"
                                               className="ml-2 text-sm font-medium text-gray-900 " >No Dead KTs</label>
                                </div>
                            </div>
                        </div>
                        <div id="container">
                            <div className="border-2 border-gray-300 m-4 bg-white rounded p-4">
                                <div className="flex flex-row space-x-4 justify-between">
                                    <div className="md:w-full rounded p-2">
                                        <div className="md:px-5 md:my-4 md:mx-10 mx-auto">
                                            <p
                                                className="md:text-3xl text-xl border-indigo-700 font-bold border-b-4 border-indigo-700 md:w-48">
                                                Additional</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {Object.entries(questions).map(ev=>{
                            return<>
                                <Question keys={ev[0]} data={ev[1]} HandledeleteQuestion={HandledeleteQuestion}
                                          update_questions={setQuestions}
                                          data_questions={questions}
                                          HandleQuestionUpdate={HandleQuestionUpdate}
                                />
                            </>
                        })}
                        <div className="px-4 py-4 flex justify-center space-x-4 font-bold">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    id="copy-btn" onClick={HandleAddQuestion}>
                                Add
                            </button>

                        </div>

                        <div className="px-5 py-8 flex justify-center  font-bold" onClick={dispatch_function}>
                            <div
                               className="px-8 py-2 border-2 border-indigo-700 bg-indigo-700 text-white rounded-full font-bold">
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </UpperHoc>
        </>

    );

}

