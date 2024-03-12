import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// 上面方法不行
// import faker from 'faker';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { date } from 'is_js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



// const HorizontalBarChart = () => {
//   return <Bar options={options} data={data} />;
// };

// export default HorizontalBarChart;

export default function HorizontalBarChart(){

    const options = {
        indexAxis: 'y',
        elements: {
        bar: {
            borderWidth: 2,
        },
        },
        responsive: true,
        plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
        //   text: 'Chart.js Horizontal Bar Chart',
            text: '這個是橫條圖',
            
        },
        },
    };
      
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = ['ACDC告警', 'MPPT告警', 'DCDC告警', '消防啟動', '水浸', '機櫃門開啟', '按下緊急停止(硬體)'];
    
    const startDate = moment('2023-01-01');
    const endDate = moment('2024-03-10');

    // const datelabels = [];
    // const datelabels = ['2024-01-01','2024-01-02','2024-01-03','2024-01-04','2024-01-05'];
    const datelabels = ['2024/01/01','2024/01/02','2024/01/03','2024/01/04','2024/01/05'];
    const currentDate = startDate.clone();

    while(currentDate.isSameOrBefore(endDate)){
        datelabels.push(currentDate.format('MMMM D, YYYY'));
        currentDate.add(1, 'days');
    }

    // const numericData = datelabels.map( () =>
    //     faker.datatype.number({ min: -1000, max: 1000})
    // )


    
    const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            //data: datelabels,
            // data: labels.map( () => 
            //     faker.datatype.number({ min: -1000, max: 1000 })
            // ),
            data: datelabels.map( () => 
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            // data: labels.map(() => 
            //     datelabels
            // ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            //data: datelabels,
            // data: labels.map(() => 
            //     faker.datatype.number({ min: -1000, max: 1000 })
            // ),
            data: datelabels.map(() => 
                faker.datatype.number({ min: -1000, max: 1000 })
            ),
            // data: labels.map(() => 
            //     datelabels
            // ),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };
    
    

    return <Bar options={options} data={data} />;
}