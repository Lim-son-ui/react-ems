import React, { useState, useMemo } from 'react'
import { Row, Col, Card, CardBody } from 'react'
import ReactEchartsCore from 'echarts-for-react';
// import * as echarts from 'echarts/lib/echarts';
import {
    GridComponent,
    ToolboxComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent} from 'echarts/components';
import LineChart from '../common/LineChart';


import { Button, Alert } from 'reactstrap'
import axios from 'axios';


import { useWorker, WORKER_STATUS } from "@koale/useworker"
// import { useToasts } from 'react-toast-notifications'
// echarts.use([
//     LineChart,
//     GridComponent,
//     ToolboxComponent,
//     DataZoomComponent,
//     MarkLineComponent,
//     MarkPointComponent
// ]);

function EchartsDemo() {

    const [lineLabels, setLinaLabels] = useState([]);
    const [chartdata, setchartdata] = useState({
      label: [],
      content: [],
    });

    // const [chartdata, {
    //   label:[],
    //   content:[]
    // }] = useWorker();

    const memoizechartdata = useMemo( () => chartdata, [chartdata]);

    const worker = useWorker(() => {
      function getchartdata(){
        const label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const contnet = [1,2,3,4,5,6,7];

        return{ label, contnet };
      }
      return getchartdata();

    })


    const option = {
        title: {
            // text: 'Temperature Change in the Coming Week'
            // text: '日期統計'
            // text: '溫度折線圖'
            // text: '淨零碳排之各部門排碳量'
            text: '0201 電表功率圖'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            // data: ['2024/03/11', '2024/03/12', '2024/03/13', '2024/03/14', '2024/03/15', '2024/03/16', '2024/03/17']
            // data: ['2020年', '2025年', '2030年', '2035年', '2040年']
            // data: chartdata.label
            data: memoizechartdata.label
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              // formatter: '{value} °C'
              // formatter: '{value} 億噸CO2'
              formatter: '{value} kw 功率'
            }
          },
          series: [
            {
              // name: '電力',
              name: '功率(kw)',
              type: 'line',
              // data: [135, 108, 58, 21, -1],
              // data: chartdata.content,
              data: memoizechartdata.content,
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
            // {
            //   name: '製造',
            //   type: 'line',
            //   data: [85, 81, 69, 52, 35],
            //   markPoint: {
            //     data: [
            //       { type: 'max', name: 'Max' },
            //       { type: 'min', name: 'Min' }
            //     ]
            //   },
            //   markLine: {
            //     data: [{ type: 'average', name: 'Avg' }]
            //   }
            // },
            // {
            //   name: '運輸',
            //   type: 'line',
            //   data: [72, 72, 57, 41, 27],
            //   markPoint: {
            //     data: [
            //       { type: 'max', name: 'Max' },
            //       { type: 'min', name: 'Min' }
            //     ]
            //   },
            //   markLine: {
            //     data: [{ type: 'average', name: 'Avg' }]
            //   }
            // },
            // {
            //   name: '建築',
            //   type: 'line',
            //   data: [29, 24, 18, 12, 7],
            //   markPoint: {
            //     data: [
            //       { type: 'max', name: 'Max' },
            //       { type: 'min', name: 'Min' }
            //     ]
            //   },
            //   markLine: {
            //     data: [{ type: 'average', name: 'Avg' }]
            //   }
            // },
            // {
            //   name: 'Lowest',
            //   type: 'line',
            //   data: [1, -2, 2, 5, 3, 2, 0],
            //   markPoint: {
            //     data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            //   },
            //   markLine: {
            //     data: [
            //       { type: 'average', name: 'Avg' },
            //       [
            //         {
            //           symbol: 'none',
            //           x: '90%',
            //           yAxis: 'max'
            //         },
            //         {
            //           symbol: 'circle',
            //           label: {
            //             position: 'start',
            //             formatter: 'Max'
            //           },
            //           type: 'max',
            //           name: '最高点'
            //         }
            //       ]
            //     ]
            //   }
            // }
          ]  
    }

    // const option_test = {
    //     xAxis: {
    //       data: ['A', 'B', 'C', 'D', 'E']
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         data: [10, 22, 28, 23, 19],
    //         type: 'line',
    //         areaStyle: {}
    //       },
    //       {
    //         data: [25, 14, 23, 35, 10],
    //         type: 'line',
    //         areaStyle: {
    //           color: '#ff0',
    //           opacity: 0.5
    //         }
    //       }
    //     ]
    // };

    

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
  
          // console.log("this is chartdata")
          // console.log(chartdata)
      });
    };

    // const { addToast } = useToasts();
    const getchartdatas = () => {
      worker().then(data => {
        setchartdata(data);
        // addToast('資料獲取成功',{ appearance: 'success'});
        console.log('資料獲取成功');
        
      }).catch(error => {
        console.error('worker error:', error);
        // addToast('資料獲取失敗',{ appearance: 'error'});
        console.log('資料獲取失敗');
      });
    };

    return (
        <div>
            <Button color="info" onClick={get_milisecond} >{('取得資料')}</Button>
            {/* <Button color="info" onClick={getchartdatas} >{('取得多進程資料')}</Button> */}
            <ReactEchartsCore
                option={option}
                notMerge={true} // 如果需要合併舊的 option，請將此設置為 false
                lazyUpdate={true} // 如果需要懶更新，請將此設置為 false
                theme={'light'} // 可選的 ECharts 主題
                // onChartReady={(chart) => {
                //     // 可以在圖表準備好時執行一些操作
                //     console.log('Chart is ready!', chart);
                // }}
                opts={{ renderer: 'canvas' }} // 可以設置渲染器，預設使用 'canvas'
                style={{ height: '400px', width: '100%' }} // 設置圖表的高度和寬度

            />

            {/* <ReactEchartsCore
                option={option_test}
                notMerge={true} // 如果需要合併舊的 option，請將此設置為 false
                lazyUpdate={true} // 如果需要懶更新，請將此設置為 false
                theme={'light'} // 可選的 ECharts 主題
                // onChartReady={(chart) => {
                //     // 可以在圖表準備好時執行一些操作
                //     console.log('Chart is ready!', chart);
                // }}
                opts={{ renderer: 'canvas' }} // 可以設置渲染器，預設使用 'canvas'
                style={{ height: '400px', width: '100%' }} // 設置圖表的高度和寬度

            /> */}

        </div>
    )
}

export default EchartsDemo
