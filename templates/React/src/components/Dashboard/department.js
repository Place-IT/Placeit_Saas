import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CanvasJSChart} from "canvasjs-react-charts";
import { DataGrid } from '@mui/x-data-grid';
import {BasicDetailsU} from "../../features/UserAuth/AuthSlicer";
import {FetchStats} from "../../features/Department/fetch_stats";
import {selectError, selectResult, selectStatus, SuccessSelector} from "../../features/Department/StudentSLicer";
import UpperHoc from "../../CommonFunctions/UpperCLouser/CustomHoc";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

const columns = [
    { field: 'id', headerName: '  ', width: 300 },
    { field: 'firstName', headerName:"   ", width: 130 }
];

const rows = [
    { id: 'Total Strength', firstName: 'Jon'},
    { id:  'Total no of placed students', firstName: 'Jon'},
    { id:  'Total no of HIgher Studies students', firstName: 'Arya'},
    { id:  'Total no of Gate students', firstName: 'Daenerys' },
    { id:  'Total no of Enterpreneur students', firstName: null},
    { id:  'Highest Packgae offered', firstName: 'Cersei'},
    { id:  'Average  Salary', firstName: 'Jaime' },
];

function Prepare_data_according_to_department(data,setRow,setDatapoints)
{
    let rows=[
        { id: 'Total Strength', firstName: data["no_of_students"]},
        { id:  'Total no of placed students', firstName: data["no_of_students_placed"]},
        { id:  'Total no of HIgher Studies students', firstName: data["Total_no_of_HIgher_Studies_students"]},
        { id:  'Total no of Gate students', firstName: data['Total_no_of_HIgher_Studies_students'] },
        { id:  'Total no of Enterpreneur students', firstName: data['Total_no_of_Entrepreneurship_students']},
        { id:  'Highest Packgae offered', firstName: data["Range_max"]},
        { id:  'Average  Salary', firstName: data["Average_Package"] },
    ]
    let dataPoints= [
        { y: data["no_of_students_placed"], label: "Total no of placed students" },
        { y: data['Total_no_of_HIgher_Studies_students'], label: "Total no of HIgher Studies students" },
        { y: data["Total_no_of_Gate_Studies_students"], label: "Total no of Gate students" },
        { y: data["Total_no_of_Entrepreneurship_students"], label: "Total no of Enterpreneur students" },
    ]
    setRow(rows)
    setDatapoints(dataPoints)
}

export default function  Department (props)  {
    useEffect(ev=>{
        logdata("Department","init",`Department initated`)
    },[])
    const [departments,setDepartments]=useState(window.department_list[0])
    const [year,setYear]=useState(years[0])

    const [call,setCall]=useState(false)
    const [dataPrepared,setDataprepared]=useState(false)


    const [rows,setRows]=useState([])
    const [datapoints,setDatapoints]=useState([])


    const UserDetail = useSelector(BasicDetailsU);
    const Success = useSelector(SuccessSelector);
    const data = useSelector(selectResult);


    const dispatch = useDispatch();

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Student Distribution."
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: datapoints
        }]
    }
    function fetch_data()
    {
        dispatch(FetchStats(year))
    }
    if(UserDetail.groups !== [] && call === false)
    {
        if(UserDetail.groups.includes("Faculty"))
        {
            setDepartments(UserDetail.Affliated_Department["name"])
        }
        fetch_data()
        setCall(true)
        setDataprepared(false)
    }
    if(call === true && Success.update === true && dataPrepared === false) {
        setDataprepared(true)
        Prepare_data_according_to_department(data[departments],setRows,setDatapoints)
    }
    // console.log(data)
    return (
        <>
            <UpperHoc  Re={false}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div className="row-span-1 lg:col-span-3 col-span-5">
                    <div className="flex justify-center">
                        <div
                            className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold"
                        >
                            Department DashBoard
                        </div>
                    </div>
                </div>

                <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl -mt-32">

                    <div className="flex flex-col md:flex-row justify-between mx-4">
                        <div className="relative inline-flex ">
                            {UserDetail.groups.includes("Head") &&<>
                                <select
                                    className="text-xs md:text-sm font-bold rounded border-2 border-purple-700 text-gray-600 h-10 w-full pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                    name="cars" id="cars" value={departments} onChange={ev=>{
                                    setDepartments(ev.target.value)
                                    setDataprepared(false)
                                }}>
                                    {department_list.map(ev=>{return <option value={ev}>{ev}</option>})}
                                </select>
                            </>}
                        </div>
                        <div className="relative inline-flex my-2">
                            <select
                                className=" text-xs md:text-sm font-bold rounded border-2 border-purple-700 text-gray-600 h-10 w-24 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                name="cars" id="cars" value={year} onChange={ev=>{
                                setYear(ev.target.value)
                                setCall(false)
                                }}>
                                {years.map(ev=>{return <option value={ev}>{ev}</option>})}
                            </select>
                        </div>
                    </div>

                    <CanvasJSChart options = {options}/>
                    <div className={"h-20 w-full"}></div>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={7}
                        />
                    <div className={"h-32 w-full"}></div>
                </div>
            </UpperHoc>
        </>

    );

}