import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Company_Profile} from "../../../features/company/CompanyProfile";
import {Compnay_visitngStats_record} from "../../../features/company/stats_data";
import {
    SelectCompnay_visitng_record,
    selectError, Selectsats_data,
    selectStatus,
    SuccessSelector
} from "../../../features/company/CompanySlicer";
import {data} from "autoprefixer";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 ,sortable: false,},
    {
        field: 'Date',
        headerName: 'date',
        type:"date",
        width: 160,
        sortable: true,
    },
    {
        field: 'Company',
        headerName: 'company_name',
        width: 160,
        sortable: false,
        type:"string",
        renderCell: (params) =>
        {
            if(params.row.Company === "Total")
            {
                return params.row.Company_id
            }
            return <a href={`/dashboard/company_profile/${params.row.Company_id}/visitng_record/${params.row.V_id}/`}>{params.row.Company}</a>
        }


    },
    {
        field: 'Chem',
        headerName: 'Chem',
        type: 'number',
        sortable: true,
        width: 160,
    },
    {
        field: 'Comp',
        headerName: 'Comp',
        type: 'number',
        sortable: true,
        width: 160,
    },
    {
        field: 'Extc',
        headerName: 'Extc',
        sortable: true,
        width: 160,
    },
    {
        field: 'IT',
        headerName: 'IT',
        sortable: true,
        width: 160,
    },
    {
        field: 'Instru',
        headerName: 'Instru',
        sortable: true,
        width: 160,
    },
    {
        field: 'Mech',
        headerName: 'Mech',
        sortable: true,
        width: 160,
    },
    {
        field: 'Total',
        headerName: 'Total',
        sortable: true,
        width: 160,
        valueGetter: (params) =>
            `${ params.row.Chem+params.row.Comp+params.row.Extc+params.row.IT+params.row.Instru+params.row.Mech}`,
    },
];

const rows = [
    { id: 1, Date: '21 /06/2022', Company: 'Jon', Chem: 35, Comp: 35, Extc: 35 , IT: 35 , Instru: 35 , Mech: 35 },
    { id: 2, Date: '', Company: 'Total', Chem: 35, Comp: 35, Extc: 35 , IT: 35 , Instru: 35 , Mech: 35 },
];

function MyExportButton() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
function modify_function(setModify,setRow,row)
{
    let a={ id: 0,
            Date: '',
            Company: 'Total',
            Chem:0,
            Comp:0,
            Extc:0,
            IT: 0,
            Instru: 0,
            Mech: 0 }
    let b =[]
    row.forEach((ev,index)=>{
                a.Chem=ev.Chem+a.Chem
                a.Comp=ev.Comp+a.Comp
                a.Extc=ev.Extc+a.Extc
                a.IT=ev.IT+a.IT
                a.Instru=ev.Instru+a.Instru
                a.Mech=ev.Mech+a.Mech
            b.push({id:index,...ev})
    })
    a.id=row.length+1
    // console.log(row,a,"aaa")
    setRow([...b,a])
    setModify(true)
}

export default function CompanyVisitStats(props)
{
    const [call,setCall]=useState(false)
    const [year,setYear]=useState(new Date().getFullYear())
    const [row,setRow]=useState(rows)
    const [dataprepare,setDataprepare]=useState(false)
    const [modify,setModify]=useState(years[0])
    const Success = useSelector(SuccessSelector);
    const cvr = useSelector(Selectsats_data);

    const dispatch = useDispatch();

    if(call === false)
   {

       dispatch(Compnay_visitngStats_record(year))
       setRow([])
       setCall(true)
       setDataprepare(false)
   }

    if(call === true && Success.cvr_fetch === true && dataprepare === false )
    {
        setDataprepare(true)
        // console.log(cvr,row)
        modify_function(setModify,setRow,cvr)
    }

    // console.log(row,cvr)
    return <>
        <UpperHoc  Re={false}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
            <div>
                <div className="row-span-1 lg:col-span-3 col-span-5">
                    <div className="flex justify-center mb-8">
                        <div
                            className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold"
                        >
                            Company Statistics
                        </div>
                    </div>
                </div>
                <div className="m-4 lg:m-10 ">
                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/dashboard/company_search/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3    " style={{height:"100vh"}}>
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

                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={row}
                                columns={columns}
                                pageSize={100}
                                disableSelectionOnClick
                                components={{
                                    Toolbar: MyExportButton,
                                }}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </UpperHoc>
    </>
}