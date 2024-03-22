import React, { createRef, Fragment, useEffect, useState } from 'react';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { toast } from 'react-toastify';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  UncontrolledDropdown,
  Spinner,
} from 'reactstrap';
import ButtonIcon from '../../common/ButtonIcon';
import Badge from 'reactstrap/es/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../../common/FalconCardHeader';
import Datetime from 'react-datetime';
import { getPaginationArray } from '../../../helpers/utils';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { APIBaseURL, settings } from '../../../config';

import axios from 'axios';


import Reacttable from '../common/Reacttable'


const Fault = ({ setRedirect, setRedirectUrl, t }) => {
  let current_moment = moment();

  // Query Parameters
  const [startDatetime, setStartDatetime] = useState(current_moment.clone().startOf('month'));
  const [endDatetime, setEndDatetime] = useState(current_moment);
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  //Results
  const [faults, setFaults] = useState([]);
  const [excelBytesBase64, setExcelBytesBase64] = useState(undefined);

  // buttons
  const [spinnerHidden, setSpinnerHidden] = useState(true);
  const [exportButtonHidden, setExportButtonHidden] = useState(true);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // useEffect(() => {
  //   let is_logged_in = getCookieValue('is_logged_in');
  //   let user_name = getCookieValue('user_name');
  //   let user_display_name = getCookieValue('user_display_name');
  //   let user_uuid = getCookieValue('user_uuid');
  //   let token = getCookieValue('token');

  //   // let faultList = []
  //   // let fault = {}

  //   // fault['id'] = "1";
  //   // fault['subject'] = "這是主題";
  //   // fault['created_datetime'] = "20240226";
  //   // fault['message'] = "這是內容";
  //   // fault['status'] = "這是狀態";
  //   // fault['url'] = "這是url";

  //   // faultList.push(fault);
  //   // setFaults(faultList);

  //   if (is_logged_in === null || !is_logged_in) {
  //     setRedirectUrl(`/authentication/basic/login`);
  //     setRedirect(true);
  //   } else {
  //     //update expires time of cookies
  //     createCookie('is_logged_in', true, settings.cookieExpireTime);
  //     createCookie('user_name', user_name, settings.cookieExpireTime);
  //     createCookie('user_display_name', user_display_name, settings.cookieExpireTime);
  //     createCookie('user_uuid', user_uuid, settings.cookieExpireTime);
  //     createCookie('token', token, settings.cookieExpireTime);
  //   }
  // }, );
  // State
  let table = createRef();

  const [isSelected, setIsSelected] = useState(false);
  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  let onStartDatetimeChange = (newDateTime) => {
    setStartDatetime(newDateTime);
  }

  let onEndDatetimeChange = (newDateTime) => {
    setEndDatetime(newDateTime);
  }

  var getStartDatetime = function (currentDate) {
    return currentDate.isBefore(moment(endDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getEndDatetime = function (currentDate) {
    return currentDate.isAfter(moment(startDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  const subjectFormatter = (dataField, { url }) => (
    <Fragment>
      <span>{dataField}</span>
    </Fragment>
  );

  const messageFormatter = (dataField,) => (
    <Fragment>
      {dataField}
    </Fragment>
  );

  const statusFormatter = status => {
    let color = '';
    let icon = '';
    let text = '';
    switch (status) {
      case 'acknowledged':
        color = 'success';
        icon = 'envelope-open';
        text = t('Notification Acknowledged');
        break;
      case 'read':
        color = 'success';
        icon = 'envelope-open';
        text = t('Notification Read');
        break;
      default:
        color = 'primary';
        icon = 'envelope';
        text = t('Notification Unread');
    }

    return (
      <Badge color={`soft-${color}`} className="rounded-capsule fs--1 d-block">
        {text}
        <FontAwesomeIcon icon={icon} transform="shrink-2" className="ml-1" />
      </Badge>
    );
  };

  const actionFormatter = (dataField, { id }) => (
    // Control your row with this id
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={() => handleRead(id)}>{t('Notification Mark As Read')}</DropdownItem>
        <DropdownItem onClick={() => handleAcknowledged(id)}>{t('Notification Mark As Acknowledged')}</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => handledelete(id)} className="text-danger">{t('Notification Delete')}</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  // const columns = [
  //   {
  //     dataField: 'subject',
  //     text: t('Notification Subject'),
  //     classes: 'py-2 align-middle',
  //     formatter: subjectFormatter,
  //     sort: true
  //   },
  //   {
  //     dataField: 'created_datetime',
  //     text: t('Notification Created Datetime'),
  //     classes: 'py-2 align-middle',
  //     sort: true
  //   },
  //   {
  //     dataField: 'message',
  //     text: t('Notification Message'),
  //     classes: 'py-2 align-middle',
  //     formatter: messageFormatter,
  //     sort: true
  //   },
  //   {
  //     dataField: 'status',
  //     text: t('Notification Status'),
  //     classes: 'py-2 align-middle',
  //     formatter: statusFormatter,
  //     sort: true
  //   },
  //   {
  //     dataField: '',
  //     text: '',
  //     classes: 'py-2 align-middle',
  //     formatter: actionFormatter,
  //     align: 'right'
  //   }
  // ];
  const columns = [
    {
      dataField: 'AC1_warning',
      text: t('Notification AC1_warning'),
      classes: 'py-2 align-middle',
      formatter: subjectFormatter,
      sort: true
    },
    {
      dataField: 'created_datetime',
      text: t('Notification Created Datetime'),
      classes: 'py-2 align-middle',
      sort: true
    },
    {
      dataField: 'message',
      text: t('Notification Message'),
      classes: 'py-2 align-middle',
      formatter: messageFormatter,
      sort: true
    },
    {
      dataField: 'status',
      text: t('Notification Status'),
      classes: 'py-2 align-middle',
      formatter: statusFormatter,
      sort: true
    },
    {
      dataField: '',
      text: '',
      classes: 'py-2 align-middle',
      formatter: actionFormatter,
      align: 'right'
    }
  ];

  const options = {
    custom: true,
    sizePerPage: 10,
    totalSize: faults.length
  };

  const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        {...rest}
        onChange={() => { }}
        ref={input => {
          if (input) input.indeterminate = indeterminate;
        }}
      />
      <label className="custom-control-label" />
    </div>
  );

  const selectRow = onSelect => ({
    mode: 'checkbox',
    classes: 'py-2 align-middle',
    clickToSelect: false,
    selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
    selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
    onSelect: onSelect,
    onSelectAll: onSelect
  });
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

// Handler   get
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(startDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(endDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(priority)
    console.log(status)

    // disable submit button
    setSubmitButtonDisabled(true);
    // show spinner
    setSpinnerHidden(false);
    // hide export button
    setExportButtonHidden(true)

    // Reinitialize tables
    setFaults([]);

    let isResponseOK = false;
    fetch(
      APIBaseURL +
      '/webmessages?' +
      'startdatetime=' +
      startDatetime.format('YYYY-MM-DDTHH:mm:ss') +
      '&enddatetime=' +
      endDatetime.format('YYYY-MM-DDTHH:mm:ss') +
      '&priority=' +
      priority +
      '&status=' +
      status, {
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
      // enable submit button
      setSubmitButtonDisabled(false);
      // hide spinner
      setSpinnerHidden(true);
      // show export button
      setExportButtonHidden(false)

      return response.json();
    }).then(json => {
      if (isResponseOK) {

        let faultList = []

        if (json.length > 0) {
          json.forEach((currentValue, index) => {
            let fault = {}
            fault['id'] = currentValue['id'];
            fault['subject'] = currentValue['subject'];
            fault['created_datetime'] = moment(parseInt(currentValue['created_datetime']))
                .format("YYYY-MM-DD HH:mm:ss");
            fault['message'] = currentValue['message'];
            fault['status'] = currentValue['status'];
            fault['url'] = currentValue['url'];

            fault['id'] = "1";
            fault['subject'] = "這是主題";
            fault['created_datetime'] = "20240226";
            fault['message'] = "這是內容";
            fault['status'] = "這是狀態";
            fault['url'] = "這是url";

            faultList.push(fault);
          });
        }

        setFaults(faultList);
        setExcelBytesBase64(json['excel_bytes_base64']);
        setSpinnerHidden(true);
      } else {
        toast.error(t(json.description))
      }
    }).catch(err => {
      console.log(err);
    });
  };
  //put 我覺得跟 post 差不多
  const handleRead = (id, ) => {
    console.log('Mark As Read: ', id)
    let isResponseOK = false;
    fetch(
      APIBaseURL +
      '/webmessages/' +
      id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      body: JSON.stringify({
        "data": {
          "status": 'read'
        }
      }),
    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
        return null;
      } else {
        return response.json();
      }
    }).then(json => {
      console.log(isResponseOK);
      if (isResponseOK) {
        let isResponseOK = false;
        fetch(
          APIBaseURL +
          '/webmessages?' +
          'startdatetime=' +
          startDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&enddatetime=' +
          endDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&priority=' +
          priority +
          '&status=' +
          status, {
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

            let faultList = []

            if (json.length > 0) {
              json.forEach((currentValue, index) => {
                let fault = {}
                fault['id'] = json[index]['id'];
                fault['subject'] = json[index]['subject'];
                fault['created_datetime'] = moment(parseInt(json[index]['created_datetime']))
                    .format("YYYY-MM-DD HH:mm:ss");
                fault['message'] = json[index]['message'];
                fault['status'] = json[index]['status'];
                fault['url'] = json[index]['url'];

                faultList.push(fault);
              });
            }

            setFaults(faultList);
            setSpinnerHidden(true);
          }
        });
      } else {
        toast.error(t(json.description))
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handleAcknowledged = (id, ) => {
    console.log('Mark As Acknowledged: ', id)
    let isResponseOK = false;
    fetch(
      APIBaseURL +
      '/webmessages/' +
      id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      body: JSON.stringify({
        "data": {
          "status": 'acknowledged',
          "reply": 'OK'
        }
      }),
    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
        return null;
      } else {
        return response.json();
      }
    }).then(json => {
      console.log(isResponseOK);
      if (isResponseOK) {
        let isResponseOK = false;
        fetch(
          APIBaseURL +
          '/webmessages?' +
          'startdatetime=' +
          startDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&enddatetime=' +
          endDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&priority=' +
          priority +
          '&status=' +
          status,  {
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

            let faultList = []

            if (json.length > 0) {
              json.forEach((currentValue, index) => {
                let fault = {}
                fault['id'] = json[index]['id'];
                fault['subject'] = json[index]['subject'];
                fault['created_datetime'] = moment(parseInt(json[index]['created_datetime']))
                    .format("YYYY-MM-DD HH:mm:ss");
                fault['message'] = json[index]['message'];
                fault['status'] = json[index]['status'];
                fault['url'] = json[index]['url'];

                faultList.push(fault);
              });
            }

            setFaults(faultList);
            setSpinnerHidden(true);
          }
        });
      } else {
        toast.error(t(json.description))
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handledelete = (id, ) => {
    console.log('Delete: ', id)
    let isResponseOK = false;
    fetch(
      APIBaseURL +
      '/webmessages/' +
      id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'User-UUID': getCookieValue('user_uuid'),
        Token: getCookieValue('token')
      },
      body: null,
    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
        return null;
      } else {
        return response.json();
      }
    }).then(json => {
      console.log(isResponseOK);
      if (isResponseOK) {
        let isResponseOK = false;
        fetch(
          APIBaseURL +
          '/webmessages?' +
          'startdatetime=' +
          startDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&enddatetime=' +
          endDatetime.format('YYYY-MM-DDTHH:mm:ss') +
          '&priority=' +
          priority +
          '&status=' +
          status,  {
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

            let faultList = []

            if (json.length > 0) {
              json.forEach((currentValue, index) => {
                let fault = {}
                fault['id'] = json[index]['id'];
                fault['subject'] = json[index]['subject'];
                fault['created_datetime'] = moment(parseInt(json[index]['created_datetime']))
                    .format("YYYY-MM-DD HH:mm:ss");
                fault['message'] = json[index]['message'];
                fault['status'] = json[index]['status'];
                fault['url'] = json[index]['url'];

                faultList.push(fault);
              });
            }

            setFaults(faultList);
            setSpinnerHidden(true);
          }
        });
      } else {
        toast.error(t(json.description))
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handleExport = e => {
    e.preventDefault();
    const mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const fileName = 'fddfault.xlsx'
    var fileUrl = "data:" + mimeType + ";base64," + excelBytesBase64;
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            var link = window.document.createElement('a');
            link.href = window.URL.createObjectURL(blob, { type: mimeType });
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
  };

  const handle_test = () => {
    // axios.get("http://localhost:3088/get_myems_warn").then((response) => {
    //   //setScheduleList(response.data);
    //   setFaults(response.data);
    // });
    axios.get("http://localhost:3089/get_myems_warn").then((response) => {
      //setScheduleList(response.data);
      setFaults(response.data);
    });
  }

  // 以下跟告警有關
  //-----------------------------------------------------------------------------------------
  const [warning_data, set_warning_data] = useState([3]);
  const [listacenvironerror, setlistacenvironerror] = useState([]);

  const get_ac1_warning = () => {
    axios.get("http://localhost:3088/getWarninig").then((response) => {
      set_warning_data(response.data);
      setFaults(response.data);
    });
  }

  const confirm = () => {
    if(window.confirm('請問，確定要執行此動作?')){
        // get_data();
        get_ac1_warning();
    }
}

  //初始給定一值  16 bits 告警
  useEffect(() => {
    get_ac1_warning();
    const List_ac_environ_error = [
      '鎖相告警',
      '直流側硬件起故障',
      '交流側硬件起故障',
      '直流軟件起故障',
      '電網諧振故障',
      '輸入阻抗故障',
      '輸入阻抗告警',
      'CANB通信異常告警',
      '系統存在地址衝突故障',
      '系統主機存在地址衝突故障',
      '模塊地址異常故障',
      'DC電壓採集故障告警',
      'AC電壓採集異常告警',
      'DC側主計電器告警',
      '過載告警'
    ]

    setlistacenvironerror(List_ac_environ_error);

  },[]);



  // 處理告警內容
  const handlewarningcontent = (readwarningcontent) => {
    const binarystring = readwarningcontent.toString(2).padStart(listacenvironerror.length, '0')
    
    const warningcolors = listacenvironerror.map((error, index) => {
      const color = (binarystring.charAt(index) === '1') ? 'red' : 'green';
      return `${error}: ${color}`;
    });
    

    console.log('warning colors:', warningcolors);
    // const color = (binarystring.charAt(index) === '1')
  }


  const handleWarningColor = (bit) => {
    return bit === '1' ? 'red' : 'green';
  }

  return (
    <Fragment>
      <div>
        {/* <Breadcrumb>
          <BreadcrumbItem active>{t('Fault Alarm')}</BreadcrumbItem>
        </Breadcrumb> */}
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col sm={1}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="priority">
                    {t('Notification Priority')}
                  </Label>
                  <CustomInput type="select" id="bulk-select"
                    value={priority}
                    onChange={({ target }) => {setPriority(target.value);}}>
                    <option value="all" key="all" >{t('View all')}</option>
                    <option value="LOW" key="low" >{t('Notification Low')}</option>
                    <option value="MEDIUM" key="medium" >{t('Notification Medium')}</option>
                    <option value="HIGH" key="high" >{t('Notification High')}</option>
                    <option value="CRITICAL" key="critical" >{t('Notification Critical')}</option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm={1}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="status">
                    {t('Notification Status')}
                  </Label>
                  <CustomInput type="select" id="bulk-select"
                    value={status}
                    onChange={({ target }) => {setStatus(target.value);}}>
                    <option value="all" key="all" >{t('View all')}</option>
                    <option value="read" key="read" >{t('Notification Read')}</option>
                    <option value="new" key="unread" >{t('notification_NEW')}</option>
                    <option value="acknowledged" key="acknowledged" >{t('Notification Acknowledged')}</option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="startDatetime">
                    {t('Reporting Period Begins')}
                  </Label>
                  <Datetime id='startDatetime'
                    value={startDatetime}
                    onChange={onStartDatetimeChange}
                    isValidDate={getStartDatetime}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col sm={2}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="endDatetime">
                    {t('Reporting Period Ends')}
                  </Label>
                  <Datetime id='endDatetime'
                    value={endDatetime}
                    onChange={onEndDatetimeChange}
                    isValidDate={getEndDatetime}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <Spinner color="primary" hidden={spinnerHidden}  />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br />
                  <ButtonGroup id="submit">
                  {/* disabled={submitButtonDisabled} */}
                    <Button color="success"  onClick={handleSubmit}>{t('Submit')}</Button>
                  </ButtonGroup>
                  {/* <ButtonGroup id="submit">
                    <Button color="info" disabled={submitButtonDisabled} onClick={handle_test} >{t('test')}</Button>
                  </ButtonGroup> */}
                  <ButtonGroup id="submit">
                    <Button color="info" onClick={handle_test} >{t('test')}</Button>
                  </ButtonGroup>
                  <ButtonGroup id="submit">
                    <Button color="warning"  onClick={confirm} >{('讀取')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
              <Col xs="auto">
                  <br />
                  <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default"
                  hidden={exportButtonHidden}
                  onClick={handleExport} >
                    {t('Export')}
                  </ButtonIcon>
              </Col>
              {/* <Col xs="auto">
                  <br />
                  <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default"
                  hidden={exportButtonHidden}
                  onClick={handle_test} >
                    {t('test')}
                  </ButtonIcon>
              </Col> */}
            </Row>
          </Form>
        </CardBody>
      </Card>

      {/* 看起來告警的部分，是下面的這一塊來帶出資料 */}
      <Card className="mb-3">
        <Spinner color="primary" hidden={spinnerHidden}  />
        {/* <FalconCardHeader title={t('Fault Alarms')} light={false} titleClass="text-lightSlateGray mb-0">
          {isSelected ? (
            <InputGroup size="sm" className="input-group input-group-sm">
              <CustomInput type="select" id="bulk-select">
                <option>{t('Bulk actions')}</option>
                <option value="MarkAsRead">{t('Notification Mark As Read')}</option>
                <option value="MarkAsAcknowledged">{t('Notification Mark As Acknowledged')}</option>
                <option value="Delete">{t('Notification Delete')}</option>
              </CustomInput>
              <Button color="falcon-default" size="sm" className="ml-2">
              {t('Notification Apply')}
                </Button>
            </InputGroup>
          ) : (
              <Fragment>

              </Fragment>
            )}
        </FalconCardHeader> */}
        <CardBody className="p-0">
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => {
              const lastIndex = paginationProps.page * paginationProps.sizePerPage;

              return (
                <Fragment>
                  <div className="table-responsive">
                    <BootstrapTable
                      ref={table}
                      bootstrap4
                      keyField="id"
                      data={faults}
                      columns={columns}
                      selectRow={selectRow(onSelect)}
                      bordered={false}
                      classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                      rowClasses="btn-reveal-trigger"
                      headerClasses="bg-200 text-900"
                      {...paginationTableProps}
                    />


                    <Reacttable/>
                    {/* 還在嘗試顯示告警 */}
                    {/* <ul>
                      {listacenvironerror.map((error, index) => (
                        <li key={index} style={{ backgroundColor: handleWarningColor((warning_data >> index) & 1) }}>
                            {error}
                        </li>
                      ))}
                    </ul> */}
                    {/* <BootstrapTable
                      ref={table}
                      bootstrap4
                      keyField="id"
                      data={faults}
                      columns={columns}
                      selectRow={selectRow(onSelect)}
                      bordered={false}
                      classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                      rowClasses="btn-reveal-trigger"
                      headerClasses="bg-200 text-900"
                      {...paginationTableProps}
                    /> */}
                  </div>
                  <Row noGutters className="px-1 py-3 flex-center">
                    <Col xs="auto">
                      <Button
                        color="falcon-default"
                        size="sm"
                        onClick={handlePrevPage(paginationProps)}
                        disabled={paginationProps.page === 1}
                      >
                        <FontAwesomeIcon icon="chevron-left" />
                      </Button>
                      {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                        <Button
                          color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
                          size="sm"
                          className="ml-2"
                          onClick={() => paginationProps.onPageChange(pageNo)}
                          key={pageNo}
                        >
                          {pageNo}
                        </Button>
                      ))}
                      <Button
                        color="falcon-default"
                        size="sm"
                        className="ml-2"
                        onClick={handleNextPage(paginationProps)}
                        disabled={lastIndex >= paginationProps.totalSize}
                      >
                        <FontAwesomeIcon icon="chevron-right" />
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              );
            }}
          </PaginationProvider>
        </CardBody>
      </Card>

    </Fragment>
  );
};

export default withTranslation()(withRedirect(Fault));
