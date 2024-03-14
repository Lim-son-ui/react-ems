import React, { useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { Button } from 'reactstrap'

function Datatest() {

    const [schedule_data, setschedule_data] = useState([]);


    const columns = [
        {
            dataField: 'startTimeHour',
            text: '開始(時)',
            classes: 'py-2 align-middle'
        }, 
        {
            dataField: 'startTimeMinute',
            text: '開始(分)',
            classes: 'py-2 align-middle'
        }, 
        {
            dataField: 'endTimeHour',
            text: '結束(時)',
            classes: 'py-2 align-middle'
        }, 
        {
            dataField: 'endTimeMinute',
            text: '結束(分)',
            classes: 'py-2 align-middle'
        }
    ];

    const get_data = () => {
        console.log("out");
        // axios.get("http://localhost:3088/getData").then((response) => {
        //     setschedule_data(response.data);
        //     console.log(response.data);
        //     console.log("aaa");
        // });
        axios.get("http://localhost:3088/getData").then((response) => {
            setschedule_data(response.data);
        });
    }

    return (
        <div>
            <Button color="info" onClick={get_data} >{('取得資料')}</Button>
            {/* this is test */}
            <BootstrapTable
                keyField='id'
                data={schedule_data}
                columns={columns}
                classes="table-dashboard table-striped table-sm fs--1  mb-0 table-dashboard-th-nowrap"
                rowClasses="btn-reveal-trigger"
                headerClasses="bg-200 text-900"
            >

            </BootstrapTable>
        </div>
    )
}

export default Datatest
