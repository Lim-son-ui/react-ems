import React, { useState } from 'react'
import Modal from 'react-modal'
import CardSummary from '../common/CardSummary';
import {v4 as uuid} from 'uuid';
import BarChart from '../common/BarChart';
import { 
    CChartPie,
    CChartBar,
    CChartLine,
} from '@coreui/react-chartjs'
import './Modalex.css'

import {
    Button,
    Alert,
    Col,
    Row,
    Spinner, } from 'reactstrap';

import BarChartExample from '../common/BarChartExample'
import Tabler_react from '../dashboard_test/Tabler_react';

import LineChartnew from '../common/LineChartnew';
import EchartsDemo from '../Space/EchartsDemo';


function Modalex() {

    const [chartdata, setchartdata] = useState({
        label: [],
        content: []
      });    

   

    const random = () => Math.round(Math.random() * 100)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [spinnerHidden, setSpinnerHidden] = useState(false);
    const [thisMonthInputCardSummaryList, setThisMonthInputCardSummaryList] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    const title = 'the title';
    const rate = (4.3);
    const color = 'success';
    const children = <p>your content goes here</p>;
    const footnote = 'your footnote';
    const footvalue = (12345);
    const footunit = ('units');


    const cardsumItem = [
        {
            name: 'this is name',
            unit: 'unit 1',
            subtotal: 'this is subtotal',
            increment_rate: 'this is increment_rate',
            subtotal_per_unit_area: 'this is per unit area',
            incr_rate:3.5,
        },
    ]

    return (
        <div>
        <button onClick={openModal} style={{ backgroundColor: '#003D79'}}>細部內容</button>
            <Modal
                // className='ReactModal__Overlay'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='example modal'
            >
                <div className='custom-modal-overlay'>
                    <h2 style={{ color: '#4F4F4F'}}>細部統計圖</h2>
                    {/* <p>測試區?</p> */}
                    <button onClick={closeModal}>關閉</button>
                    <Spinner color="primary" hidden={spinnerHidden}  />
                    <Spinner color="secondary" hidden={spinnerHidden}  />
                    <Spinner color="success" hidden={spinnerHidden}  />

                    {/* <CardSummary
                        key={uuid()}
                        title={('this is title')}
                        rate={rate}
                        color='success'
                        footnote={('this is footnote')}
                        footvalue={footvalue}
                        footunit={footunit} /> */}
                        
                        {/* <BarChart
                            labels={'title'}
                            data={{
                                datasets: [{
                                data: [0, 0, 0, 0, 0, 0],
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                }]
                            }}
                        >
                        </BarChart> */}
                    {/* <CChartBar
                        data={{
                        labels: ['vcell1', 'vcell2', 'vcell3', 'vcell4', 'vcell5', 'vcell6', 'vcell7'],
                        datasets: [
                            {
                            label: 'volts',
                            backgroundColor: '#003D79',
                            data: [0.3, 3.287, 2.4, 3.5, 1.5, 6.2, 4.6],
                            },
                        ],
                        }}
                        labels="months"
                    /> */}
                    

                    <LineChartnew 
                        reportingTitle={("0201 電表功率圖")}
                        baseTitle=''
                        labels={chartdata.label}
                        data={chartdata.content}>
                    </LineChartnew>
                    <EchartsDemo/>
                    {/* <Tabler_react/>
                    <BarChartExample/> */}

                    {/* <CChartLine
                        data={{
                            labels: ['vcell1', 'vcell2', 'vcell3', 'vcell4', 'vcell5', 'vcell6', 'vcell7'],
                            datasets: [
                                {
                                    label: 'Voltage',
                                    backgroundColor: 'rgba(95, 0, 0, 0.5)',
                                    borderColor: 'rgba(95, 0, 0, 1)',
                                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                    pointBorderColor: '#fff',
                                    data: [
                                        234, 145, 342, 83, 29, 537, 420
                                    ],
                                },
                                {
                                    label: 'random number',
                                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                    borderColor: 'rgba(151, 187, 205, 1)',
                                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                    pointBorderColor: '#fff',
                                    data: [
                                        random(),
                                        random(),
                                        random(),
                                        random(),
                                        random(),
                                        random(),
                                        random(),
                                    ],
                                },
                            ],
                        }}
                    /> */}
                </div>

            </Modal>
        </div>
    )
}

export default Modalex
