import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import WARN_DATA from './WARN_DATA.json'
import { COLUMNS } from './WARN_COLUMNS'



function Reacttable() {
    const read_warn_content = useState([635,736])

    // console.log("this is 0")
    // console.log(read_warn_content[0])

    // console.log("this is 00")
    // console.log(read_warn_content[0][0])

    // console.log("this is 01")
    // console.log(read_warn_content[0][1])

    // console.log("this is 1")
    // console.log(read_warn_content[1])
    // const read_warn_content = [20]

    const columns = useMemo(() => COLUMNS, [COLUMNS])
    const data = useMemo(() => WARN_DATA, [WARN_DATA])
    // const data = useMemo(() => {
    //     return WARN_DATA.map((item, index) => {
    //         return{
    //             ...item,
    //             style: 
    //                 ((read_warn_content >> index) & 1) ? 
    //                 {backgroundColor: 'red'} : 
    //                 {backgroundColor: 'green'}
    //         }
    //     });
    // },[read_warn_content])
    
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
                            {row.cells.map((cell, cellIndex) => {
                                const isBitSet = (read_warn_content[0][cellIndex] >> rowIndex) & 1;
                                const color = isBitSet ? 'red' : 'green';

                                return(
                                    <td key={cellIndex} style={{ color }} {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>       
    )
}

export default Reacttable
