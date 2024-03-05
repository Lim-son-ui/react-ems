import React, { useState }from 'react'
import Cascader from 'rc-cascader';
import { APIBaseURL, settings } from '../../../config';
import { getCookieValue, createCookie, checkEmpty } from '../../../helpers/utils';
// import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
    Label,
    Spinner,
  } from 'reactstrap';


// 所以不能這樣試
export default function Cascader_test() {
    const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
    const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
    const [combinedEquipmentList, setCombinedEquipmentList] = useState([]);
    const [selectedCombinedEquipment, setSelectedCombinedEquipment] = useState(undefined);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [cascaderOptions, setCascaderOptions] = useState(undefined);


    const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

    let onSpaceCascaderChange = (value, selectedOptions) => {
        setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
        setSelectedSpaceID(value[value.length - 1]);
    
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
            toast.error((json.description))
          }
        }).catch(err => {
          console.log(err);
        });
      };
  
    return (
     <Col xs={6} sm={3}>
        <FormGroup className="form-group">
            <Label className={labelClasses} for="space">
            {('測試')}
            </Label>
            <br />
            <Cascader options={cascaderOptions}
            onChange={onSpaceCascaderChange}
            changeOnSelect
            expandTrigger="hover">
            <Input value={selectedSpaceName || ''} readOnly />
            </Cascader>
        </FormGroup>
    </Col>
  )
}
