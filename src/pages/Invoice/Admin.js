import React, { useEffect, useState } from 'react'
import Tabs from './Tabs'
import { Card, Col, Dropdown, Row } from 'react-bootstrap'
import axios from 'axios'

const Admin = () => {

    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('history')
    
    useEffect(() => {
        
        const getInvoice = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'role': 'school'
                }
            }

            try {
                const data = {
                    "invoice_type": "admin",
                    "filter_type": `${filter}`
                }
                const res = await axios.post('/common/invoice/index', data, config)

                console.log(res.data);
                if(res.data.success) {
                    setItems(res.data.data)
                }
            } catch(err) {
                console.log(err);
            }
        }

        getInvoice();
        
    }, [filter])
    
    return (
        <div>
            <Tabs section="admin" />

            <div className="mb-4 text-right w-100">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {filter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={e => setFilter('history')}>History</Dropdown.Item>
                        <Dropdown.Item onClick={e => setFilter('pending')}>Pending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            { items.map(item => <Card key={item.id} className="mb-2" >
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                {item.lisence_title}
                                <br/><small>{item.invoice_created_at}</small>
                            </Col>
                            <Col xs lg="2">
                                DKK {item.price}
                                <br/><small>{item.status}</small>
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Body>
            </Card>)}
        </div>
    )
}

export default Admin
