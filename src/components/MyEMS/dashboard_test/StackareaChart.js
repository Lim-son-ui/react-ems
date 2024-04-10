import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const StackedareaChart = () => {
  const chartContainerRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = echarts.init(chartContainerRef.current, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      title: {
        text: 'Stacked Area Chart'
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
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
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
  }, []);

//   return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
    return <div ref={chartContainerRef} style={{ width: '100%', height: '240px' }} />;
};

export default StackedareaChart;
