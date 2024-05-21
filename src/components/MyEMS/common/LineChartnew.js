import React, { useState, useContext, useEffect, useRef } from 'react';
import { Row, Col, Card, CardBody, CustomInput } from 'reactstrap';
import { rgbaColor, themeColors, isIterableArray } from '../../../helpers/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import AppContext from '../../../context/Context';


import axios from 'axios';
import { Button, Alert } from 'reactstrap'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChartnew = ({
  reportingTitle,
  baseTitle,
  labels,
  data,
  options
}) => {
  const [selectedLabel, setSelectedLabel] = useState('a0');
  const [option, setOption] = useState('a0');
  const { isDark } = useContext(AppContext);
  const chartRef = useRef(null);
// const [lineData, setLineData] = useState({});

//   const [lineData, setLineData] = useState({
//     datasets: [12,35,32,6],
//   });

  const [chartdata, setchartdata] = useState({
    label: [],
    content: [],
  });

  const [lineData, setLineData] = useState({
    // labels: ['Label1', 'Label2', 'Label3'], // X 軸的標籤
    // labels: ['00:00', '01:00', '02:00', '03:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
    // labels: ['2020年', '2025年', '2030年', '2035年', '2040年'],
    labels:[],
    datasets: [
      {
        label: '功率(kw)',
        //label: '電力', // 資料集的名稱
        // data: [ 135, 108, 58, 21, -1], // 數據點的數值
        data:[],
        borderColor: 'rgba(255, 99, 132, 1)', // 線條顏色
        borderWidth: 2, // 線條寬度
        fill: true, // 是否填充區域
        // fill: false, // 是否填充區域
      },
      // {
      //   label: '製造', // 資料集的名稱
      //   data: [ 85, 81, 69, 52, 35], // 數據點的數值
      //   borderColor: 'rgba(77, 124, 193, 0.7)', // 線條顏色
      //   borderWidth: 2, // 線條寬度
      //   fill: true, // 是否填充區域
      //   // fill: false, // 是否填充區域
      // },
      // {
      //   label: '運輸', // 資料集的名稱
      //   data: [ 72, 72, 57, 41, 27], // 數據點的數值
      //   borderColor: 'rgba(88, 170, 108, 0.73)', // 線條顏色
      //   borderWidth: 2, // 線條寬度
      //   fill: true, // 是否填充區域
      //   // fill: false, // 是否填充區域
      // },
      // {
      //   label: '建築', // 資料集的名稱
      //   data: [ 29, 24, 18, 12, 7], // 數據點的數值
      //   borderColor: 'rgba(245, 231, 72, 0.85)', // 線條顏色
      //   borderWidth: 2, // 線條寬度
      //   fill: true, // 是否填充區域
      //   // fill: false, // 是否填充區域
      // },
    //   {
    //     label: 'Dataset 2', // 資料集的名稱
    //     data: [36, 21, 52], // 數據點的數值
    //     borderColor: 'rgba(154, 99, 87, 5)', // 線條顏色
    //     borderWidth: 2, // 線條寬度
    //     fill: true, // 是否填充區域
    //     // fill: false, // 是否填充區域
    //   },
    //   {
    //     label: 'Dataset 3', // 資料集的名稱
    //     data: [46, 29, 37], // 數據點的數值
    //     borderColor: 'rgba(387, 43, , 54)', // 線條顏色
    //     borderWidth: 2, // 線條寬度
    //     fill: true, // 是否填充區域
    //     // fill: false, // 是否填充區域
    //   },
      // 可以加入更多的 datasets，每一個代表一條線
    ],
  });
  

  const get_milisecond = () => {
    axios.get("http://localhost:3088/getexcelfile").then((response) => {
        const label = response.data.map(item => item.time);
        const content = response.data.map(item => Math.abs(parseInt(item.pv_power)))

        console.log("this is label");
        console.log(label);

        console.log("this is content");
        console.log(content);
        
        setchartdata(prevstate => ({
          ...prevstate,
          label,
          content
        }));

        setLineData(prevState => ({
          ...prevState,
          labels: label,
          datasets: [
            {
              ...prevState.datasets[0],
              data: content,
            }
          ],
        }));
    });
  };
//   useEffect(() => {
//     const chart = chartRef.current;
//     if (chart) {
//       const ctx = chart.ctx;
//       const gradientFill = isDark
//         ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
//         : ctx.createLinearGradient(0, 0, 0, 250);
//       gradientFill.addColorStop(0, isDark ? 'rgba(44,123,229, 0.5)' : 'rgba(255, 255, 255, 0.3)');
//       gradientFill.addColorStop(1, isDark ? 'transparent' : 'rgba(255, 255, 255, 0)');

//       const chartData = {
//         datasets: [{
//             borderWidth: 2,
//             data: data[option],
//             borderColor: rgbaColor(isDark ? themeColors.primary : '#000', 0.8),
//             backgroundColor: gradientFill,
//             tension: 0.4,
//           }],
//         labels: labels[selectedLabel],
//       };
//       setLineData(chartData);
//     }
//   }, [data, option, labels]);

  const config = {
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            fontColor: rgbaColor('#789', 0.8),
            fontStyle: 600
          },
          gridLines: {
            color: rgbaColor('#000', 0.1),
            zeroLineColor: rgbaColor('#000', 0.1),
            lineWidth: 1
          }
        },
        y: {
          display: true,
          gridLines: {
            color: rgbaColor('#000', 0.1)
          }
        },
      },
      tooltips: {
        mode: 'x-axis',
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
        callbacks: {
          label: tooltipItem => `${labels[selectedLabel][tooltipItem.index]} - ${tooltipItem.yLabel}`,
          title: () => null
        }
      },
      hover: { mode: 'label' },
    }
  };

  return (
    <div>
      <Button color="info" onClick={get_milisecond} >{('取得資料')}</Button>
      <Card className="mb-3">
        <CardBody className="rounded-soft">
          <Row className="text-white align-items-center no-gutters">
            <Col>
              <h6>{reportingTitle}</h6>
              <p className="fs--1 font-weight-semi-bold">
                {baseTitle}
              </p>
            </Col>
            {isIterableArray(options) &&
              <Col xs="auto" className="d-none d-sm-block">
                <CustomInput
                  id="ddd"
                  type="select"
                  bsSize="sm"
                  className="mb-3 shadow"
                  value={option}
                  onChange={({ target }) => {setOption(target.value); setSelectedLabel(target.value);}}
                >
                  {options.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                </CustomInput>
              </Col>
            }
          </Row>
          <Chart ref={chartRef} type="line" data={lineData} options={config.options} width={1618} height={218} />
          {/* <Chart ref={chartRef} type="line" data={lineData} options={config.options} width={1618} height={160} /> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default LineChartnew;

