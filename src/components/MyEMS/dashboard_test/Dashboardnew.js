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
import ReactEchartsCore from 'echarts-for-react';
import './Dashboardnew.css'


import BarChartExample from '../common/BarChartExample';
import Tabler_react from './Tabler_react';
import HorizontalBarChart from './HorizontalBarChart';

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
  const [totalInTCE, setTotalInTCE] = useState({});
  const [totalInTCO2E, setTotalInTCO2E] = useState({});

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

  const barLabels1 = ['1月', '2月', '3月'];
  // const lastYearBarList1 = [3.341, 3.336, 3.321];
  // const lastYearBarList1 = [3.341, 3.336, 3.321];
  const lastYearBarList1 = [31, 29, 11];
  // const thisYearBarList1 = [];
  const thisYearBarList1 = [1, 2, 1];
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
    {
      "交流三相電壓 數值":228.5, 
    },
    {
      "交流三相電壓 數值":228.4,
    } ,
    {
      "交流三相電壓 數值":227.2,
    }
  ];
  const fixedChildSpacesCostData = [
    {
      "交流A相 電壓":228.5, 
    },
    {
      "交流B相 電壓":228.4,
    } ,
    {
      "交流C相 電壓":227.2,
    } 
  ];

  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (checkEmpty(is_logged_in) || checkEmpty(token)|| checkEmpty(user_uuid) || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, settings.cookieExpireTime);
      createCookie('user_name', user_name, settings.cookieExpireTime);
      createCookie('user_display_name', user_display_name, settings.cookieExpireTime);
      createCookie('user_uuid', user_uuid, settings.cookieExpireTime);
      createCookie('token', token, settings.cookieExpireTime);

      let isResponseOK = false;
      if (isFetchDashboard) {
        setIsFetchDashboard(false);
        // toast(
        //   <Fragment>
        //     {t("Welcome to MyEMS")}<br />
        //     {t("An Industry Leading Open Source Energy Management System")}
        //   </Fragment>
        // );

        fetch(
          APIBaseURL +
            '/reports/dashboard?' +
            'useruuid=' +
            user_uuid +
            '&periodtype=' +
            periodType +
            '&baseperiodstartdatetime=' +
            (basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
            '&baseperiodenddatetime=' +
            (basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
            '&reportingperiodstartdatetime=' +
            reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') +
            '&reportingperiodenddatetime=' +
            reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'), {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'User-UUID': getCookieValue('user_uuid'),
            Token: getCookieValue('token')
          },
          body: null,

        }).then(response => {
          if (response.ok) {
            isResponseOK = true;
          }
          return response.json();
        }).then(json => {
          if (isResponseOK) {
            console.log(json);
            // hide spinner
            setSpinnerHidden(true);
            let labels = []
            let thisYearBarList = []
            let lastYearBarList = []
            json['reporting_period_input']['names'].forEach((currentValue, index) => {
              let cardSummaryItem = {}
              cardSummaryItem['name'] = json['reporting_period_input']['names'][index];
              cardSummaryItem['unit'] = json['reporting_period_input']['units'][index];
              cardSummaryItem['subtotal'] = json['reporting_period_input']['subtotals'][index];
              cardSummaryItem['increment_rate'] = parseFloat(json['reporting_period_input']['increment_rates'][index] * 100).toFixed(2) + "%";
              cardSummaryItem['subtotal_per_unit_area'] = json['reporting_period_input']['subtotals_per_unit_area'][index];
              labels.push(t('CATEGORY Consumption UNIT', {'CATEGORY': null, 'UNIT': null}) + cardSummaryItem['name'] + cardSummaryItem['unit']);
              thisYearBarList.push(cardSummaryItem);
            });

            json['reporting_period_cost']['names'].forEach((currentValue, index) => {
              let cardSummaryItem = {}
              cardSummaryItem['name'] = json['reporting_period_cost']['names'][index];
              cardSummaryItem['unit'] = json['reporting_period_cost']['units'][index];
              cardSummaryItem['subtotal'] = json['reporting_period_cost']['subtotals'][index];
              cardSummaryItem['increment_rate'] = parseFloat(json['reporting_period_cost']['increment_rates'][index] * 100).toFixed(2) + "%";
              cardSummaryItem['subtotal_per_unit_area'] = json['reporting_period_cost']['subtotals_per_unit_area'][index];
              labels.push(t('CATEGORY Costs UNIT', {'CATEGORY': null, 'UNIT': null}) + cardSummaryItem['name'] + cardSummaryItem['unit']);
              thisYearBarList.push(cardSummaryItem);
            });
            setBarLabels(labels);
            setThisYearBarList(thisYearBarList);

            json['base_period_input']['names'].forEach((currentValue, index) => {
              let cardSummaryItem = {}
              cardSummaryItem['name'] = json['base_period_input']['names'][index];
              cardSummaryItem['unit'] = json['base_period_input']['units'][index];
              cardSummaryItem['subtotal'] = json['base_period_input']['subtotals'][index];
              cardSummaryItem['increment_rate'] = null;
              cardSummaryItem['subtotal_per_unit_area'] = json['base_period_input']['subtotals_per_unit_area'][index];
              lastYearBarList.push(cardSummaryItem);
            });

            json['base_period_cost']['names'].forEach((currentValue, index) => {
              let cardSummaryItem = {}
              cardSummaryItem['name'] = json['base_period_cost']['names'][index];
              cardSummaryItem['unit'] = json['base_period_cost']['units'][index];
              cardSummaryItem['subtotal'] = json['base_period_cost']['subtotals'][index];
              cardSummaryItem['increment_rate'] = null;
              cardSummaryItem['subtotal_per_unit_area'] = json['base_period_cost']['subtotals_per_unit_area'][index];
              lastYearBarList.push(cardSummaryItem);
            });
            setLastYearBarList(lastYearBarList);

            let timeOfUseArray = [];
            json['reporting_period_input']['energy_category_ids'].forEach((currentValue, index) => {
              if(currentValue === 1) {
                // energy_category_id 1 electricity
                let timeOfUseItem = {}
                timeOfUseItem['id'] = 1;
                timeOfUseItem['name'] =  t('Top-Peak');
                timeOfUseItem['value'] = json['reporting_period_input']['toppeaks'][index];
                timeOfUseItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
                timeOfUseArray.push(timeOfUseItem);

                timeOfUseItem = {}
                timeOfUseItem['id'] = 2;
                timeOfUseItem['name'] =  t('On-Peak');
                timeOfUseItem['value'] = json['reporting_period_input']['onpeaks'][index];
                timeOfUseItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
                timeOfUseArray.push(timeOfUseItem);

                timeOfUseItem = {}
                timeOfUseItem['id'] = 3;
                timeOfUseItem['name'] =  t('Mid-Peak');
                timeOfUseItem['value'] = json['reporting_period_input']['midpeaks'][index];
                timeOfUseItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
                timeOfUseArray.push(timeOfUseItem);

                timeOfUseItem = {}
                timeOfUseItem['id'] = 4;
                timeOfUseItem['name'] =  t('Off-Peak');
                timeOfUseItem['value'] = json['reporting_period_input']['offpeaks'][index];
                timeOfUseItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
                timeOfUseArray.push(timeOfUseItem);
              }
            });
            setTimeOfUseShareData(timeOfUseArray);
            let totalInTCE = {};
            totalInTCE['value'] = json['reporting_period_input']['total_in_kgce'] / 1000; // convert from kg to t
            totalInTCE['increment_rate'] = parseFloat(json['reporting_period_input']['increment_rate_in_kgce'] * 100).toFixed(2) + "%";
            totalInTCE['value_per_unit_area'] = json['reporting_period_input']['total_in_kgce_per_unit_area'] / 1000; // convert from kg to t
            setTotalInTCE(totalInTCE);

            let costDataArray = [];
            json['reporting_period_cost']['names'].forEach((currentValue, index) => {
              let costDataItem = {}
              costDataItem['id'] = index;
              costDataItem['name'] = currentValue;
              costDataItem['value'] = json['reporting_period_cost']['subtotals'][index];
              costDataItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
              costDataArray.push(costDataItem);
            });

            setCostShareData(costDataArray);
            let totalInTCO2E = {};
            totalInTCO2E['value'] = json['reporting_period_input']['total_in_kgco2e'] / 1000; // convert from kg to t
            totalInTCO2E['increment_rate'] = parseFloat(json['reporting_period_input']['increment_rate_in_kgco2e'] * 100).toFixed(2) + "%";
            totalInTCO2E['value_per_unit_area'] = json['reporting_period_input']['total_in_kgco2e_per_unit_area'] / 1000; // convert from kg to t
            setTotalInTCO2E(totalInTCO2E);

            let TCEDataArray = [];
            json['reporting_period_input']['names'].forEach((currentValue, index) => {
              let TCEDataItem = {}
              TCEDataItem['id'] = index;
              TCEDataItem['name'] = currentValue;
              TCEDataItem['value'] = json['reporting_period_input']['subtotals_in_kgce'][index] / 1000;
              TCEDataItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
              TCEDataArray.push(TCEDataItem);
            });
            setTCEShareData(TCEDataArray);

            let TCO2EDataArray = [];
            json['reporting_period_input']['names'].forEach((currentValue, index) => {
              let TCO2EDataItem = {}
              TCO2EDataItem['id'] = index;
              TCO2EDataItem['name'] = currentValue;
              TCO2EDataItem['value'] = json['reporting_period_input']['subtotals_in_kgco2e'][index] / 1000; // convert from kg to t
              TCO2EDataItem['color'] = "#"+((1<<24)*Math.random()|0).toString(16);
              TCO2EDataArray.push(TCO2EDataItem);
            });
            setTCO2EShareData(TCO2EDataArray);

            let timestamps = {}
            json['reporting_period_input']['timestamps'].forEach((currentValue, index) => {
              timestamps['a' + index] = currentValue;
            });
            setSpaceInputLineChartLabels(timestamps);

            let values = {}
            json['reporting_period_input']['values'].forEach((currentValue, index) => {
              values['a' + index] = currentValue;
            });
            setSpaceInputLineChartData(values);

            let names = Array();
            let thisMonthInputArr = [];
            json['reporting_period_input']['names'].forEach((currentValue, index) => {
              let unit = json['reporting_period_input']['units'][index];
              let thisMonthItem = {}
              names.push({ 'value': 'a' + index, 'label': currentValue + ' (' + unit + ')'});
              thisMonthItem['name'] = json['reporting_period_input']['names'][index];
              thisMonthItem['unit'] = json['reporting_period_input']['units'][index];
              thisMonthItem['subtotal'] = json['reporting_period_input']['values'][index][json['reporting_period_input']['values'][index].length - 1];
              thisMonthItem['increment_rate'] = parseFloat(json['reporting_period_input']['increment_rates'][index] * 100).toFixed(2) + "%";
              thisMonthItem['subtotal_per_unit_area'] = json['reporting_period_input']['subtotals_per_unit_area'][index];
              thisMonthInputArr.push(thisMonthItem);
            });
            setSpaceInputLineChartOptions(names);
            setThisMonthInputCardSummaryList(thisMonthInputArr);

            timestamps = {}
            json['reporting_period_cost']['timestamps'].forEach((currentValue, index) => {
              timestamps['a' + index] = currentValue;
            });
            setSpaceCostLineChartLabels(timestamps);

            values = {}
            json['reporting_period_cost']['values'].forEach((currentValue, index) => {
              values['a' + index] = currentValue;
            });
            setSpaceCostLineChartData(values);

            names = Array();
            let thisMonthCostArr = [];
            json['reporting_period_cost']['names'].forEach((currentValue, index) => {
              let thisMonthItem = {};
              let unit = json['reporting_period_cost']['units'][index];
              names.push({ 'value': 'a' + index, 'label': currentValue + ' (' + unit + ')'});
              thisMonthItem['name'] = json['reporting_period_cost']['names'][index];
              thisMonthItem['unit'] = json['reporting_period_cost']['units'][index];
              thisMonthItem['subtotal'] = json['reporting_period_cost']['values'][index][json['reporting_period_cost']['values'][index].length - 1];
              thisMonthItem['increment_rate'] = parseFloat(json['reporting_period_cost']['increment_rates'][index] * 100).toFixed(2) + "%";
              thisMonthItem['subtotal_per_unit_area'] = json['reporting_period_cost']['subtotals_per_unit_area'][index];
              thisMonthCostArr.push(thisMonthItem);
            });
            setSpaceCostLineChartOptions(names);
            setThisMonthCostCardSummaryList(thisMonthCostArr);

            let detailed_value_list = [];
            if (json['reporting_period_input']['timestamps'].length > 0 ) {
              json['reporting_period_input']['timestamps'][0].forEach((currentTimestamp, timestampIndex) => {
                let detailed_value = {};
                detailed_value['id'] = timestampIndex;
                detailed_value['startdatetime'] = currentTimestamp;
                json['reporting_period_input']['values'].forEach((currentValue, energyCategoryIndex) => {
                  detailed_value['a' + energyCategoryIndex] = json['reporting_period_input']['values'][energyCategoryIndex][timestampIndex].toFixed(2);
                });
                detailed_value_list.push(detailed_value);
              });
            }

            let detailed_value = {};
            detailed_value['id'] = detailed_value_list.length;
            detailed_value['startdatetime'] = t('Subtotal');
            json['reporting_period_input']['subtotals'].forEach((currentValue, index) => {
                detailed_value['a' + index] = currentValue.toFixed(2);
              });
            detailed_value_list.push(detailed_value);
            setTimeout( () => {
              setDetailedDataTableData(detailed_value_list);
            }, 0)

            let detailed_column_list = [];
            detailed_column_list.push({
              dataField: 'startdatetime',
              text: t('Datetime'),
              sort: true
            })
            json['reporting_period_input']['names'].forEach((currentValue, index) => {
              let unit = json['reporting_period_cost']['units'][index];
              detailed_column_list.push({
                dataField: 'a' + index,
                text: currentValue + ' (' + unit + ')',
                sort: true
              })
            });
            setDetailedDataTableColumns(detailed_column_list);

            let child_space_value_list = [];
            if (json['child_space_input']['child_space_names_array'].length > 0) {
              json['child_space_input']['child_space_names_array'][0].forEach((currentSpaceName, spaceIndex) => {
                let child_space_value = {};
                child_space_value['id'] = spaceIndex;
                child_space_value['name'] = currentSpaceName;
                json['child_space_input']['energy_category_names'].forEach((currentValue, energyCategoryIndex) => {
                  child_space_value['a' + energyCategoryIndex] = json['child_space_input']['subtotals_array'][energyCategoryIndex][spaceIndex];
                  child_space_value['b' + energyCategoryIndex] = json['child_space_cost']['subtotals_array'][energyCategoryIndex][spaceIndex];
                });
                child_space_value_list.push(child_space_value);
              });
            }

            setChildSpacesTableData(child_space_value_list);

            let child_space_column_list = [];
            child_space_column_list.push({
              dataField: 'name',
              text: t('Child Spaces'),
              sort: true
            });
            json['child_space_input']['energy_category_names'].forEach((currentValue, index) => {
              let unit = json['child_space_input']['units'][index];
              child_space_column_list.push({
                dataField: 'a' + index,
                text: t('CATEGORY Consumption UNIT', { 'CATEGORY': currentValue, 'UNIT': '(' + unit + ')' }),
                sort: true,
                formatter: function (decimalValue) {
                  if (typeof decimalValue === 'number') {
                    return decimalValue.toFixed(2);
                  } else {
                    return null;
                  }
                }
              });
            });
            json['child_space_cost']['energy_category_names'].forEach((currentValue, index) => {
              let unit = json['child_space_cost']['units'][index];
              child_space_column_list.push({
                dataField: 'b' + index,
                text: t('CATEGORY Costs UNIT', { 'CATEGORY': currentValue, 'UNIT': '(' + unit + ')' }),
                sort: true,
                formatter: function (decimalValue) {
                  if (typeof decimalValue === 'number') {
                    return decimalValue.toFixed(2);
                  } else {
                    return null;
                  }
                }
              });
            });

            setChildSpacesTableColumns(child_space_column_list);
            setChildSpacesInputData(json['child_space_input']);
            setChildSpacesCostData(json['child_space_cost']);
            setMonthLabels(json['reporting_period_cost']['timestamps'][0]);
            setSensor(json['sensor']);
            setPointList(json['point']);
          }
        });
      };

    };
  }, );

  useEffect(() => {
    let timer = setInterval(() => {
      let is_logged_in = getCookieValue('is_logged_in');
      if (is_logged_in === null || !is_logged_in) {
        setRedirectUrl(`/authentication/basic/login`);
        setRedirect(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [setRedirect, setRedirectUrl]);

  useEffect(() => {
    setLanguage(getItemFromStore('myems_web_ui_language'));
  }, [getItemFromStore('myems_web_ui_language')]);

  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (checkEmpty(is_logged_in) || checkEmpty(token)|| checkEmpty(user_uuid) || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, settings.cookieExpireTime);
      createCookie('user_name', user_name, settings.cookieExpireTime);
      createCookie('user_display_name', user_display_name, settings.cookieExpireTime);
      createCookie('user_uuid', user_uuid, settings.cookieExpireTime);
      createCookie('token', token, settings.cookieExpireTime);

      let isResponseOK = false;
      fetch(
        APIBaseURL +
          '/spaces/tree', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'User-UUID': getCookieValue('user_uuid'),
          Token: getCookieValue('token')
        },
        body: null,
      }).then(response => {
        console.log(response);
        if (response.ok) {
          isResponseOK = true;
        }
        return response.json();
      }).then(json => {
        if (isResponseOK) {
          // rename keys
          json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
          // get Combined Equipments by root Space ID
          let isResponseOK = false;
          fetch(
            APIBaseURL +
              '/spaces/' +
              [json[0]].map(o => o.value) +
              '/children', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'User-UUID': getCookieValue('user_uuid'),
              Token: getCookieValue('token')
            },
            body: null,

          }).then(response => {
            if (response.ok) {
              isResponseOK = true;
            }
            return response.json();
          }).then(json => {
            if (isResponseOK) {
              json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
              setRootLongitude(json[0]['current']['longitude']);
              setRootLatitude(json[0]['current']['latitude']);
              let geojson = {};
              geojson['type'] = 'FeatureCollection';
              let geojsonData = [];
              for(const childSpace of json[0]['children']){
                if (childSpace['latitude'] && childSpace['longitude']) {
                  geojsonData.push({
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': [childSpace['longitude'], childSpace['latitude']]
                      },
                    'properties': {
                      'title': childSpace['label'],
                      'description': childSpace['description'],
                      'uuid': childSpace['uuid'],
                      'url': '/space/energycategory'
                      }
                  })
                }
              }
              geojson['features'] = geojsonData;
              setGeojson(geojson);
            } else {
              toast.error(t(json.description))
            }
          }).catch(err => {
            console.log(err);
          });
          // end of get Combined Equipments by root Space ID
        } else {
          toast.error(t(json.description));
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }, [setRedirect, setRedirectUrl, t])


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


  return (
    <Fragment>
      <div className="card-deck">

        <HorizontalBarChart/>
        {/* 第三種table */}
        <Tabler_react/>
        {/* 第二種table */}
        <BarChartExample/>
        <Modalex/>
        
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
        ))}
         <CardSummary
            rate={totalInTCE['increment_rate'] || ''}
            title={t("This Year's Consumption CATEGORY VALUE UNIT", { 'CATEGORY': t('Ton of Standard Coal'), 'UNIT': '(TCE)' })}
            color="warning"
            footnote={t('Per Unit Area')}
            footvalue={totalInTCE['value_per_unit_area']}
            footunit="(TCE/M²)">
            {totalInTCE['value'] && <CountUp end={totalInTCE['value']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary>
          <CardSummary
            rate={totalInTCO2E['increment_rate'] || ''}
            title={t("This Year's Consumption CATEGORY VALUE UNIT", { 'CATEGORY': t('Ton of Carbon Dioxide Emissions'), 'UNIT': '(TCO2E)' })}
            color="warning"
            footnote={t('Per Unit Area')}
            footvalue={totalInTCO2E['value_per_unit_area']}
            footunit="(TCO2E/M²)">
            {totalInTCO2E['value'] && <CountUp end={totalInTCO2E['value']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary> */}
      </div>
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
          
          <BarChartnew
            labels={barLabels1}
            data={lastYearBarList1}
            compareData={thisYearBarList1}
            title={('MPPT告警')}
            compareTitle={('ACDC告警')}
            footnote={('發生:')}
            footunit={"次"} >
          </BarChartnew>
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
          <LineChartnew reportingTitle={("頻率圖")}
            baseTitle=''
            labels={spaceInputLineChartLabels}
            data={spaceInputLineChartData}
            options={spaceInputLineChartOptions}>
          </LineChartnew>

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

      { settings.showOnlineMap ?
        <div className='mb-3 card' style={{ height: '400px' }}>
        <CustomizeMapBox Latitude={rootLatitude} Longitude={rootLongitude} Zoom={15} Geojson={geojson['features']}>
        </CustomizeMapBox>
        </div>
      :
        <></>
      }
      {Object.keys(sensor).map((item) => (
            <RealtimeSensor key={uuid()}
              sensor={sensor[item]}
              pointList={pointList}>
            </RealtimeSensor>
          ))}
      </div>

      <BootstrapTable 
          keyField='id' 
          data={ toDoList } 
          columns={ columns } 
          // classes='mb-3 table-bordered react-bootstrap-table'
          // classes='mb-3'
          classes="table-dashboard table-striped table-sm fs--1  mb-0 table-dashboard-th-nowrap"
          // classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap custom-margin"
          rowClasses="btn-reveal-trigger"
          headerClasses="bg-200 text-900"
      />
      <Row noGutters>
        {/* <Col className="mb-3 pr-lg-2 mb-3">
          <SharePie data={timeOfUseShareData} title={('圓餅統計圖')} />
        </Col> */}
        <Col className="mb-5 pr-lg-2 mb-5">
          <SharePienew data={timeOfUseShareData} title={('PCS告警統計圖')} />
        </Col>
        <Col className="mb-5 pr-lg-2 mb-5">
          <SharePienew data={timeOfUseShareData_bms} title={('BMS告警統計圖')} />
        </Col>
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
      <ChartSpacesStackBarnew
        title={('AC側')}
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
