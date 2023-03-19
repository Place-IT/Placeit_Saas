import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {CanvasJSChart} from 'canvasjs-react-charts'
import {DataGrid} from "@mui/x-data-grid";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {selectError, selectResult, selectStatus, SuccessSelector} from "../../../features/Department/StudentSLicer";
import {FetchStats} from "../../../features/Department/fetch_stats";


const columns = [
    { field: 'id', headerName: ' ',minWidth: 200 },
    { field: 'Chem', headerName:"Chem",minWidth: 200},
    { field: 'Comp', headerName: 'Comp',minWidth: 200},
    { field: 'Extc', headerName: 'Extc',minWidth: 200},
    { field: 'it', headerName:"it",minWidth: 200 },
    { field: 'instru', headerName: 'instru',minWidth: 200},
    { field: 'Mech', headerName: 'Mech',minWidth: 200}
];

// const rows = [
//     { id:"no. of students placed", Chem: 'Total Strength', Comp: 'Jon', Extc: 'Jon', it: 'Jon', instru: 'Jon', Mech: 'Jon'},
//     { id:"no. of company visited", Chem: 'Total Strength', Comp: 'Jon', Extc: 'Jon', it: 'Jon', instru: 'Jon', Mech: 'Jon'},
//     { id:"Average Package", Chem: 'Total Strength', Comp: 'Jon', Extc: 'Jon', it: 'Jon', instru: 'Jon', Mech: 'Jon'},
//     { id:"Range (LPA)", Chem: 'Total Strength', Comp: 'Jon', Extc: 'Jon', it: 'Jon', instru: 'Jon', Mech: 'Jon'},
// ];

function prepare_data(data,setRows,setOptions)
{
    logdata("prepare_data ","init",`called data data:${data}`)

    let rows=[]
    rows.push({ id:"no. of students placed", Chem: data["Department Of Chemical Engineering"].no_of_students_placed, Comp: data["Department Of Computer Science"].no_of_students_placed, Extc: data["Department Of Electronics and Telecomnications"].no_of_students_placed, it: data["Department Of Information Technology"].no_of_students_placed, instru: data["Department Of Instrumental"].no_of_students_placed, Mech: data["Department Of Mechinical engineering"].no_of_students_placed},)
    rows.push({ id:"no. of company visited", Chem: data["Department Of Chemical Engineering"].no_of_company_visited, Comp: data["Department Of Computer Science"].no_of_company_visited, Extc: data["Department Of Electronics and Telecomnications"].no_of_company_visited, it: data["Department Of Information Technology"].no_of_company_visited, instru: data["Department Of Instrumental"].no_of_company_visited, Mech: data["Department Of Mechinical engineering"].no_of_company_visited},)
    rows.push({ id:"Average Package", Chem: data["Department Of Chemical Engineering"].Average_Package, Comp: data["Department Of Computer Science"].Average_Package, Extc: data["Department Of Electronics and Telecomnications"].Average_Package, it: data["Department Of Information Technology"].Average_Package, instru: data["Department Of Instrumental"].Average_Package, Mech: data["Department Of Mechinical engineering"].Average_Package},)
    rows.push({ id:"Range (LPA)",
        Chem: `${data["Department Of Chemical Engineering"].Range_min} - ${data["Department Of Chemical Engineering"].Range_max}`,
        Comp: `${data["Department Of Computer Science"].Range_min} - ${data["Department Of Computer Science"].Range_max}`,
        Extc: `${data["Department Of Electronics and Telecomnications"].Range_min} - ${data["Department Of Electronics and Telecomnications"].Range_max}`,
        it: `${data["Department Of Information Technology"].Range_min} - ${data["Department Of Information Technology"].Range_max}`,
        instru: `${data["Department Of Instrumental"].Range_min} - ${data["Department Of Instrumental"].Range_max}`,
        Mech:`${data["Department Of Mechinical engineering"].Range_min} - ${data["Department Of Mechinical engineering"].Range_max}`},)

    setRows(rows)
    setOptions({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title:{
            text: "Number of Student Placemend."
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints:[
                { "label":"Chem", y: data["Department Of Chemical Engineering"].no_of_students_placed },
                { "label":"Comp", y: data["Department Of Computer Science"].no_of_students_placed },
                { "label":"Extc", y: data["Department Of Electronics and Telecomnications"].no_of_students_placed },
                { "label":"It", y: data["Department Of Information Technology"].no_of_students_placed },
                { "label":"Instru", y: data["Department Of Instrumental"].no_of_students_placed },
                { "label":"Mech", y: data["Department Of Mechinical engineering"].no_of_students_placed },
            ]
        }]
    })
    // console.log(data["Department Of Information Technology"].no_of_students_placed,"set options updated")
    logdata("prepare_data ","completed",`called data data:${rows} `)
}


export default function  College (props)  {

    const dispatch = useDispatch();
    const [year,setYear]=useState(years[0])
    const [dataPrepared,setDataprepared]=useState(false)
    const [call,setCall]=useState(false)

    const [rows,setRows]=useState([])
    const data = useSelector(selectResult);
    const Success = useSelector(SuccessSelector);

    const [options,setOptions] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title:{
            text: "Number of Student Placemend."
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints:[]
        }]
    })

    useEffect(()=>{
        logdata("Post_Detail","init",`Post_Detail init with following props:${props}`)
    },[])

    function fetch_data()
    {
        logdata("Post_Detail fetch_data ","init",`called data year:${year}`)
        dispatch(FetchStats(year))
    }
    if(call === false)
    {

        fetch_data()
        setCall(true)
        setDataprepared(false)
    }
    if(call === true && Success.update === true && dataPrepared === false) {
        setDataprepared(true)
        prepare_data(data,setRows,setOptions)
    }
    // console.log(data,call,Success.Success,dataPrepared,year)
    return (
        <>
            <UpperHoc  Re={false}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div className="row-span-1 lg:col-span-3 col-span-5">
                    <div className="flex justify-center">
                        <div className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold">
                            College DashBoard
                        </div>
                    </div>
                </div>

                <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl -mt-32 ">
                    <div className="flex flex-col md:flex-row justify-between mx-4 ">
                        <div className="relative inline-flex my-2 ">
                            <select
                                className=" text-xs md:text-sm font-bold rounded border-2 border-purple-700 text-gray-600 h-10 w-24 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                name="cars" id="cars" value={year} onChange={ev=>{setYear(ev.target.value)
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
                        pageSize={5}
                    />
                    <div className={"h-32 w-full"}></div>

                </div>
            </UpperHoc>
        </>
    );

}