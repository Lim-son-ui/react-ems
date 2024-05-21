import React, { useState ,useRef, useEffect } from 'react';
import * as echarts from 'echarts';

import { Button, Alert } from 'reactstrap'
import axios from 'axios';

const StackedareaChart = () => {
  const chartContainerRef = useRef(null);
  const myChart = useRef(null);

  const [chartdata, setchartdata] = useState({
    label: [],
    content: [],
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

    });
  };


  useEffect(() => {
    myChart.current = echarts.init(chartContainerRef.current, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      title: {
        // text: 'Stacked Area Chart'
        text: '0201 電表功率圖'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        // data: ['再生', '抽蓄', '汽電', '燃油', '燃氫', '燃煤', '核能']
        data: ['功率(kw)', '抽蓄', '汽電', '燃油', '燃氫', '燃煤', '核能']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          // data: ['2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年']
          data: chartdata.label
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          // name: '再生',
          name: '功率(kw)',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          // data: [112.5, 114.1, 140.5, 137.8, 157.8, 216.3, 243.3]
          data: chartdata.content
        },
        // {
        //   name: '抽蓄',
        //   type: 'line',
        //   stack: 'Total',
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [33.2, 33.6, 32.0, 31.5, 31.7, 30.5, 30.4]
        // },
        // {
        //   name: '汽電',
        //   type: 'line',
        //   stack: 'Total',
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [41.4, 46.5, 41.5, 41, 51.3, 34.4, 59.4]
        // },
        // {
        //   name: '燃油',
        //   type: 'line',
        //   stack: 'Total',
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [111.7, 65.9, 44.3, 30.6, 39.5, 35.1, 39.6]
        // },
        // {
        //   name: '燃氫',
        //   type: 'line',
        //   stack: 'Total',
        //   label: {
        //     show: true,
        //     position: 'top'
        //   },
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [891.2,	901.1,	887.6,	974.4,	1057.5,	1083.3,	1083.3]
        // },
        // {
        //   name: '燃煤',
        //   type: 'line',
        //   stack: 'Total',
        //   label: {
        //     show: true,
        //     position: 'top'
        //   },
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [905.2,	905.2,	867.5,	870.5,	882.1,	836.1,	836.1]
        // },
        // {
        //   name: '核能',
        //   type: 'line',
        //   stack: 'Total',
        //   label: {
        //     show: true,
        //     position: 'top'
        //   },
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [215.6,	266.6,	311.5,	303.4,	268.2,	171.5,	171.5]
        // }
      ]
    };

    if (option && typeof option === 'object') {
      myChart.current.setOption(option);
    }

    window.addEventListener('resize', () => {
      myChart.current.resize();
    });

    // Cleanup function to remove event listener and dispose chart
    return () => {
      window.removeEventListener('resize', () => {
        myChart.current.resize();
      });
      myChart.current.dispose();
    };
  }, [chartdata.content]);
  // }, []);

//   return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
    return(
      <div>
        <Button color="info" onClick={get_milisecond} style={{backgroundColor: 'transparent', color: 'transparent', borderBlockColor: 'transparent', borderColor: 'transparent'}}>{('取得資料')}</Button>
        <div ref={chartContainerRef} style={{ width: '100%', height: '240px' }} />
      </div>
    );
};

export default StackedareaChart;
