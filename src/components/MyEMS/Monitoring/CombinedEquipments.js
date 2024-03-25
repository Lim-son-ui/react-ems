import React, { Fragment, useState, useEffect, createRef } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  CustomInput,
  Row,
  Form,
  FormGroup,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Label,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../common/Loader';
import useFakeFetch from '../../../hooks/useFakeFetch';
import { isIterableArray } from '../../../helpers/utils';
import Flex from '../../common/Flex';
import Cascader from 'rc-cascader';
import classNames from 'classnames';
import EquipmentList from './EquipmentList';
import EquipmentFooter from './EquipmentFooter';
import usePagination from '../../../hooks/usePagination';
import equipments from './equipments';
import { getCookieValue, createCookie, checkEmpty } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { APIBaseURL, settings } from '../../../config';

import './combineEquipment.css';
import axios from 'axios';
// import Cascader_test from './Cascader_test';
import option_time from './option_time'
import ShowTable from './ShowTable';
import Boot_table from './Boot_table';

// import { Scrollbars } from "react-custom-scrollbars"
import { Scrollbar } from 'react-scrollbars-custom'
import Swal from 'sweetalert2';

// import '@sweetalert2/theme-borderless'
import '@sweetalert2/theme-wordpress-admin'
import Materialtable from './Materialtable';
import New_material_crud from './New_material_crud'


