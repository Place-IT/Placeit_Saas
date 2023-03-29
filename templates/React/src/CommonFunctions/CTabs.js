import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function HHoc(valuse,Selectedrows,callBack)
{
    function callCallback(){
        callBack(Selectedrows)
    }
 function MyExportButton() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            {valuse === 0 &&<><Button onClick={callCallback} variant="text">Place Student</Button></>}
            {valuse === 1 &&<><Button onClick={callCallback} variant="text">UnPlace Student</Button></>}
        </GridToolbarContainer>
    );
}
return MyExportButton
}
function Data_grid(props)
{
    return<>
        <DataGrid
            rows={props.Response}
            columns={props.question}
            checkboxSelection
            onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = props.Response.filter((row) =>
                    selectedIDs.has(row.id))
                console.log(selectedRowData);
                props.setSelectedrows(selectedRowData)
            }}
            components={{
                Toolbar: HHoc(props.value,props.Selectedrows,props.callBack),
            }}
        />
    </>
}
export default function ScrollableTabsButtonForce(props) {
    const [value, setValue] = React.useState(0);
    const [Selectedrows, setSelectedrows] = React.useState([]);
    // console.log(props)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedrows([])
    };

    return (
        <Box sx={{flexGrow: 1, bgcolor: 'background.paper' }} style={{height:"80vh"}}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            centered
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            >
                <Tab label="Valid-Responses" value={0} />
                <Tab label="Placed-Student" value={1}/>
                <Tab label="Un-Eligible Student" val0e={2} />
            </Tabs>
        {value === 0 && <><Data_grid setSelectedrows={setSelectedrows} Selectedrows={Selectedrows} callBack={props.place_student} question={props.question} value={value} Response={props.Response_1} /></>}
        {value === 1 && <><Data_grid setSelectedrows={setSelectedrows} Selectedrows={Selectedrows} callBack={props.unPlaceStudent} question={props.question} value={value} Response={props.Response_2} /></>}
        {value === 2 && <><Data_grid setSelectedrows={setSelectedrows} question={props.question} value={value} Response={props.Response_3} /></>}
        {value === 3 && <><Data_grid setSelectedrows={setSelectedrows} question={props.question} value={value} Response={props.Response_3} /></>}

        </Box>
    );
}