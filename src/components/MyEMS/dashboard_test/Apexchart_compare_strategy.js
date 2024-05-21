import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Apexchart_compar_strategy = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: '再生能源',
      data: [243.3, 216.3, 157.8, 137.8, 140.5, 114.1, 112.5]
    }, {
      name: '抽蓄能源',
      data: [30.4, 30.5, 31.7, 31.5, 32.0, 33.6, 33.2]
    }, {
      name: '汽電能源',
      data: [59.4, 34.4, 51.3, 41, 41.5, 46.5, 41.4]
    }, {
      name: '燃油能源',
      data: [39.6, 35.1, 39.5, 30.6, 44.3, 65.9, 111.7]
    }, {
      name: '燃氫能源',
      data: [1083.3, 1083.3, 1057.5, 974.4, 887.6, 901.1, 891.2]
    }, {
      name: '燃煤能源',
      data: [836.1, 836.1, 882.1, 870.5, 867.5, 905.2, 833.1]
    }, {
      name: '核能',
      data: [171.5, 171.5, 268.2, 303.4, 311.5, 266.6, 215.6]
    }, 
  
  ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        dropShadow: {
          enabled: true,
          blur: 1,
          opacity: 0.25
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
      },
      title: {
        // text: 'Compare Sales Strategy'
        text: '歷年發購電量結構'
      },
      xaxis: {
        // categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        categories: [2023, 2022, 2021, 2020, 2019, 2018, 2017],
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            // return val + "K"
            return val + "億度"
          }
        }
      },
      fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
          style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

        }
      },
      states: {
        hover: {
          filter: 'none'
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Apexchart_compar_strategy;
