import React, { useState, useEffect, useRef } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { Button, Alert } from 'reactstrap'
import { useAlert } from 'react-alert';

function Datatest() {
    // const alert = useAlert();
    const [ showAlert, setShowAlert ] = useState(false);
    const toggleAlert = () => {
        setShowAlert(!showAlert);
    };

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

    const confirm = () => {
        if(window.confirm('請問，確定要執行此動作?')){
            get_data();
        }
    }

    const [start1, setstart1] = useState(false);
    const firststart1 = useRef(true);
    // 當按下讀取排程 按鈕
    const togglestart1 = () => {
        setstart1(!start1);
    }

    const [timer1, settimer1] = useState(600);
    const tick1 = useRef();


    useEffect(() => {
        
        if(firststart1.current){
            console.log("first1 render, dont run useeffect for timer");
            firststart1.current = !firststart1.current;
            return;
        }

        
        if(start1){
            tick1.current = setInterval(() => {
                settimer1((timer1) =>{
                    timer1 = timer1 -1;
                    get_data();
                    //gettest();
                });
            }, 600);
        }

      
        
        if( !start1 ){
            console.log("clear interval");
            
            clearInterval(tick1.current);
            
            
        }

        return () => {
            clearInterval(tick1.current);
        } 
     
    },[start1]);



    return (
        <div>
            <Button color="warning" onClick={toggleAlert} >{('秀出告警')}</Button>
            {
                showAlert && (
                    <Alert color='warning' isOpen={showAlert} toggle={toggleAlert}>
                        oh look, an alert!
                    </Alert>
                )
            }
            {/* <Button color="warning" onClick={() => {
                alert show("oh look, an alert!");
            }} >{('秀出告警')}</Button> */}
            <Button color="info" onClick={confirm} >{('取得資料')}</Button>
            <Button color="success" onClick={togglestart1} >{('不斷取得資料')}</Button>
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
