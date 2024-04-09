import React from 'react'
import { Card, Table } from "tabler-react";

function Tabler_react () {

    const columns = [
        { name: 'ID', field: 'id' },
        { name: 'Name', field: 'name' },
        { name: 'Age', field: 'age' },
    ];

    const data = [
        { id: 1, name: 'User1 jeffrey', age: 18 },
        { id: 2, name: 'User2 shian', age: 18 },
        { id: 3, name: 'User3 joseph', age: 18 }
    ]

  
    return (
        // <div>
        
        // </div>
        <Card>
            <Table responsive>
                <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                    <Table.ColHeader key={column.name}>{column.name}</Table.ColHeader>
                    ))}
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {data.map((row, index) => (
                    <Table.Row key={index}>
                    {columns.map((column) => (
                        <Table.Col key={column.name}>{row[column.field]}</Table.Col>
                    ))}
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        </Card>
    )
}

export default Tabler_react
