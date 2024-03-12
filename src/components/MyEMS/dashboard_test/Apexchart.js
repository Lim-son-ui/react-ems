import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';


const Apexchart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
            { x: 'Operations', y: [2800, 4500] },
            { x: 'Customer Success', y: [3200, 4100] },
            { x: 'Engineering', y: [2950, 7800] },
            { x: 'Marketing', y: [3000, 4600] },
            { x: 'Product', y: [3500, 4100] },
            { x: 'Data Science', y: [4500, 6500] },
            { x: 'Sales', y: [4100, 5600] },
        //   { x: 'Operations', y: [new Date('2019-02-27').getTime(), new Date('2019-03-04').getTime()] },
        //   { x: 'Customer Success', y: [new Date('2019-03-04').getTime(), new Date('2019-03-08').getTime()] },
        //   { x: 'Engineering', y: [2006/7, 2019/10] },
        //   { x: 'Marketing', y: [2007/9, 2022/4] },
        //   { x: 'Product', y: [1997/5, 2008/9] },
        //   { x: 'Data Science', y: [2004/2, 2021/8] },
        //   { x: 'Sales', y: [2006/4, 2023/11] },
        ],
      },
    ],
    options: {
      chart: {
        height: 390,
        type: 'rangeBar',
        zoom: {
          enabled: false,
        },
      },
      colors: ['#EC7D31', '#36BDCB'],
      plotOptions: {
        bar: {
          horizontal: true,
          isDumbbell: true,
          dumbbellColors: [['#EC7D31', '#36BDCB']],
        },
      },
      title: {
        text: 'Paygap Disparity',
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'left',
        customLegendItems: ['Female', 'Male'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#36BDCB'],
          inverseColors: false,
          stops: [0, 100],
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
  });

//   const [charttWidth,setcharttWidth] = useState({});

//   useEffect(() => {
//     const handleResize = () => {
//       const windowWidth = window.innerWidth;
//       // 設定寬度為畫面寬度的百分比，可以根據需要調整百分比
//       const widthPercentage = 90;
//       const chartWidth = (widthPercentage / 10) * windowWidth;

//       //setcharttWidth({chartwidth});

//       setChartData((prevData) => ({
//         ...prevData,
//         options: {
//           ...prevData.options,
//           chart: {
//             ...prevData.options.chart,
//             width: chartWidth,
//           },
//         },
//       }));
//     };

//     // 監聽視窗大小變化
//     window.addEventListener('resize', handleResize);

//     // 組件卸載時移除事件監聽
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

  const containerStyle = {
    width: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart 
            options={chartData.options} 
            series={chartData.series} 
            type="rangeBar" 
            style = { containerStyle }
            height={390} 
            // height={350} 
            // width={1250}

        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Apexchart;