import React, { Fragment, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import CountUp from 'react-countup';
import {
  Col,
  Row,
  Spinner, } from 'reactstrap';
import CardSummary from '../common/CardSummary';

import LineChart from '../common/LineChart';
import LineChartnew from '../common/LineChartnew';

import { toast } from 'react-toastify';

import SharePie from '../common/SharePie';
import SharePienew from '../common/SharePienew';
import SharePienew_dought1 from '../common/SharePienew_dought1';
import SharePienew_dought2 from '../common/SharePienew_dought2';
import SharePienew_doughnut from '../common/SharePienew_doughnut';


import loadable from '@loadable/component';
import { getCookieValue, createCookie, checkEmpty } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { APIBaseURL, settings } from '../../../config';
import {v4 as uuid} from 'uuid';
import annotationPlugin from 'chartjs-plugin-annotation';
import {  Chart as ChartJS } from 'chart.js';

import BarChart from '../common/BarChart';
import BarChartnew from '../common/BarChartnew';

import ChartSpacesStackBar from '../common/ChartSpacesStackBar';
import ChartSpacesStackBarnew from '../common/ChartSpacesStackBarnew';

import RealtimeSensor from '../common/RealtimeSensor';
import { getItemFromStore } from '../../../helpers/utils';
import CustomizeMapBox from '../common/CustomizeMapBox';
import Modalex from '../dashboard/Modalex';


import EchartsDemo from '../Space/EchartsDemo';
import MultipleLineChartnew from '../common/MultipleLineChartnew';
import ReactEchartsCore from 'echarts-for-react';
import './Dashboardnew.css'

// 就是table的嘗試
import BarChartExample from '../common/BarChartExample';
import Tabler_react from './Tabler_react';
import Materialtable from './Materialtable';
import Materialreacttable from './Materialreacttable';



import HorizontalBarChart from './HorizontalBarChart';
import ApexCharts from './Apexchart';
import Apexchart from './Apexchart';
import Apexchart2 from './Apexchart2';
import Echarts from 'echarts/lib/echarts';


import Apexchart_compar_strategy from './Apexchart_compare_strategy';
import ApexChart_custom_dtbl from './Apexchart_custom_datalabels';
//----------------------------------------------------------
// 0409
import StackedareaChart from './StackareaChart';

import { Button, Alert } from 'reactstrap'
import axios from 'axios';

//----------------------------------------------------------
// 想做儀表板
import Gauge_chart from './Gauge_chart';
import Gauge_chart2 from './Gauge_chart2';
import Gauge_chart_volt from './Gauge_chart_volt';
import Gauge_chart_current from './Gauge_chart_current';
import Gauge_chart2_volt from './Gauge_chart2_volt';
import Gauge_chart2_current from './Gauge_chart2_current';
import Gauge_chart2_power from './Gauge_chart2_power';

import ToggleButton from '../../navbar/ToggleButton';
import NavbarVertical from '../../navbar/NavbarVertical'
import TopNavRightSideNavItem from '../../navbar/TopNavRightSideNavItem'
import NavbarStandard from '../../navbar/NavbarStandard'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody
} from '@coreui/react'


import AccordionUsage from './AccordionUsage';
// import Gauge_chart3 from './Gauge_chart3';
// import Scichart_wave from './Scichart_wave';
// import { drawExample } from './drawExample'; 
// import call_drawExample from './call_drawExample'
// import initScichart from './InitSchchart';

// import SciChart from './Scichart'
// import Scichart from './Scichart'

//---------------------------------------------------------------
// import { SciChartReact } from "scichart-react";

// import {
//   SweepAnimation,
//   SciChartJsNavyTheme,
//   NumberRange,
//   EAxisType,
//   EChart2DModifierType,
//   ESeriesType,
//   EPointMarkerType,
// } from "scichart";

import Three_cabinet from './three_cabinet';
import Three_background from './three_background';
// import Three_reflector from './three_reflector';
import Three_car from './three_car';
import New_cabinet from '../../cabinet/New_cabinet';
import Googlemap2 from '../../map/Googlemap2';
import GoogleMap from '../../map/GoogleMap';
import Slider from 'react-slick'


ChartJS.register(annotationPlugin);

const ChildSpacesTable = loadable(() => import('../common/ChildSpacesTable'));

