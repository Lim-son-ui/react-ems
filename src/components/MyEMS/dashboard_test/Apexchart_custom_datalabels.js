import React from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';


const ApexChart_custom_dtbl = () => {
    const series = [{
        data: [1.10, 2.32, 2.59, 3.01, 3.19, 3.95, 4.89, 5.19, 7.34]
      }];
    
      const options = {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
            // colors: ['rgba(224, 172, 106, 0.75)']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        //   colors: ['rgba(224, 172, 106, 0.75)']
        },
        xaxis: {
        //   categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        //     'United States', 'China', 'India'
        //   ],
        categories: ['核能發電', '慣常水力', '風力發電', '燃煤', '燃汽', '太陽光電', '地熱',
            '抽蓄發電', '燃油' ],
        
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
        //   text: 'Custom DataLabels',
          text: '113年2月發電成本',
          align: 'center',
          floating: true,
          colors: ['rgba(224, 172, 106, 0.75)'],
        },
        subtitle: {
          text: '單位: 元/度',
          align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      };
    
      return (
        <div>
          <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={380} />
          </div>
          <div id="html-dist"></div>
        </div>
      );
}

export default ApexChart_custom_dtbl;