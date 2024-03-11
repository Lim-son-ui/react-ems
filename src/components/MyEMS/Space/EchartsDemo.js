import React, { useState } from 'react'
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
    
    const option = {
        title: {
            text: 'Temperature Change in the Coming Week'
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: 'Highest',
              type: 'line',
              data: [10, 11, 13, 11, 12, 12, 9],
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
            {
              name: 'Lowest',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [
                  { type: 'average', name: 'Avg' },
                  [
                    {
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        position: 'start',
                        formatter: 'Max'
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            }
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


    return (
        <div>
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