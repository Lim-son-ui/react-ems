import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns.js'
import './table.css'

export default function BarChartExample() {
    const columns = useMemo(() => COLUMNS, [COLUMNS])
    const data = useMemo(() => MOCK_DATA, [MOCK_DATA])
    
    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance
  
    return (
        <table {...getTableProps()} className="table-with-spacing">
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, columnIndex) => (
                        <th key={columnIndex} {...column.getHeaderProps()}>
                        {column.render('Header')}
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()} key={rowIndex}>
                        {row.cells.map((cell, cellIndex) => (
                        <td key={cellIndex} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        ))}
                    </tr>
                    );
                })}
            </tbody>
        </table>       
    )
}