const Dashboardnew = ({ setRedirect, setRedirectUrl, t }) => {
  let current_moment = moment();
  const [isFetchDashboard, setIsFetchDashboard] = useState(true);
  const [periodType, setPeriodType] = useState('monthly');
  const [basePeriodBeginsDatetime, setBasePeriodBeginsDatetime] = useState(current_moment.clone().subtract(1, 'years').startOf('year'));
  const [basePeriodEndsDatetime, setBasePeriodEndsDatetime] = useState(current_moment.clone().subtract(1, 'years'));
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(current_moment.clone().startOf('year'));
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(current_moment);

  const [spinnerHidden, setSpinnerHidden] = useState(false);

  //Results
  const [costShareData, setCostShareData] = useState([]);
  const [timeOfUseShareData, setTimeOfUseShareData] = useState([
    {
      "name":"MPPT告警",
      "value": 12,
      "percent": 27.45
    },
    {
      "name":"ACDC告警",
      "value": 4,
      "percent": 49.02
    },
    {
      "name":"DCDC告警",
      "value": 1,
      "percent": 23.53
    }
  ]);
  const [timeOfUseShareData_bms, setTimeOfUseShareData_bms] = useState([
    {
      "name":"DRY_IN3",
      "value": 31,
      "percent": 0
    },
    {
      "name":"DSG_RLY",
      "value": 31,
      "percent": 0
    },
    {
      "name":"CHG_RLY",
      "value": 31,
      "percent": 0
    },
    {
      "name":"COV_W",
      "value": 5,
      "percent": 0
    }
  ]);
  const [timeOfUse_2022data, setTimeOfUse_2022data] = useState([
    {
      "name":"PCS功率",
      "value": 67,
      "percent": 0
    },
    {
      "name":"用戶負載",
      "value": 9,
      "percent": 0
    },
    // {
    //   "name":"汽電",
    //   "value": 34.4,
    //   "percent": 0
    // },
    // {
    //   "name":"燃油",
    //   "value": 35.1,
    //   "percent": 0
    // },
    // {
    //   "name":"燃氫",
    //   "value": 1083.3,
    //   "percent": 0
    // },
    // {
    //   "name":"燃煤",
    //   "value": 836.1,
    //   "percent": 0
    // },
    // {
    //   "name":"核能",
    //   "value": 171.5,
    //   "percent": 0
    // }
  ]);
  const [timeOfUse_2021data, setTimeOfUse_2021data] = useState([
    {
      "name":"PCS功率",
      "value": 67,
      "percent": 0
    },
    {
      "name":"用戶負載",
      "value": 17,
      "percent": 0
    },
    // {
    //   "name":"汽電",
    //   "value": 51.3,
    //   "percent": 0
    // },
    // {
    //   "name":"燃油",
    //   "value": 39.5,
    //   "percent": 0
    // },
    // {
    //   "name":"燃氫",
    //   "value": 1057.5,
    //   "percent": 0
    // },
    // {
    //   "name":"燃煤",
    //   "value": 882.1,
    //   "percent": 0
    // },
    // {
    //   "name":"核能",
    //   "value": 268.2,
    //   "percent": 0
    // }
  ]);
  const [timeOfUse_2020data, setTimeOfUse_2020data] = useState([
    {
      // "name":"再生",
      // "value": 137.8,
      "name":"PCS功率",
      "value": 69,
      "percent": 0
    },
    {
      // "name":"抽蓄",
      // "value": 31.5,
      "name":"用戶負載",
      "value": 28,
      "percent": 0
    },
    // {
    //   // "name":"汽電",
    //   // "value": 41,
    //   "name":"0203",
    //   "value": 1308.060,
    //   "percent": 0
    // },
    // {
    //   // "name":"燃油",
    //   // "value": 30.6,
    //   "name":"0204",
    //   "value": 1306.981,
    //   "percent": 0
    // },
    // {
    //   // "name":"燃氫",
    //   // "value": 974.4,
    //   "name":"0205",
    //   "value": 1535.378,
    //   "percent": 0
    // },
    // {
    //   // "name":"燃煤",
    //   // "value": 870.5,
    //   "name":"0206",
    //   "value": 1733.684,
    //   "percent": 0
    // },
    // {
    //   // "name":"核能",
    //   // "value": 303.4,
    //   "name":"0207",
    //   "value": 1404.977,
    //   "percent": 0
    // }
  ]);
  const [timeOfUseShareData_all_energy, setTimeOfUseShareData_all_energy] = useState([
    {
      "name":"PCS功率",
      "value": 70,
      "percent": 0
    },
    {
      "name":"用戶負載",
      "value": 6,
      "percent": 0
    },
    // {
    //   "name":"汽電",
    //   "value": 6.7,
    //   "percent": 0
    // },
    // {
    //   "name":"燃油",
    //   "value": 5.5,
    //   "percent": 0
    // },
    // {
    //   "name":"燃氫",
    //   "value": 19.7,
    //   "percent": 0
    // },
    // {
    //   "name":"燃煤",
    //   "value": 43.6,
    //   "percent": 0
    // },
    // {
    //   "name":"核能",
    //   "value": 20.2,
    //   "percent": 0
    // }
  ]);
  // const [timeOfUseShareData, setTimeOfUseShareData] = useState([
  //   {
  //     "first": 14,
  //   },
  //   {
  //     "first": 25
  //   },
  //   {
  //     "first": 19
  //   }
  // ]);

  
  const [TCEShareData, setTCEShareData] = useState([]);
  const [TCO2EShareData, setTCO2EShareData] = useState([]);

  const [thisYearBarList, setThisYearBarList] = useState([]);
  const [lastYearBarList, setLastYearBarList] = useState([]);
  const [thisMonthInputCardSummaryList, setThisMonthInputCardSummaryList] = useState([]);
  const [thisMonthCostCardSummaryList, setThisMonthCostCardSummaryList] = useState([]);
  const [barLabels, setBarLabels] = useState([]);
  const [totalInTCE, setTotalInTCE] = useState({
                                          'increment_rate':"第1 rack",
                                          'value_per_unit_area':"231.5",
                                          'value':"400.958"
                                        });
  const [totalInTCO2E, setTotalInTCO2E] = useState({
    'increment_rate':"第2 rack",
    'value_per_unit_area':"8.9",
    'value':"15.414"
  });
  const [totalInTCO3E, setTotalInTCO3E] = useState({
    'increment_rate':"第3 rack",
    'value_per_unit_area':"2",
    'value':"3.464"
  });

  const [spaceInputLineChartLabels, setSpaceInputLineChartLabels] = useState([]);
  
  const [spaceInputLineChartData, setSpaceInputLineChartData] = useState({});
  // const [spaceInputLineChartData, setSpaceInputLineChartData] = useState({
  //   dataPoint1: 24,
  //   dataPoint2: 31,
  //   dataPoint3: 41
  // });


  const [spaceInputLineChartOptions, setSpaceInputLineChartOptions] = useState([]);
  const [spaceCostLineChartOptions, setSpaceCostLineChartOptions] = useState([]);
  const [spaceCostLineChartLabels, setSpaceCostLineChartLabels] = useState([]);
  const [spaceCostLineChartData, setSpaceCostLineChartData] = useState({});

  const [detailedDataTableData, setDetailedDataTableData] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState(
    [{dataField: 'startdatetime', text: t('Datetime'), sort: true}]);

  const [childSpacesTableData, setChildSpacesTableData] = useState([]);
  const [childSpacesTableColumns, setChildSpacesTableColumns] = useState(
    [{dataField: 'name', text: t('Child Spaces'), sort: true }]);

  const [childSpacesInputData, setChildSpacesInputData] = useState([]);
  const [childSpacesCostData, setChildSpacesCostData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [language, setLanguage] = useState(getItemFromStore('myems_web_ui_language', settings.language));
  const [geojson, setGeojson] = useState({});
  const [rootLatitude, setRootLatitude] = useState('');
  const [rootLongitude, setRootLongitude] = useState('');

  const [sensor, setSensor] = useState({});
  const [pointList, setPointList] = useState({});

  const barLabels1 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  // const barLabels1 = ['00:00:59', '00:04:00', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const barLabels1_bms = ['07:00時', '08:00時', '09:00時', '10:00時', '11:00時', '12:00時', '13:00時', '14:00時', '15:00時', '16:00時', '17:00時', '18:00時'];
  // const lastYearBarList1 = [3.341, 3.336, 3.321];
  // const lastYearBarList1 = [3.341, 3.336, 3.321];
  // const lastYearBarList1 = [31, 29, 11];
  const lastYearBarList1 = [28.23, 24.55, 27.58, 40.65, 30.45, 38.11, 43.91, 41.84, 38.11, 32.34, 28.46, 28.46];
  // const lastYearBarList1_bms = [1000, 1000, 1000, 7310, 7166, 7027, 7227, 1000, 7270, 7124, 6983, 6911];
  const lastYearBarList1_bms = [];
  // const thisYearBarList1 = [];
  // const thisYearBarList1 = [3, 2, 3];
  const thisYearBarList1 = [28.48, 24.01, 33.73, 34.84, 38.07, 38.5, 39.3, 34.72, 34.78, 31.19, 31.72, 24.61];
  // const thisYearBarList1_bms = [1000, 1000, 1000, 7376, 7240, 7133, 7305, 7479, 7352, 7206, 7057, 6988];
  const thisYearBarList1_bms = [];
  // const thisYearBarList1 = [3276, 3284, 3269];


  // const fixedChildSpacesInputData = [
  //   10, 
  //   20,
  //   30,
  //   40,
  //   50
  // ];
  // const fixedChildSpacesCostData = [
  //  5, 
  //  10,
  //  15,
  //  20,
  //  30
  // ];
  const fixedChildSpacesInputData = [
    // {
    //   "交流三相電壓 數值":228.5, 
    // },
    // {
    //   "交流三相電壓 數值":228.4,
    // } ,
    // {
    //   "交流三相電壓 數值":227.2,
    // },
    {
      "105年":93.07,
    },
    {
      "105年":67.77,
    },
    {
      "105年":209.04,
    },
    {
      "106年":138.33,
    },
    {
      "106年":69.03,
    },
    {
      "106年":209.07,
    },
    {
      "107年":234.22,
    },
    {
      "107年":69.96,
    },
    {
      "107年":209.3,
    },
    {
      "108年":355.87,
    },
    {
      "108年":72.08,
    },
    {
      "108年":209.44,
    },
    {
      "109年":556.51,
    },
    {
      "109年":91.58,
    },
    {
      "109年":210.15,
    },
    {
      "110年":720.61,
    },
    {
      "110年":109.21,
    },
    {
      "110年":211.06,
    },
    {
      "111年":924.47,
    },
    {
      "111年":160.01,
    },
    {
      "111年":211.43,
    },
    {
      "112年":1167.24, 
    },
    {
      "112年":266.15,
    } ,
    {
      "112年":212.46,
    }    
  ];
  const fixedChildSpacesCostData = [
    // {
    //   "交流A相 電壓":228.5, 
    // },
    // {
    //   "交流B相 電壓":228.4,
    // } ,
    // {
    //   "交流C相 電壓":227.2,
    // } 
  ];

  const columns = [
    {
        dataField: 'selectedStrategName',
        text: '策略',
        classes: 'py-2 align-middle'
    }, 
    {
        dataField: 'selectedMonthName',
        text: '月',
        classes: 'py-2 align-middle'
    }, 
    {
        dataField: 'selectedStartTimeName',
        text: '開始',
        classes: 'py-2 align-middle'
    },
    {
        dataField: 'selectedEndTimeName',
        text: '結束',
        classes: 'py-2 align-middle'
    },
    {
        dataField: 'selectedPowerName',
        text: '功率',
        classes: 'py-2 align-middle'
    }
  ];

  const toDoList = [
    {
      'selectedStrategName':'充電',
      'selectedMonthName':'2月',
      'selectedStartTimeName':'00:01',
      'selectedEndTimeName':'06:00',
      'selectedPowerName':'-15.0'

    },
    {
      'selectedStrategName':'待機',
      'selectedMonthName':'2月',
      'selectedStartTimeName':'06:01',
      'selectedEndTimeName':'09:00',
      'selectedPowerName':'0.0'
    },
    {
      'selectedStrategName':'放電',
      'selectedMonthName':'2月',
      'selectedStartTimeName':'09:01',
      'selectedEndTimeName':'12:00',
      'selectedPowerName':'15.0'
    }
  ];


  const aa = [];

  const bb = {
    a0: [1, 20, 30],
    a1: [2, 25, 35],
    a2: [3, 145, 88, 210, 179]
    // ...其他索引
  };

  const cc = [
    { value: 'a0', label: 'Label1' },
    { value: 'a1', label: 'Label2' },
    { value: 'a2', label: 'Label3' }
  ];

  const [chartdata, setchartdata] = useState({
    label: [],
    content: []
  });

  
  useEffect(() => {
    setLanguage(getItemFromStore('myems_web_ui_language'));
  }, [getItemFromStore('myems_web_ui_language')]);


  // useEffect(() => {
  //   axios.get("http://localhost:3088/getexcelfile").then((response) => {
  //       const label = response.data.map(item => item.time);
  //       const content = response.data.map(item => Math.abs(parseInt(item.pv_power)))

  //       console.log("this is label");
  //       console.log(label);

  //       console.log("this is content");
  //       console.log(content);
        
  //       setchartdata(prevstate => ({
  //         ...prevstate,
  //         label,
  //         content
  //       }));
  //   });
  // })

  // useEffect(() => {
  //   initScichart();
  // }, []);

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

  const show_data = () => {
    console.log("this is chartdata")
    console.log(chartdata)
  }

  const [activeKey, setActiveKey] = useState(0)
    // 用於accordin按鈕切換 選擇顯示 的欄位按鈕
    const toggleTab = (index) => {
    console.log(index)
    setActiveKey(index)
    }

  const settingss = {
      dots:true,
      // speed:500,
      speed:250,
      slidesToShow:1,
      slidesToScroll:1,
  };


    //------------------------------------------------------------------------------------

    // const chartConfig = {
    //   surface: {
    //     theme: new SciChartJsNavyTheme(),
    //     title: "SciChart.js First Chart",
    //     titleStyle: { fontSize: 22 },
    //   },
    //   // Create an XAxis and YAxis with growBy padding
    //   xAxes: [
    //     {
    //       type: EAxisType.NumericAxis,
    //       options: {
    //         axisTitle: "X Axis",
    //         growBy: new NumberRange(0.1, 0.1),
    //       },
    //     },
    //   ],
    //   yAxes: [
    //     {
    //       type: EAxisType.NumericAxis,
    //       options: {
    //         axisTitle: "Y Axis",
    //         growBy: new NumberRange(0.1, 0.1),
    //       },
    //     },
    //   ],
    //   // Create a line series with some initial data
    //   series: [
    //     {
    //       type: ESeriesType.LineSeries,
    //       xyData: {
    //         xValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    //         yValues: [
    //           0, 0.0998, 0.1986, 0.2955, 0.3894, 0.4794, 0.5646, 0.6442, 0.7173,
    //           0.7833,
    //         ],
    //       },
    //       options: {
    //         stroke: "steelblue",
    //         strokeThickness: 3,
    //         pointMarker: {
    //           type: EPointMarkerType.Ellipse,
    //           options: {
    //             width: 11,
    //             height: 11,
    //             fill: "#fff",
    //           },
    //         },
    //         animation: new SweepAnimation({
    //           duration: 300,
    //           fadeEffect: true,
    //         }),
    //       },
    //     },
    //   ],
    //   // Add some interaction modifiers to show zooming and panning
    //   modifiers: [
    //     { type: EChart2DModifierType.MouseWheelZoom },
    //     {
    //       type: EChart2DModifierType.ZoomPan,
    //       options: { enableZoom: true },
    //     },
    //     { type: EChart2DModifierType.ZoomExtents },
    //   ],
    // };

  return (
    <Fragment>
      {/* <div id="scichart-root" style={{ width: 800, height: 600 }}></div> */}
    {/* <Scichart_wave/> */}
    
    {/* <call_drawExample/> */}
    {/* <drawExample/> */}
    
    {/* <div className="card-deck">
      <initScichart/>
    </div> */}
    {/* <Scichart/> */}
    {/* <SciChartReact config={chartConfig} style={{ maxWidth: 900 }} /> */}
    {/* <Three_reflector/> */}
    
    <AccordionUsage/>

    {/* <CCard className="mb-4">
      <CCardHeader>
      
      </CCardHeader>
      <CCardBody>
    
        <CAccordion activeItemKey={1}>
          
          <CAccordionItem itemKey={2}>
            <CAccordionHeader style={{ backgroundColor: 'blue'}}>Accordion Item #2</CAccordionHeader>
            <CAccordionBody style={{ backgroundColor: 'red'}}>
              <Gauge_chart2_volt />
            
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={3}>
            <CAccordionHeader style={{ backgroundColor: 'green'}}>Accordion Item #3</CAccordionHeader>
            <CAccordionBody>
              <Gauge_chart2_current />
          
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      
      </CCardBody>
    </CCard> */}
      {/* <MultipleLineChartnew reportingTitle={t('折線圖1')}
        baseTitle=''
        labels={aa}
        data={bb}
        options={cc}>
      </MultipleLineChartnew> */}

      <CNav variant="tabs">
          <CNavItem>
              <CNavLink onClick={() => toggleTab(1)}>電壓 Volt (V)</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(2)}>電流 Current (A)</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(3)}>功率 Power (kw)</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(4)}>機櫃</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(5)}>背景</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(6)}>亮版機房</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(7)}>溫度機房</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(8)}>地圖</CNavLink>
          </CNavItem>
          <CNavItem>
              <CNavLink onClick={() => toggleTab(0)}>全部收合</CNavLink>
          </CNavItem>
      </CNav> 

      <Row noGutters>
        
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 1 ? 'flow' : 'none' }}>
          {/* <Gauge_chart2/> */}
          <Gauge_chart2_volt />
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 2 ? 'flow' : 'none' }}>
          {/* <Gauge_chart2/> */}
          <Gauge_chart2_current />
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 3 ? 'flow' : 'none' }}>
          {/* <Gauge_chart2/> */}
          <Gauge_chart2_power />
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 4 ? 'flow' : 'none' }}>
          <Three_cabinet/>
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 5 ? 'flow' : 'none' }}>
          <Three_background/>
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 6 ? 'flow' : 'none' }}>
          <Three_car/>
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 7 ? 'flow' : 'none' }}>
          <New_cabinet/>
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5" style={{ display: activeKey === 8 ? 'flow' : 'none' }}>
          <Googlemap2/>
          {/* <GoogleMap/> */}
        </Col>
      </Row>

      {/* <ToggleButton/> */}
      
        {/* 看起來也是在右上角的功能 */}
      {/* <NavbarStandard/> */}
        {/* 這個就是我右側的那一個功能欄位 */}
      {/* <TopNavRightSideNavItem/> */}
      {/* 感覺是垂直 沒有到收闔  的購買按鈕側邊欄位 */}
      {/* <NavbarVertical/> */}
      {/* <Row noGutters>
        <Col className="mb-5 pr-lg-2 mb-5"> */}
          {/* <Gauge_chart/>    */}
            {/* <Gauge_chart_volt/>   
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5"> */}
          {/* <Gauge_chart/> */}
            {/* <Gauge_chart_current/>   
        </Col>
      </Row> */}

      {/* <Gauge_chart3/> */}
      
      <Row noGutters>
        {/* <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={timeOfUseShareData} title={('圓餅統計圖')} />
        </Col> */}
        <Slider {...settingss} style={{width: '100%'}}>
          <Col className="mb-5 pr-lg-2 mb-5">
            {/* <SharePienew data={timeOfUseShareData} title={('PCS告警統計圖')} /> */}
            {/* <SharePienew data={timeOfUse_2020data} title={('2020年發電購電量結構')} /> */}
            <SharePienew data={timeOfUse_2020data} title={('0201 電表功率 組成占比')} />
          </Col>
          <Col className="mb-5 pr-lg-2 mb-5">
            {/* <SharePienew data={timeOfUseShareData_bms} title={('BMS告警統計圖')} /> */}
            <SharePienew_dought1 data={timeOfUse_2021data} title={('0202 電表功率 組成占比')} />
          </Col>
          <Col className="mb-5 pr-lg-2 mb-5">
            {/* <SharePienew_doughnut data={timeOfUseShareData} title={('PCS告警統計圖')} /> */}
            <SharePienew_dought2 data={timeOfUse_2022data} title={('0203 電表功率 組成占比')} />
          </Col>
          <Col className="mb-5 pr-lg-2 mb-5">
            <SharePienew_doughnut data={timeOfUseShareData_all_energy} title={('0204 電表功率 組成占比')} />
          </Col>
        </Slider>
        
        {/* <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={costShareData} title={t('Costs by Energy Category')} />
        </Col>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={TCEShareData} title={t('Ton of Standard Coal by Energy Category')} />
        </Col>
        <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={TCO2EShareData} title={t('Ton of Carbon Dioxide Emissions by Energy Category')} />
        </Col> */}
      </Row>
      
      

      {/* <div className="card-deck">
         <CardSummary
            rate={totalInTCE['increment_rate'] || ''}
            // title={t("This Year's Consumption CATEGORY VALUE UNIT", { 'CATEGORY': t('Ton of Standard Coal'), 'UNIT': '(TCE)' })}
            title={("電壓")}
            color="warning"
            footnote={('單位電壓值')}
            // footvalue={totalInTCE['value_per_unit_area']}
            footunit="(V)">
            {totalInTCE['value'] && <CountUp end={totalInTCE['value']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary>
          <CardSummary
            rate={totalInTCO2E['increment_rate'] || ''}
            title={("電流")}
            color="warning"
            footnote={('單位電流值')}
            // footvalue={totalInTCO2E['value_per_unit_area']}
            footunit="(A)">
            {totalInTCO2E['value'] && <CountUp end={totalInTCO2E['value']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary>
          <CardSummary
            rate={totalInTCO3E['increment_rate'] || ''}
            title={("功率")}
            color="warning"
            footnote={('單位功率值')}
            // footvalue={totalInTCO3E['value_per_unit_area']}
            footunit="(kw)">
            {totalInTCO3E['value'] && <CountUp end={totalInTCO3E['value']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary>
      </div> */}
      {/* <ApexChart_custom_dtbl/> */}
      <Button onClick={get_milisecond} style={{backgroundColor: 'transparent', color: 'transparent', borderBlockColor: 'transparent', borderColor: 'transparent'}}>{('取得資料')}</Button>
      {/* <Button color="success" onClick={show_data} >{('確認資料')}</Button> */}
      <Row>
        <Col>
          {/* <ApexChart_custom_dtbl/> */}
          <BarChartnew
            labels={chartdata.label}
            data={thisYearBarList1_bms}
            compareData={chartdata.content}
            // compareData={lastYearBarList1_bms}
            // title={('MPPT告警')}
            // compareTitle={('ACDC告警')}
            title={('0201電池電量')}
            compareTitle={('0202電池電量')}            
            // footnote={('發生:')}
            // footunit={"次"} 
            footnote={('發電量:')}
            footunit={"百萬度"} 
            >
          </BarChartnew>
        </Col>
        <Col>
          {/* <StackedareaChart/> */}
          <BarChartnew
            labels={barLabels1}
            data={lastYearBarList1}
            compareData={thisYearBarList1}
            // title={('MPPT告警')}
            // compareTitle={('ACDC告警')}
            title={('112年 太陽光電發電量')}
            compareTitle={('111年 太陽光電發電量')}            
            // footnote={('發生:')}
            // footunit={"次"} 
            footnote={('發電量:')}
            footunit={"百萬度"} 
            >
          </BarChartnew>
        </Col>
      </Row>
      {/* <EchartsDemo/> */}
      {/* <Row>
        <Col>
          <Apexchart_compar_strategy/>
        </Col>
        <Col> */}
          {/* <EchartsDemo/> */}
        {/* </Col>
      </Row> */}

      {/* <Row noGutters>      
        <Col> */}
        {/* <Col className="mb-5 pr-lg-2 mb-5"> */}
          {/* <Apexchart2/>
        </Col> */}
        {/* <Col className="mb-5 pr-lg-2 mb-5">
          <Apexchart/>
        </Col> */}
        {/* <Col className="mb-5 pr-lg-2 mb-5">
          <Tabler_react/>
        </Col>
      </Row> */}
      {/* <Row>       */}
      {/* <Row noGutters>      
        <Col className="mb-5 pr-lg-2 mb-5">
          <Apexchart/>
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5">
          <Tabler_react/>
        </Col>
      </Row> */}


      

      {/* 第五種table 較為完整*/}
      {/* <Materialreacttable/> */}
      {/* <Modalex/> */}
      {/* <div className="card-deck"> */}
        {/* <HorizontalBarChart/> */}
        {/* 第三種table */}
        {/* <Tabler_react/> */}
        {/* 第二種table */}
        {/* <BarChartExample/> */}
        {/* 第四種table */}
        {/* <Materialtable/>
               
        
        
      </div>
      <Apexchart2/>
      <EchartsDemo/> */}
      
        {/* <EchartsDemo/> */}
        {/* <Spinner color="primary" hidden={spinnerHidden}  />
        <Spinner color="secondary" hidden={spinnerHidden}  />
        <Spinner color="success" hidden={spinnerHidden}  />
        <Spinner color="danger" hidden={spinnerHidden}  />
        <Spinner color="warning" hidden={spinnerHidden}  />
        <Spinner color="info" hidden={spinnerHidden}  />
        <Spinner color="light" hidden={spinnerHidden}  />
        {thisMonthInputCardSummaryList.map(cardSummaryItem => (
          <CardSummary key={uuid()}
            rate={cardSummaryItem['increment_rate']}
            title={t("This Month's Consumption CATEGORY VALUE UNIT", { 'CATEGORY': cardSummaryItem['name'], 'VALUE': null, 'UNIT': '(' + cardSummaryItem['unit'] + ')' })}
            color="success"
            footnote={t('Per Unit Area')}
            footvalue={cardSummaryItem['subtotal_per_unit_area']}
            footunit={"(" + cardSummaryItem['unit'] + "/M²)"} >
            {cardSummaryItem['subtotal'] && <CountUp end={cardSummaryItem['subtotal']} duration={2} prefix="" separator="," decimal="." decimals={0} />}
          </CardSummary>
        ))}
        {thisMonthCostCardSummaryList.map(cardSummaryItem => (
          <CardSummary key={uuid()}
            rate={cardSummaryItem['increment_rate']}
            title={t("This Month's Costs CATEGORY VALUE UNIT", { 'CATEGORY': cardSummaryItem['name'], 'VALUE': null, 'UNIT': '(' + cardSummaryItem['unit'] + ')' })}
            color="success"
            footnote={t('Per Unit Area')}
            footvalue={cardSummaryItem['subtotal_per_unit_area']}
            footunit={"(" + cardSummaryItem['unit'] + "/M²)"} >
            {cardSummaryItem['subtotal'] && <CountUp end={cardSummaryItem['subtotal']} duration={2} prefix="" separator="," decimal="." decimals={0} />}
          </CardSummary>
        ))} */}
      
      {/* <EchartsDemo/>    */}
      
      <div className='card-deck'>
          {/* <BarChart
            labels={barLabels}
            data={lastYearBarList}
            compareData={thisYearBarList}
            title={t('The Same Period Last Year')}
            compareTitle={t('This Year')}
            footnote={t('Per Unit Area')}
            footunit={"/M²"} >
          </BarChart> */}
          
          {/* <BarChartnew
            labels={barLabels}
            data={lastYearBarList}
            compareData={thisYearBarList}
            title={('MPPT告警')}
            compareTitle={('ACDC告警')}
            footnote={('每單位 充電加總')}
            footunit={"voltage"} >
          </BarChartnew> */}

          {/* 本年消耗 */}
          {/* t("This Year's Consumption CATEGORY VALUE UNIT", { 'CATEGORY': null, 'VALUE': null, 'UNIT': null }) */}
          {/* <LineChart reportingTitle={("斜率圖")}
            baseTitle=''
            labels={spaceInputLineChartLabels}
            data={spaceInputLineChartData}
            options={spaceInputLineChartOptions}>
          </LineChart> */}
          {/* 帶出一天的頻率 */}

          {/* <StackedareaChart/> */}
          
          {/* <LineChartnew reportingTitle={("頻率圖")}
            baseTitle=''
            labels={spaceInputLineChartLabels}
            data={spaceInputLineChartData}
            options={spaceInputLineChartOptions}>
          </LineChartnew> */}
          {/* <LineChartnew reportingTitle={("頻率圖")}
            baseTitle=''
            labels={chartdata.label}
            data={chartdata.content}
            options={spaceInputLineChartOptions}>
          </LineChartnew> */}

          {/* 本年成本 */}
          {/* <LineChart reportingTitle={t("This Year's Costs CATEGORY VALUE UNIT", { 'CATEGORY': null, 'VALUE': null, 'UNIT': null })}
            baseTitle=''
            labels={spaceCostLineChartLabels}
            data={spaceCostLineChartData}
            options={spaceCostLineChartOptions}>
          </LineChart> */}
      </div>
      <div className='wrapper'>

      </div>
      <div className='card-deck'>

      {/* { settings.showOnlineMap ?
        <div className='mb-3 card' style={{ height: '400px' }}>
        <CustomizeMapBox Latitude={rootLatitude} Longitude={rootLongitude} Zoom={15} Geojson={geojson['features']}>
        </CustomizeMapBox>
        </div>
      :
        <></>
      } */}
      {/* {Object.keys(sensor).map((item) => (
            <RealtimeSensor key={uuid()}
              sensor={sensor[item]}
              pointList={pointList}>
            </RealtimeSensor>
          ))} */}
      </div>

      {/* <BootstrapTable 
          keyField='id' 
          data={ toDoList } 
          columns={ columns } 
          // classes='mb-3 table-bordered react-bootstrap-table'
          // classes='mb-3'
          classes="table-dashboard table-striped table-sm fs--1  mb-0 table-dashboard-th-nowrap"
          // classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap custom-margin"
          rowClasses="btn-reveal-trigger"
          headerClasses="bg-200 text-900"
      /> */}
      <StackedareaChart/>
      
      {/* <ChartSpacesStackBar
        title={t('Child Spaces Data')}
        labels={monthLabels}
        inputData={childSpacesInputData}
        costData={childSpacesCostData}
        childSpaces={spaceInputLineChartOptions}
      >
      </ChartSpacesStackBar> */}

      {/* <ChartSpacesStackBar
        title={t('Child Spaces Data')}
        labels={monthLabels}
        inputData={fixedChildSpacesInputData}
        costData={fixedChildSpacesCostData}
        childSpaces={spaceInputLineChartOptions}
      >
      </ChartSpacesStackBar> */}
      <Modalex/>
      <ChartSpacesStackBarnew
        // title={('AC側')}
        title={('歷年再生能源裝置容量')}
        labels={monthLabels}
        inputData={fixedChildSpacesInputData}
        costData={fixedChildSpacesCostData}
        childSpaces={spaceInputLineChartOptions}
      >
      </ChartSpacesStackBarnew>

      {/* <EchartsDemo/> */}

    </Fragment>
  );
};

export default withTranslation()(withRedirect(Dashboardnew));
