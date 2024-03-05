import React, { createRef, Fragment, useEffect, useState } from 'react'
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
  import Badge from 'reactstrap/es/Badge';
  import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
  import BootstrapTable from 'react-bootstrap-table-next';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { getPaginationArray } from '../../../helpers/utils';
  import { withTranslation } from 'react-i18next';
  import withRedirect from '../../../hoc/withRedirect';

function ShowTable() {
    const options = {
        custom: true,
        sizePerPage: 10,
        totalSize: faults.length
    };

    let table = createRef();


    const onSelect = () => {
        setImmediate(() => {
          setIsSelected(!!table.current.selectionContext.selected.length);
        });
      };


    // const [faults, setFaults] = useState([]);
    const faults = [
        {"idmyems_test":1,"subject":"主題一","created_datetime":"20240225","message":"cov"},
        {"idmyems_test":2,"subject":"主題二","created_datetime":"20240226","message":"cuv"},
        {"idmyems_test":3,"subject":"主題三","created_datetime":"20240227","message":"ocv"},
        {"idmyems_test":4,"subject":"主題四","created_datetime":"20240227","message":"ccv"},
        {"idmyems_test":5,"subject":"主題五","created_datetime":"20240227","message":"cbv"},
        {"idmyems_test":6,"subject":"主題六","created_datetime":"20240227","message":"cdv"},
        {"idmyems_test":7,"subject":"主題七","created_datetime":"20240227","message":"euv"},
        {"idmyems_test":8,"subject":"主題八","created_datetime":"20240227","message":"otd"},
        {"idmyems_test":9,"subject":"主題九","created_datetime":"20240227","message":"utc"},
        {"idmyems_test":10,"subject":"主題十","created_datetime":"20240227","message":"utd"},
        {"idmyems_test":11,"subject":"主題十一","created_datetime":"20240227","message":"flooded"},
        {"idmyems_test":12,"subject":"主題十二","created_datetime":"20240227","message":"smoke"}
    ]

    const [isSelected, setIsSelected] = useState(false);


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
            text = ('Notification Acknowledged');
            break;
            case 'read':
            color = 'success';
            icon = 'envelope-open';
            text = ('Notification Read');
            break;
            default:
            color = 'primary';
            icon = 'envelope';
            text = ('Notification Unread');
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
            {/* <DropdownItem onClick={() => handleRead(id)}>{t('Notification Mark As Read')}</DropdownItem>
            <DropdownItem onClick={() => handleAcknowledged(id)}>{t('Notification Mark As Acknowledged')}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => handledelete(id)} className="text-danger">{t('Notification Delete')}</DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      );


    const columns = [
        {
          dataField: 'subject',
          text: ('Notification Subject'),
          classes: 'py-2 align-middle',
          formatter: subjectFormatter,
          sort: true
        },
        {
          dataField: 'created_datetime',
          text: ('Notification Created Datetime'),
          classes: 'py-2 align-middle',
          sort: true
        },
        {
          dataField: 'message',
          text: ('Notification Message'),
          classes: 'py-2 align-middle',
          formatter: messageFormatter,
          sort: true
        },
        {
          dataField: 'status',
          text: ('Notification Status'),
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
   
    const selectRow = onSelect => ({
        mode: 'checkbox',
        classes: 'py-2 align-middle',
        clickToSelect: false,
        selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
        selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
        onSelect: onSelect,
        onSelectAll: onSelect
    });

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
    

    const handlePrevPage = ({ page, onPageChange }) => () => {
        onPageChange(page - 1);
    };

    const handleNextPage = ({ page, onPageChange }) => () => {
        onPageChange(page + 1);
    };
    
    // const handle_test = () => {
    //     axios.get("http://localhost:3088/get_myems_warn").then((response) => {
    //       //setScheduleList(response.data);
    //       setFaults(response.data);
    //     });
    //   }

    return (
        <Card className="mb-3">
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
                                    bordered={false}
                                    classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                                    rowClasses="btn-reveal-trigger"
                                    headerClasses="bg-200 text-900"
                                    {...paginationTableProps}
                                />
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
        
        
    )
}

// export default withTranslation()(withRedirect(ShowTable))
export default ShowTable
