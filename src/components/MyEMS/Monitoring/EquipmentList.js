import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Col, Row } from 'reactstrap';
import { isIterableArray } from '../../../helpers/utils';
import Slider from 'react-slick/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from '../../common/Flex';
import classNames from 'classnames';
import ButtonIcon from '../../common/ButtonIcon';
import AppContext, { ProductContext } from '../../../context/Context';
import { withTranslation } from 'react-i18next';
import {v4 as uuid} from 'uuid';

const EquipmentList = ({
  id,
  files,
  title,
  category,
  features,
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
  parameter6,
  parameter7,
  alarms,
  isOnline,
  isRunning,
  sliderSettings,
  index,
  t
}) => {
  const { isDark } = useContext(AppContext);
  const {  favouriteItemsDispatch } = useContext(ProductContext);
  const [cartLoading, setCartLoading] = useState(false);

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
    }, 1000);
  };

  return (
    <Col xs={12} className={classNames('p-3', { 'bg-100': isDark && index % 2 !== 0 })}>
      <div className="p-1">
        <Row>
          <Col sm={5} md={4}>
            <div className="position-relative h-sm-100">
              <iframe
                className="img-fluid fit-cover w-sm-100 h-sm-100 rounded absolute-sm-centered"
                src="http://192.168.2.53:18080/#/play/wasm/ws%3A%2F%2F192.168.2.53%3A6080%2Fapp1%2F34020000001320000011.live.flv?autoplay=1">
              </iframe>
              {isRunning && (
                <Badge color="success" pill className="position-absolute t-0 r-0 mr-2 mt-2 fs--2 z-index-2">
                  运行
                </Badge>
              )}
            </div>
          </Col>
          <Col sm={7} md={8}>
            <Row>
              <Col lg={8}>
                <h5 className="mt-3 mt-sm-0">
                  {title}
                </h5>
                <p className="fs--1 mb-2 mb-md-3">
                  <a className="text-500" href="#!">
                    {category}
                  </a>
                </p>
                {isIterableArray(features) && (
                  <ul className="list-unstyled d-none d-lg-block">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <FontAwesomeIcon icon="circle" transform="shrink-12" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
              <Col lg={4} tag={Flex} justify="between" column>
                <div>
                  <h4 className="fs-1 fs-md-2 text-warning mb-0">
                    {t('Instantaneous Efficiency VALUE UNIT', {'VALUE': parameter1, 'UNIT': '(kWh/kWh)'} )}
                  </h4>
                  <div className="d-none d-lg-block">
                    <p className="fs--1 mb-1">工作項目:<strong>{parameter2} 動作</strong></p>
                    <p className="fs--1 mb-1">起始時間(時):<strong>{parameter3} hour</strong></p>
                    <p className="fs--1 mb-1">起始時間(分):<strong>{parameter4} minute</strong></p>
                    <p className="fs--1 mb-1">結束時間(時):<strong>{parameter5} hour</strong></p>
                    <p className="fs--1 mb-1">結束時間(分):<strong>{parameter6} minute</strong></p>
                    <p className="fs--1 mb-1">功率:<strong>{parameter7} kW</strong></p>
                    <p className="fs--1 mb-1">
                      {t('Communication Status')}:{' '}
                      <strong className={classNames({ 'text-success': isOnline, 'text-danger': !isOnline })}>
                        {isOnline ? t('Communication Online') : t('Communication Offline')}
                      </strong>
                    </p>
                    <p className="fs--1 mb-1">
                      {t('Equipment Status')}:{' '}
                      <strong className={classNames({ 'text-success': isRunning, 'text-danger': !isRunning })}>
                        {isRunning ? t('Equipment Running') : t('Equipment Stopped')}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="mt-md-2">
                  <ButtonIcon
                    // color={isRunning ? 'outline-danger' : 'outline-secondary'}
                    color={isRunning ? 'outline-info' : 'outline-secondary'}
                    size="sm"
                    className={classNames('w-lg-100 mt-2 mr-2 mr-lg-0', {
                      'border-300': !isRunning
                    })}
                    icon={[isRunning ? 'fas' : 'far', 'exclamation-triangle']}
                    onClick={() =>
                      isRunning
                        ? favouriteItemsDispatch({ type: 'REMOVE', id })
                        : favouriteItemsDispatch({ type: 'ADD', payload: { id } })
                    }
                  >
                    {t('Fault Alarms')}({alarms.length})
                  </ButtonIcon>
                  {cartLoading ? (
                    <ButtonIcon
                      color="primary"
                      size="sm"
                      icon="circle-notch"
                      iconClassName="fa-spin ml-2 d-none d-md-inline-block"
                      className="w-lg-100 mt-2"
                      style={{ cursor: 'progress' }}
                      disabled
                    >
                      Processing
                    </ButtonIcon>
                  ) : (
                      <ButtonIcon
                        // color="primary"
                        color="warning"
                        size="sm"
                        icon="users"
                        iconClassName="ml-2 d-none d-md-inline-block"
                        className="w-lg-100 mt-2"
                        onClick={handleAddToCart}
                      >
                        {t('Run Commands')}
                      </ButtonIcon>
                    )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

EquipmentList.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  sliderSettings: PropTypes.object.isRequired,
  files: PropTypes.array,
  parameter1: PropTypes.number,
  parameter2: PropTypes.number,
  parameter3: PropTypes.number,
  parameter4: PropTypes.number,
  parameter5: PropTypes.number,
  parameter6: PropTypes.number,
  parameter7: PropTypes.number,
  cumulativePerformance: PropTypes.number,
  alarms: PropTypes.array,
  isOnline: PropTypes.bool,
  isRunning: PropTypes.bool,
  features: PropTypes.array
};

EquipmentList.defaultProps = { isRunning: false, isOnline: false, files: [] };

export default withTranslation()(EquipmentList);
