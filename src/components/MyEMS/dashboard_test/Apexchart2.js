import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

const Apexchart2 = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
          {
            // x: 'Analysis',
            x: 'ACDC告警',
            y: [
              new Date('2019-02-27').getTime(),
              new Date('2019-03-04').getTime(),
            ],
            fillColor: '#008FFB',
          },
          {
            // x: 'Design',
            x: 'MPPT告警',
            y: [
              new Date('2019-03-04').getTime(),
              new Date('2019-03-08').getTime(),
            ],
            fillColor: '#00E396',
          },
          {
            // x: 'Coding',
            x: 'DCDC告警',
            y: [
              new Date('2019-03-07').getTime(),
              new Date('2019-03-10').getTime(),
            ],
            fillColor: '#775DD0',
          },
          {
            x: '消防啟動',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-12').getTime(),
            ],
            fillColor: '#FEB019',
          },
          {
            x: '水浸',
            y: [
              new Date('2019-03-12').getTime(),
              new Date('2019-03-17').getTime(),
            ],
            fillColor: '#FF4560',
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'rangeBar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const label = opts.w.globals.labels[opts.dataPointIndex];
          const a = moment(val[0]);
          const b = moment(val[1]);
          const diff = b.diff(a, 'days');
          return label + ': ' + diff + (diff > 1 ? ' days' : ' day');
        },
        style: {
          colors: ['#f3f4f5', '#fff'],
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ['#f3f4f5', '#fff'],
          opacity: 1,
        },
      },
    },
  });

  const containerStyle = {
    width: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    background: '#c3dc99'
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart 
            options={chartData.options} 
            series={chartData.series} 
            type="rangeBar" 
            // style={{ 
            //     height: 'auto',
            //     width: 'auto',
            // }}
            style={ containerStyle }
            height={350} 
            // width={1250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Apexchart2;