const CombinedEquipments = ({ setRedirect, setRedirectUrl, t }) => {
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
    }
  });

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

  // State
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);

  const [combinedEquipmentList, setCombinedEquipmentList] = useState([]);
  const [selectedCombinedEquipment, setSelectedCombinedEquipment] = useState(undefined);
  const [equipmentIds, setEquipmentIds] = useState([]);
  const [cascaderOptions, setCascaderOptions] = useState(undefined);

  // button
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [spinnerHidden, setSpinnerHidden] = useState(true);

  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/tree', {
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
      console.log(json);
      if (isResponseOK) {
        // rename keys
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        setCascaderOptions(json);
        setSelectedSpaceName([json[0]].map(o => o.label));
        setSelectedSpaceID([json[0]].map(o => o.value));
        // get Combined Equipments by root Space ID
        let isResponseOK = false;
        fetch(APIBaseURL + '/spaces/' + [json[0]].map(o => o.value) + '/combinedequipments', {
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
            console.log(json);
            setCombinedEquipmentList(json[0]);
            if (json[0].length > 0) {
              setSelectedCombinedEquipment(json[0][0].value);
              // enable submit button
              setSubmitButtonDisabled(false);
            } else {
              setSelectedCombinedEquipment(undefined);
              // disable submit button
              setSubmitButtonDisabled(true);
            }
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

  }, []);

  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [selectedStrategName, setSelectedStrategName] = useState("");
  // const [selectedStrategName, setSelectedStrategName] = useState(undefined);
  // const [selectedStrategyID, setSelectedStrategyID] = useState(undefined);
  const [selectedStrategyID, setSelectedStrategyID] = useState("");

  let onSpaceStrategyChange = (value, selectedOptions) => {
    setSelectedStrategName(selectedOptions.map(o => o.label).join('/'));
    setSelectedStrategyID(value[value.length - 1]);

    onSpaceCascaderChange(value, selectedOptions)
  }

  //--------------------
  const [selectedMonthName, setSelectedMonthName] = useState("");
  // const [selectedMonthName, setSelectedMonthName] = useState(undefined);
  // const [selectedMonthID, setSelectedMonthID] = useState(undefined);
  const [selectedMonthID, setSelectedMonthID] = useState("");

  let onSpaceMonthChange = (value, selectedOptions) => {
    setSelectedMonthName(selectedOptions.map(o => o.label).join('/'));
    setSelectedMonthID(value[value.length - 1]);

    onSpaceCascaderChange(value, selectedOptions)
  }
  //--------------------
  const [selectedStartTimeName, setSelectedStartTimeName] = useState("");
  // const [selectedStartTimeName, setSelectedStartTimeName] = useState(undefined);
  // const [selectedStartTimeID, setSelectedStartTimeID] = useState(undefined);
  const [selectedStartTimeID, setSelectedStartTimeID] = useState("");

  let onSpaceStartTimeChange = (value, selectedOptions) => {
    setSelectedStartTimeName(selectedOptions.map(o => o.label).join('/'));
    setSelectedStartTimeID(value[value.length - 1]);

    onSpaceCascaderChange(value, selectedOptions)
  }
  //--------------------
  const [selectedEndTimeName, setSelectedEndTimeName] = useState("");
  // const [selectedEndTimeName, setSelectedEndTimeName] = useState(undefined);
  // const [selectedEndTimeID, setSelectedEndTimeID] = useState(undefined);
  const [selectedEndTimeID, setSelectedEndTimeID] = useState("");


  let onSpaceEndTimeChange = (value, selectedOptions) => {
    setSelectedEndTimeName(selectedOptions.map(o => o.label).join('/'));
    setSelectedEndTimeID(value[value.length - 1]);

    onSpaceCascaderChange(value, selectedOptions)
  }
  //--------------------
  const [selectedPowerName, setSelectedPowerName] = useState("");
  // const [selectedPowerName, setSelectedPowerName] = useState(undefined);
  // const [selectedPowerID, setSelectedPowerID] = useState(undefined);
  const [selectedPowerID, setSelectedPowerID] = useState("");

  //--------------------
  let onSpaceCascaderChange = (value, selectedOptions) => {
    // setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    // setSelectedSpaceID(value[value.length - 1]);

    // set_differ_name(value, selectedOptions)

    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/' + value[value.length - 1] + '/combinedequipments', {
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
        console.log(json)
        setCombinedEquipmentList(json[0]);
        if (json[0].length > 0) {
          setSelectedCombinedEquipment(json[0][0].value);
          // enable submit button
          setSubmitButtonDisabled(false);
        } else {
          setSelectedCombinedEquipment(undefined);
          // disable submit button
          setSubmitButtonDisabled(true);
        }
      } else {
        toast.error(t(json.description))
      }
    }).catch(err => {
      console.log(err);
    });
  };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Hook
  const { loading } = useFakeFetch(equipments);

  const [toDoList, setToDoList] = useState([]);

  const [updateId, setUpdateId] = useState(0);
  
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(toDoList, 4);
  // const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(equipmentIds, 4);
  const { onChangePage } = paginationHandler;
  const {  page, total, itemsPerPage, from, to } = paginationMeta;
  const { perPage } = paginationHandler;

  const isList = true;
  const isGrid = false;

  // useEffect(() => {
  //   setEquipmentIds(equipments.map(equipment => equipment.id));
  // }, []);

  // Handler
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   console.log('handleSubmit');
  //   console.log(selectedSpaceID);
  //   console.log(selectedCombinedEquipment);
  //   // // disable submit button
  //   // setSubmitButtonDisabled(true);
  //   // // show spinner
  //   // setSpinnerHidden(false);

  //   // // enable submit button
  //   // setSubmitButtonDisabled(false);
  //   // // hide spinner
  //   // setSpinnerHidden(true);

  // };


  // const [selectedStrategyName, setSelectedStrategyName] = useState(undefined);
  // const [selectedMonthName, setSelectedMonthName] = useState(undefined);
  // const [selectedStarthourName, setSelectedStarthourName] = useState(undefined);
  // const [selectedStartminuteName, setSelectedStartminuteName] = useState(undefined);

  // useEffect(() => {
  //   axios.get("http://localhost:3088/get_myems_strategy").then((response) => {
  //     setSelectedStrategyName(response.data);
  // });

  // },[selectedStrategyName])

  // useEffect((value, selectedStrategyName) => {
  //   setSelectedSpaceName(selectedStrategyName.map(o => o.content)).join('/');
  // });

  const options = [
    {
        value: '充電',
        label: '充電',
    },
    {
        value: '放電',
        label: '放電',
    },
    {
      value: '待機',
      label: '待機',
    },
  ];
  
  const options_month = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    },
    {
      value: '6',
      label: '6',
    },
    {
      value: '7',
      label: '7',
    },
    {
      value: '8',
      label: '8',
    },
    {
      value: '9',
      label: '9',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '11',
      label: '11',
    },
    {
      value: '12',
      label: '12',
    },
  ];

 

  // const onChange = (value) => {
  //   console.log(value);
  // };

  //實作真實 帶入資料
  
  // 當按下加入按鈕_0304測試動態帶入新資料
  const handleSubmit_2 = (e) => {

    // 只有當 確定有值新增才執行

    Swal.fire({
      title: "注意!!",
      text: "您已確定新增!",
      icon: "success"
    });

    e.preventDefault();
    if(updateId){
      const updateToDo = toDoList.find((i) => i.id === updateId);
      const updatedToDoList = toDoList.map((t) => 
        t.id === updateToDo.id ?  
          {id: t.id, 
            selectedStrategName, 
            selectedMonthName, 
            selectedStartTimeName, 
            selectedEndTimeName, 
            selectedPowerName}
        :t
      );

      setToDoList(updatedToDoList);
      setUpdateId(0);
      
      setSelectedStrategName(selectedStrategName);
      setSelectedMonthName(selectedMonthName);
      setSelectedStartTimeName(selectedStartTimeName);
      setSelectedEndTimeName(selectedEndTimeName);
      setSelectedPowerName("");

      return;
    }

    if(selectedStartTimeName !== " "){
      setToDoList([
        ...toDoList,
        {
            // id: `${selectedStartTimeName}`,
            id: toDoList.length+1,
            selectedStrategName,
            selectedMonthName,
            selectedStartTimeName,
            selectedEndTimeName,
            selectedPowerName
        }
    ]);
 
      setSelectedStrategName("");
      setSelectedMonthName("");
      setSelectedStartTimeName("");
      setSelectedEndTimeName("");
      setSelectedPowerName("");

      
      allpage(page, perPage, toDoList, total, paginationHandler);

    }

    
  }


  const allpage = (page, perPage, toDoList, total, paginationHandler) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
  
    // 從 toDoList 中截取相應的資料
    const paginatedData = toDoList.slice(startIndex, endIndex);    

    // 更新 paginationData
    paginationHandler.onChangePage(page, paginatedData, total);
  }

  const handleUpdate = (id) => {
    const updateToDo = toDoList.find((i) => i.id === id);
    
    setUpdateId(id);
    setSelectedStrategName(updateToDo.selectedStrategName);
    setSelectedMonthName(updateToDo.selectedMonthName);
    setSelectedStartTimeName(updateToDo.selectedStartTimeName);        
    setSelectedEndTimeName(updateToDo.selectedEndTimeName);
    setSelectedPowerName(updateToDo.selectedPowerName);
  };


  const reverse = () => {
    setToDoList([...toDoList.reverse()]);
  }

  const confirm_submit = () => {
    toDoList.forEach((val) => {
      // 解析選定的開始時間字符串，假設它的格式是 "12時30分"
      

      if( val.selectedStartTimeName && val.selectedEndTimeName) {
        const [hourStr, minuteStr] = val.selectedStartTimeName.split('時');
        const  startTimeHour = parseInt(hourStr, 10); // 小時部分
        const startTimeMinute = parseInt(val.selectedStartTimeName.split('/')[1].split('分')[0], 10); // 分鐘部分

        const [end_hourStr, end_minuteStr] = val.selectedEndTimeName.split('時');
        const endTimeHour = parseInt(end_hourStr, 10); // 小時部分
        const endTimeMinute = parseInt(val.selectedEndTimeName.split('/')[1].split('分')[0], 10); // 分鐘部分


        axios.post("http://localhost:3088/write_addData", {
        startTimeHour,
        startTimeMinute,
        endTimeHour,
        endTimeMinute
      }).then(() => {
        // 請求成功處理
      }).catch((error) => {
        // 請求失敗處理
        console.error("Error:", error);
      });
      }

      // 發送 POST 請求到後端
      
    });
    // toDoList.map((val, key) => {
    //   axios.post("http://localhost:3088/write_addData", {
    //     startTimeHour: val.startTimeHour,
    //     startTimeMinute: val.startTimeMinute,
    //     endTimeHour: val.endTimeHour,
    //     endTimeMinute: val.endTimeMinute
    //   }).then(() => {
       
    //   });
    // })
  };

  const handleDelete = (id) => {
    const deleteToDo = toDoList.filter((to) => to.id !== id);
    // 最後狀態需要更新回傳，將刪除傳遞給array
    // ...為擴展運算符號

    setToDoList([...deleteToDo]);
  };

  


  const [isSelected, setIsSelected] = useState(false);
  let table = createRef();

  // const onSelect = () => {
  //   setImmediate(() => {
  //     setIsSelected(!!table.current.selectionContext.selected.length);
  //   });
  // };

  const actionFormatter = (dataField, { id }) => (
    // Control your row with this id
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => handleUpdate(id)} className="text-info">{('更新')}</DropdownItem>
        <DropdownItem onClick={() => handleDelete(id)} className="text-danger">{('刪除')}</DropdownItem>
        
        <DropdownItem divider />
        
      </DropdownMenu>
    </UncontrolledDropdown>
  );

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
    },
    {
      dataField: '',
      text: '',
      classes: 'py-2 align-middle',
      formatter:actionFormatter
    }
  ];


  const confirm = () => {
    if(window.confirm('請問，確定要執行送出?')){
      confirm_submit();
    }
  }

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          {/* <BreadcrumbItem>{t('Monitoring')}</BreadcrumbItem><BreadcrumbItem active>{t('Combined Equipments')}</BreadcrumbItem> */}
          <BreadcrumbItem>{('PCS')}</BreadcrumbItem><BreadcrumbItem active>{('排程')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
       {/* 提交 空間 組合設備 */}
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form>
          {/* <Form onSubmit={handleSubmit}> */}
            <Row form>


              {/* <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {t('Space')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col> */}
              
              {/* <Cascader_test
                options={options}
                onChange
              ></Cascader_test> */}
              <Col xs={3} sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {('策略')}
                  </Label>
                  <br />
                  <Cascader options={options}
                    onChange={onSpaceStrategyChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedStrategName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              <Col xs={3} sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {('月')}
                  </Label>
                  <br />
                  <Cascader options={options_month}
                    onChange={onSpaceMonthChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedMonthName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              <Col xs={3} sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {('開始')}
                  </Label>
                  <br />
                  <Cascader options={option_time}
                    onChange={onSpaceStartTimeChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedStartTimeName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              {/* <Col xs={3} sm={1}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                  {('開始(分)')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col> */}
              <Col xs={3} sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {('結束')}
                  </Label>
                  <br />
                  <Cascader options={option_time}
                    onChange={onSpaceEndTimeChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedEndTimeName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              {/* <Col xs={3} sm={1}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                  {('結束(分)')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col> */}
              <Col xs={3} sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                  {('功率')}
                  </Label>
                  <br />
                  <Input
                    className=''
                    type='text'
                    value={selectedPowerName}
                    onChange={(e) => setSelectedPowerName(e.target.value)}
                  />

                  {/* <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader> */}
                </FormGroup>
              </Col>

              {/* 這個應該是  組合設備 的選項欄位 */}
              {/* <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="combinedEquipmentSelect">
                    {t('Combined Equipment')}
                  </Label>
                  <CustomInput type="select" id="combinedEquipmentSelect" name="combinedEquipmentSelect" onChange={({ target }) => setSelectedCombinedEquipment(target.value)}
                  >
                    {combinedEquipmentList.map((combinedEquipment, index) => (
                      <option value={combinedEquipment.value} key={combinedEquipment.value}>
                        {combinedEquipment.label}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col> */}
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                    {/* <Button color="info" disabled={submitButtonDisabled} onClick={handleSubmit_2}>{('新增')}</Button> */}
                    <Button color="info"  onClick={handleSubmit_2}>{('新增')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
              {/* <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                    <Button color="success" disabled={submitButtonDisabled} >{t('Submit')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col> */}
              {/* <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                    <Button color="danger" disabled={submitButtonDisabled} >{('刪除')}</Button>
                    <Button color="danger" onClick={handleDelete()} >{('刪除')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col> */}
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                    <Button color="secondary"  onClick={reverse}>{('反置')}</Button>
                    {/* <Button color="secondary"  onClick={reverse}>{('送出')}</Button> */}
                  </ButtonGroup>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                    <Button color="secondary"  onClick={confirm}>{('送出')}</Button>
                    {/* <Button color="secondary"  onClick={reverse}>{('送出')}</Button> */}
                  </ButtonGroup>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <Spinner color="primary" hidden={spinnerHidden}  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* 測試bootstrap card */}
      {/* <Boot_table/> */}
      {/* <Scrollbar style={{ width: "1500px", height: "550px"}}> */}
      {/* </Scrollbar> */}

      {/* 0305下午 測試換頁無法根據點選所改變 */}
      {/* <BootstrapTable 
        keyField='id' 
        data={ toDoList } 
        columns={ columns } 
        classes='mb-3'
        // classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap custom-margin"
        rowClasses="btn-reveal-trigger"
        headerClasses="bg-200 text-900"
        /> */}
        
        <BootstrapTable 
          keyField='id' 
          // data={ toDoList }
          data={ paginationData } 
          columns={ columns } 
          
          classes='mb-2 table-striped'
          // classes='mb-4 table-dashboard table-striped'
          // classes="table-dashboard table-striped table-sm fs--1  mb-3 table-dashboard-th-nowrap"
          
          // classes="table-dashboard table-striped table-sm fs--1  mb-0 table-dashboard-th-nowrap"
          // classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap custom-margin"
          rowClasses="btn-reveal-trigger"
          headerClasses="bg-200 text-900"
        />


      {/* 如何在這一頁  帶出排程資料 */}
      <Card className="mb-5">
        {/* <CardBody className={classNames({ 'p-0  overflow-hidden': isList, 'pb-0': isGrid })}>
          {loading ? (
            <Loader />
          ) : (
              
              <div>
                <Row>
                  <Col xs={12}  className={classNames('p-3')}>
                    <div className="p-1 container-rectangle">
                        <p className='container-rectangle-in'>
                              這是運行
                        </p>
                        <p>
                              todo
                        </p>
                        <p>
                              month
                        </p>
                        <p>
                              starthour
                        </p>
                        <p>
                              startminute
                        </p>
                        <p>
                              endhour
                        </p>
                        <p>
                              endminute
                        </p>
                        <p>
                              power
                        </p>
                    </div>
                   
                  </Col>
                </Row>
                <Row noGutters={isList}>
                  {isIterableArray(equipments) &&
                    equipments
                      .filter(equipment => paginationData.includes(equipment.id))
                      .map((equipment, index) => <EquipmentList {...equipment} sliderSettings={sliderSettings} key={equipment.id} index={index} />)}
                </Row>
              </div>

            )}
        </CardBody> */}
          
        {/* 換頁 */}
        <EquipmentFooter meta={paginationMeta} handler={paginationHandler} />
      </Card>

      {/* 每頁顯示 數量 */}
      <Card className="mb-2">
        <CardBody>
          <Row className="justify-content-between align-items-center">
            <Col sm="auto" className="mb-2 mb-sm-0" tag={Flex} align="center">
              <h6 className="mb-0 text-nowrap ml-2">
                {('顯示數量')}
              </h6>
              <CustomInput
                id="itemsPerPage"
                type="select"
                bsSize="sm"
                value={itemsPerPage}
                onChange={({ target }) => perPage(Number(target.value))}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={total}>{t('All')}</option>
              </CustomInput>
              {/* <h6 className="mb-0 text-nowrap ml-2">
                {t('FROM - TO of TOTAL Equipments', { 'FROM': from, 'TO': to, 'TOTAL': total })}
              </h6> */}
            </Col>

          </Row>
        </CardBody>
      </Card>

      {/* <Row> */}
        {/* <Col xs="auto"> */}
          <New_material_crud/>
        {/* </Col>
        <Col xs="auto"> */}
          {/* <Materialtable/> */}
        {/* </Col>
      </Row> */}
      
      {/* <ShowTable/> */}
      {/* <ShowTable>

      </ShowTable> */}
      
      {/* 0304先把假資料 消去  */}
      {/* <Boot_table/> */}
      
      {/* {
        toDoList.map((t) => (
            <span className='toDoText' key={t.id}>
              <span className='space-col'>{t.selectedStrategName}</span>
              <span className='space-col'>{t.selectedMonthName}</span>
              <span className='space-col'>{t.selectedStartTimeName}</span>
              <span className='space-col'>{t.selectedEndTimeName}</span>
              <span className='space-col'>{t.selectedPowerName}</span>
            </span>
        ))
      } */}
      
    </Fragment>
  );
};

export default withTranslation()(withRedirect(CombinedEquipments));
