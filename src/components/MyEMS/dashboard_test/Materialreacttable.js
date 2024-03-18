import React, { useMemo} from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import './Materialreacttable.css'


function Materialreacttable() {

    const data = [
        {
            name: {
                firstName: 'john',
                lastName: 'doe',
            },
            address: '261 erdman ford',
            city: 'east daphne',
            state: 'kentucky',
        },
        {
            name: {
                firstName: 'jane',
                lastName: 'doe',
            },
            address: '769 dominic grove',
            city: 'columbus',
            state: 'ohio',
        },
        {
            name: {
                firstName: 'joe',
                lastName: 'doe',
            },
            address: '566 brakus inlet',
            city: 'south linda',
            state: 'west virginia',
        },
        {
            name: {
                firstName: 'joe',
                lastName: 'doe',
            },
            address: '566 brakus inlet',
            city: 'south linda',
            state: 'west virginia',
        },
        {
            name: {
                firstName: 'joe',
                lastName: 'doe',
            },
            address: '566 brakus inlet',
            city: 'south linda',
            state: 'west virginia',
        },
        {
            name: {
                firstName: 'joe',
                lastName: 'doe',
            },
            address: '566 brakus inlet',
            city: 'south linda',
            state: 'west virginia',
        },
        {
            name: {
                firstName: 'kevin',
                lastName: 'vandy',
            },
            address: '722 emie stream',
            city: 'lincoln',
            state: 'nebraska',
        }
    ]

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName',
                header: 'first name',
                size: 150
            },
            {
                accessorKey: 'name.lastName',
                header: 'first name',
                size: 150
            },
            {
                accessorKey: 'address',
                header: 'address',
                size: 200
            },
            {
                accessorKey: 'city',
                header: 'city',
                size: 150
            },
            {
                accessorKey: 'state',
                header: 'state',
                size: 150
            }
        ],[]
    )

    const table = useMaterialReactTable({
        columns,
        data
    });

    const containerStylee = {
        width: 'auto',
        border: '1px solid #ccc',
        background: '#f2f2f2',
        padding: '10px',
    }


    return (
        <MaterialReactTable 
            table = {table} 
            style = {containerStylee}
            height = { 390 }
            className = 'custom-modal-overlayy'
        >
            {/* <div className='custom-modal-overlayy'></div> */}
        </MaterialReactTable>
    )
}

export default Materialreacttable
