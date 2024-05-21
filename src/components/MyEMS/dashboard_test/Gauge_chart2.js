import React, { useState, useEffect } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, GaugeChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  GaugeChart,
  CanvasRenderer,
]);

const data = [
  {
    value: 42,
    //中心的數值
    // value: [10,50,100],
  },
];

const option = {
  backgroundColor: '#0d1e1a',
  series: [
    {
      type: 'gauge',
    //center: ['20%', '100%'],
      center: ['50%', '70%'],
    //   radius: '110%',
    radius: '90%',
      //下面的min max 感覺是儀錶板後方的範圍
      min: 20,
      max: 399,
      splitNumber: 10,
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: [[1, 'rgba(0,0,0,0)']],
        },
      },
      axisLabel: {
        show: true,
        color: '#4b695e',
        fontSize: 15,
        distance: -20,
        formatter: function (v) {
          return v;
        },
      },
      axisTick: {
        show: true,
        splitNumber: 5,
        lineStyle: {
          color: '#263b35',
          width: 1,
        },
        length: -20,
      },
      splitLine: {
        show: true,
        length: -20,
        lineStyle: {
          color: '#4aca96',
          width: 2,
        },
      },
    },
    //下面這個如果沒了  儀表下面的半圓就會沒
    {
      type: 'gauge',
    //   radius: '100%',
    radius: '80%',
      center: ['50%', '70%'],    
    //   splitNumber: 0,
      splitNumber: 20,
      startAngle: 200,
      endAngle: -20,
    //   startAngle: 180,
    //   endAngle: 0,
      axisLine: {
        show: true,
        lineStyle: {
          width: 20,
          color: [
            [
              1,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#ff0000',
                },
                {
                  offset: 0.5,
                  color: '#FFFF00',
                },
                {
                  offset: 1,
                  color: '#4ccb96',
                },
              ]),
            ],
          ],
        },
      },
      splitLine: {
        // show: false,
        show: true,
      },
      axisLabel: {
        // show: false,
        show: true,
      },
      axisTick: {
        // show: false,
        show: true,
      },
      pointer: {
        //下面就是控制指針的吧
        // show: false,
        show: true,
        length: '20%',
        width: '5%',
        // length: '80%',
        // width: '2%',
      },
      title: {
        show: true,
        offsetCenter: [0, '60%'],
        textStyle: {
          fontWeight: 'bold',
          color: '#0ab7ff',
          fontSize: 30,
        },
      },
      detail: {
        show: true,
        offsetCenter: [0, '-40%'],
        color: '#ffffff',
        textStyle: {
          fontSize: 60,
          color: '#4aca96',
        },
      },
      data,
    },
  ],
};

const Gauge_chart2 = () => {
  return (
    <div>
      <p>Ejemplo Gauge</p>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        opts={{}}
        style={{ height: '500px', width: '500px' }}
      />
    </div>
  );
};

export default Gauge_chart2;
