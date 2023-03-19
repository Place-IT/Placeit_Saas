import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {
    selectCompany_list,
    selectCompany_visitng_list,
    selectError,
    selectStatus,
    SuccessSelector
} from "../../../features/company/CompanySlicer";
import {Company_Profile} from "../../../features/company/CompanyProfile";
import errorRedirect from "../../../CommonFunctions/Error_controlReact/error_redirect";
import {Compnay_visitng_record} from "../../../features/company/Visitng_record";
import DialogManual from "../../Basetemplate/Dialog_manula";
import {Fab, InputAdornment, TextareaAutosize, TextField} from "@mui/material";
import basicSuccess from "../../../CommonFunctions/UniversalForm/BasicSuccess";
import {Link, useRouteMatch} from "react-router-dom";
import {store} from "../../../app/store";
import {DialogSlice} from "../../../features/dialogSlicer";
import AddIcon from "@mui/icons-material/Add";
import {Create_Company_visitng} from "../../../features/company/create_visitng_record";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import Empat from "../../../assets/images/undraw_Active_support_re_b7sj.png";


export default function  Company_profile (props)  {
    useEffect(ev=>{
        logdata("Company_profile","init",`Company initated`)
    },[])
    let { pkId } = useParams();
    const [re,setRe]=useState({
        re:false,
        to:"/dashboard/company_profile/"
    })
    const ss2=useSelector(SuccessSelector)

    let match = useRouteMatch();
    const dispatch = useDispatch();
    const [search,setSearch]=useState({first:false,seacond:false,});
    const [state,setState]=useState({
        visiting_date:"",
        HRName:"",
        Position:"",
        MinLpa_offered:"",
        MaxLpa_offered:"",
        Description:"",
        Company_image:"",
        company:pkId
    });
    const data = useSelector(selectCompany_list);
    const success = useSelector(SuccessSelector);
    const visitng_list = useSelector(selectCompany_visitng_list);


    if(search.first === false)
    {
        logdata("Company_profile search first","info",`first search called`)
        setSearch({...search,first: true})
        dispatch(Company_Profile(pkId))
    }
    if(search.first && !search.seacond  && success.profile_fetch_success )
    {
        if(data.length === 0)
        {

            errorRedirect()
        }
        else
        {
            setSearch({...search,seacond: true})
            setState({...state,company:pkId})
            dispatch(Compnay_visitng_record({id:pkId}))
        }
    }
    function dispatch_function(ev)
    {
        logdata("dispatch_function","init",`dispatch_function with following state ${state}`)
        setRe({re:true})
        store.dispatch(DialogSlice.actions.dialogState())
        dispatch(Create_Company_visitng(state))
        logdata("dispatch_function","completed",`dispatch_function completed`)
    }

    function open(ev)
    {
        logdata("open","init",`open completed`)
        store.dispatch(DialogSlice.actions.dialogState())
        logdata("open","complete",`open completed`)
    }

    return (
        <>
            <UpperHoc  Re={re.re} redirect={ss2.to}  hard={re.re}   Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>

                <div className="m-4 lg:m-10 ">
                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/dashboard/company_search/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer">
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>

                        {/*<div className="hidden md:flex flex-row bg-indigo-600 rounded-full w-fit cursor-pointer" onClick={open}>*/}
                        {/*    <a href="#" className="py-4 px-4"><i className="bx bx-plus-circle text-white text-2xl"></i></a>*/}
                        {/*    <p className="py-4 pr-6 text-xl text-white font-bold">New visit</p>*/}
                        {/*</div>*/}
                    </div>

                    <div
                        className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-gray-200">

                        {data.map(ev=>{

                            return<>
                                <div className="flex flex-col md:flex-row">
                                    <div className=" w-full md:w-1/3 bg-white rounded p-4 grid place-items-center ">

                                        <img
                                            src={ev.Company_logo === null?"https://janak27.github.io/placeitui/img/Jio-Logo%206.png":ev.Company_logo}
                                            alt="tailwind logo" className="rounded-xl"/>

                                    </div>
                                    <div className="w-full md:w-2/3  flex flex-col space-y-2 p-3 ">
                                        <h3 className=" font-semibold text-gray-800 md:text-3xl text-xl">{ev.Company_name}</h3>
                                        <a href={ev.Employers_Website} className="flex flex-row font-medium text-blue-800 cursor-pointer break-words">
                                            <i className='bx bx-link text-2xl'></i>
                                            <p className="text-xl">
                                                {ev.Employers_Website}
                                            </p>
                                        </a>
                                    </div>
                                </div>



                            </>
                        })}

                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 px-1 md:py-2">
                                <p className="font-semibold text-gray-800 md:text-2xl text-xl"> Previous Visits</p>
                            </div>
                        </div>

                        <div className="flex flex-col ">
                            {visitng_list.length === 0?<>
                                <div className="flex ">
                                    <img src={Empat} alt=""/>
                                </div>
                            </>:<>
                                {visitng_list.map(ev=>{

                                    return<>
                                        <Link to={`${match.url}visitng_record/${ev.id}/`}>
                                            <div className="flex flex-row justify-between p-2 bg-white rounded w-full my-2">
                                                <p href="./companyhr.html" className="font-semibold text-gray-800 text-xl">{ev.HRName}</p>
                                                <p href="" className="font-semibold text-gray-800 text-xl">{ev.visiting_date}</p>
                                            </div>
                                        </Link>
                                    </>
                                })}
                            </>}
                            


                        </div>
                    </div>
                </div>

                {/*<div className="md:hidden" >*/}
                {/*    <Fab color="primary" aria-label="add" style={{*/}
                {/*        margin: 0,*/}
                {/*        top: 'auto',*/}
                {/*        right: 10,*/}
                {/*        bottom: 70,*/}
                {/*        left: 'auto',*/}
                {/*        position: 'fixed',*/}
                {/*    }} onClick={open}*/}
                {/*    >*/}
                {/*        <AddIcon />*/}
                {/*    </Fab>*/}
                {/*</div>*/}



                <DialogManual  tittle={"Visiting Record"} Content={"create a new visitng record"}
                               Success={SuccessSelector}
                               dispatch_function={dispatch_function} Error={selectError}>

                    <div className="flex items-start pt-1">
                        <div className="datepicker relative form-floating mb-3 xl:w-96">
                            <label htmlFor="floatingInput" className="text-gray-700">Visiting Date</label>
                            <input type="date"
                                   className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                   placeholder="Visiting Date"
                                   min={new Date().toISOString().split('T')[0]}
                                   value={state.visiting_date}
                                   onChange={ev=>basicSuccess(ev,{state,setState,name:"visiting_date"})}
                            />

                        </div>
                    </div>

                    <TextField  label="HRName" type="search" fullWidth variant="standard"  margin="dense"
                                value={state.HRName}
                                onChange={ev=>basicSuccess(ev,{state,setState,name:"HRName"})} />
                    <TextField id="standard-basic" label="Position" type="search" fullWidth variant="standard"  margin="dense"
                               value={state.Position}
                               onChange={ev=>basicSuccess(ev,{state,setState,name:"Position"})}
                    />
                    <TextField  label="MinLpa_offered" type="search" fullWidth variant="standard"  margin="dense"
                                value={state.MinLpa_offered}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                endAdornment={<InputAdornment position="end">lpa</InputAdornment>}
                                onChange={ev=>basicSuccess(ev,{state,setState,name:"MinLpa_offered"})}
                    />

                    <TextField id="standard-basic" label="MaxLpa_offered" type="search" fullWidth variant="standard"  margin="dense"
                               value={state.MaxLpa_offered}
                               endAdornment={<InputAdornment position="end">lpa</InputAdornment>}
                               aria-describedby="outlined-weight-helper-text"
                               inputProps={{
                                   'aria-label': 'weight',
                               }}
                               onChange={ev=>basicSuccess(ev,{state,setState,name:"MaxLpa_offered"})}
                    />

                    <TextField
                        value={state.Description}
                        onChange={ev=>basicSuccess(ev,{state,setState,name:"Description"})}
                        multiline
                        rows={4}
                        id="standard-basic" label="Description" type="search" fullWidth variant="standard"  margin="dense"
                    />



                </DialogManual>
                    </div>

            </UpperHoc>

        </>

    );

}