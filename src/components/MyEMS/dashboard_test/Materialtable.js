import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// import Column from 'antd/es/table/Column';


function Materialtable() {

    const data = useMemo( () => [
        { 'name': 'john doe', 'age':25, 'city': 'new york' },
        { 'name': 'jane smith', 'age':30, 'city': 'san francisco' },
        { 'name': 'bob johnson', 'age':22, 'city': 'chicago' }
    ],[]);

    const columns = useMemo(
        () => [
            { Header: 'name', accessor: 'name' },
            { Header: 'age', accessor: 'age' },
            { Header: 'city', accessor: 'city' }
        ],[]
    );

    // 他這邊的 難處就在於 要先呼叫usetable  才可
    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps() }>
                <TableHead>
                {
                    headerGroups.map( (headerGroup, index) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                        {
                            headerGroup.headers.map( (column, columnIndex) => (
                                <TableCell key={columnIndex} {...column.getHeaderProps()}>{
                                    column.render('Header')
                                }</TableCell>
                            ) )
                        }
                        </TableRow>
                    ))    
                }
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                {
                    rows.map( (row, rowIndex) => {
                        prepareRow(row);
                        return(
                            <TableRow key={rowIndex} {...row.getRowProps()}>
                            {
                                row.cells.map( (cell, cellIndex) => (
                                    <TableCell key={cellIndex} {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                ))
                            }
                            </TableRow>
                        )
                    })
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Materialtable
