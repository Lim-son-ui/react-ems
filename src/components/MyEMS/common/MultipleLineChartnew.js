import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { CheckPicker } from 'rsuite';
import { rgbaColor, themeColors, isIterableArray, getGrays } from '../../../helpers/utils';
import AppContext from '../../../context/Context';
import moment from 'moment';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/lib/echarts';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent} from 'echarts/components';

echarts.use([
  LineChart,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent]);


// 主要 控制呈現內容  的部分為series node  data 這幾個變數
const MultipleLineChartnew = ({
  reportingTitle,
  baseTitle,
  labels,
  data,
  options
}) => {
  const colors = ['#2c7be5', '#00d27a', '#27bcfd', '#f5803e', '#e63757'];
  const [values, setValues] = useState(['a0']);
  const [oldValues, setOldValues] = useState(['a0']);
  const { isDark } = useContext(AppContext);

  const [nodes, setNodes] = useState([{
    name: options.label,
    borderWidth: 2,
    // data: data['a0'],
    data: data['a0'],
    type: 'line',
    markPoint: {
      label:{
        color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
      },
      itemStyle: {
        color: colors[0],
      },
      data: [
        {
          type: 'max',
          name: 'Max Value',
        },
        {
          type: 'min',
          name: 'Min Value',
        }
      ]
    },
    markLine: {
      lineStyle: {
        color: colors[0],
      },
      data: [{
          type: 'average',
          name: 'Average Value'
      }],
      label: {
        color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
      },
    },
  }]);


  const [lastMoment, setLastMoment] = useState(moment());
  const [lineLabels, setLinaLabels] = useState([]);

  let handleChange = (arr) => {
    if (arr.length < 1) {
      return ;
    }
    let currentMoment = moment();
    setOldValues(values);
    setValues(arr);
    setLastMoment(currentMoment);
  }

  useEffect(() => {
    let tempNodes = [...nodes];
    let index = values[0];
    if (options[index.slice(1)] && data[index] && tempNodes.length > 0 && tempNodes[0].label === undefined) {
      tempNodes = [];
      tempNodes[0] = {
        data: data[index],
        type: 'line',
        smooth: true,
        name: options[index.slice(1)] ? options[index.slice(1)].label : '',
        lineStyle: {
          color: colors[0],
        },
        itemStyle: {
          color: colors[0],
        },
        markPoint: {
          data: [
           {
              type: 'max',
              name: 'Max Value',
            },
            {
              type: 'min',
              name: 'Min Value',
            }
          ],
          label:{
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          },
          itemStyle: {
            color: colors[0],
          },
        },
        markLine: {
          lineStyle: {
            color: colors[0],
          },
          data: [{
              type: 'average',
              name: 'Average Value'
          }],
          label: {
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          },
        },
      }
    }
    setNodes(tempNodes);
    setLinaLabels(labels[values[0]]);
    setValues(['a0']);
    setOldValues(['a0'])
  }, [data, labels, options]);

  useEffect(() => {
    let tempNodes = [...nodes];
    if (oldValues.length < values.length) {
      let index = values[values.length - 1];
      tempNodes.push({
        data: data[index],
        type: 'line',
        smooth: true,
        name: options[index.slice(1)].label,
        itemStyle: {
          color: colors[index.slice(1) % 5],
        },
        lineStyle: {
          color: colors[index.slice(1) % 5],
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'Max Value',
            },
            {
              type: 'min',
              name: 'Min Value',
            }
          ],
          label:{
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          },
          itemStyle: {
            color: colors[index.slice(1) % 5],
          },
        },
        markLine: {
          lineStyle: {
            color: colors[index.slice(1) % 5],
          },
          label: {
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          },
          data: [
            {
              type: 'average',
              name: 'Average Value'
            }
          ]
        },
      })
    } else {
      let i = 0
      for (; i <= oldValues.length; i++ ) {
        if (i === values.length || oldValues[i] !== values[i]){
          break;
        }
      }
      tempNodes.splice(i, 1);
    }
    setNodes(tempNodes);
    setLinaLabels(labels[values[0]]);
  }, [lastMoment]);

  let getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: getGrays(isDark)[100],
        borderColor: getGrays(isDark)[300],
        color: isDark ? themeColors.light : themeColors.dark,
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // data: lineLabels ? lineLabels : ['0'],
        data: ['2024/03/11', '2024/03/12', '2024/03/13', '2024/03/14', '2024/03/15', '2024/03/16', '2024/03/17'],
        axisLabel: {
          interval: 'auto',
          color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          rotate:30
        },
        axisLine:{
          lineStyle:{
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {show: false},
        axisLabel: {
          color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
        },
        axisLine:{
          lineStyle:{
            color: rgbaColor(isDark ? '#fff' : '#000', 0.8),
          }
        }
      },
      series: nodes,
      toolbox: {
        right: 10,
        feature: {
          // dataZoom: {
          //   yAxisIndex: 'none'
          // },
        },
        show: false
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          left: '2%',
        },
        {
          type: 'inside',
          xAxisIndex: [0],
        },
        {
          type: 'inside',
          yAxisIndex: [0],
        }
      ],
    };
  }

  // const getOption = () => {
  //   return {
  //     tooltip: {
  //       trigger: 'axis',
  //       backgroundColor: '#ffffff',
  //       borderColor: '#cccccc',
  //       padding: 10,
  //       textStyle: {
  //         color: '#333333',
  //       },
  //       formatter: function (params) {
  //         const date = params[0].name;
  //         const value = params[0].value[1];
  //         return `Date: ${date}<br/>Frequency: ${value}`;
  //       },
  //     },
  //     grid: {
  //       left: '5%',
  //       right: '5%',
  //       bottom: '15%',
  //       containLabel: true,
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: data.map(item => item.date), // 请确保你的数据结构有一个包含日期的字段
  //       axisLabel: {
  //         interval: 'auto',
  //         rotate: 30,
  //       },
  //     },
  //     yAxis: {
  //       type: 'value',
  //       splitLine: { show: false },
  //     },
  //     series: [
  //       {
  //         type: 'line',
  //         data: data.map(item => [item.date, item.frequency]), // 请确保你的数据结构有日期和频率字段
  //         markLine: {
  //           lineStyle: {
  //             color: 'red',
  //           },
  //           data: [
  //             {
  //               type: 'average',
  //               name: 'Average Frequency',
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   };
  // };

  return (
    <Card className="mb-3">
      <CardBody className="rounded-soft">
        <Row className="text-white align-items-center no-gutters">
          <Col>
            <h5 className="text-lightSlateGray mb-0">{reportingTitle}</h5>
            <p className="fs--1 font-weight-semi-bold">
              {baseTitle}
            </p>
          </Col>
          {/* 帶出label */}
          {options[0] && isIterableArray(options) &&
            <Col xs="auto" className="d-none d-sm-block">
              <CheckPicker
                data={options}
                value={values}
                appearance="default"
                placeholder="select"
                searchable={false}
                countable={false}
                onSelect={handleChange}
                style={{ width: 224, borderRadius: '.25rem'}}
                />
            </Col>
          }
        </Row>
        {/* 運行值條圖 */}
        <ReactEchartsCore
            echarts={echarts}
            notMerge={true}
            option={getOption()}
            style={{ width: '100%', height: 318 }}
            />
      </CardBody>
    </Card>
  );
};

export default MultipleLineChartnew;