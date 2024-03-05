import React, { Fragment, useState, useEffect } from 'react'

import BootstrapTable from 'react-bootstrap-table-next'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Col,
    CustomInput,
    Row,
    Form,
    FormGroup,
    Input,
    Label,
    Spinner,
  } from 'reactstrap';
  import axios from 'axios';

function Boot_table_test() {
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const [products, setproducts] = useState([]);

    const handle_add = () => {
        axios.get("http://localhost:3088/get_myems_schedule").then((response) => {
            setproducts(response.data);
        });
    }
    // const products = [ 
    //     {
    //         "id":1,
    //         "todo":"充電",
    //         "month":"2月",
    //         "time_start":"0時1分",
    //         "time_end":"6時0分",
    //         "power":"-15.0",
    //     },  
    //     {
    //         "id":2,
    //         "todo":"待機",
    //         "month":"2月",
    //         "time_start":"6時1分",
    //         "time_end":"9時0分",
    //         "power":"0.0",
    //     }, 
    //     {
    //         "id":3,
    //         "todo":"放電",
    //         "month":"2月",
    //         "time_start":"9時1分",
    //         "time_end":"12時0分",
    //         "power":"15.0",
    //     }, 
    //     {
    //         "id":4,
    //         "todo":"充電",
    //         "month":"2月",
    //         "time_start":"12時1分",
    //         "time_end":"14時0分",
    //         "power":"-20.0",
    //     }, 
    //     {
    //         "id":5,
    //         "todo":"放電",
    //         "month":"2月",
    //         "time_start":"14時1分",
    //         "time_end":"17時0分",
    //         "power":"15.0",
    //     }, 
    //     {
    //         "id":6,
    //         "todo":"放電",
    //         "month":"2月",
    //         "time_start":"17時1分",
    //         "time_end":"19時0分",
    //         "power":"7.0",
    //     }, 
    //     {
    //         "id":7,
    //         "todo":"待機",
    //         "month":"2月",
    //         "time_start":"19時1分",
    //         "time_end":"0時0分",
    //         "power":"0.0",
    //     },  
    // ];
    const columns = [
        {
            dataField: 'todo',
            text: '策略'
        }, 
        {
            dataField: 'month',
            text: '月'
        }, 
        {
            dataField: 'time_start',
            text: '開始'
        },
        {
            dataField: 'time_end',
            text: '結束'
        },
        {
            dataField: 'power',
            text: '功率'
        },
    ];


    return (
        <div>
            <BootstrapTable keyField='id' data={ products } columns={ columns } />
        </div>
    )
}

export default Boot_table_test
