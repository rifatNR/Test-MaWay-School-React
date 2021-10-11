import React, { useEffect, useState } from 'react'
import { Card, Col, Dropdown, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const InvoiceList = () => {

    const [active, setActive] = useState('admin')
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('history')
    
    useEffect(() => {
        
        const getInvoiceLists = async () => {
            const config = {headers: {'Content-Type': 'application/json','role': 'school'}}
            try {
                const data = {
                    "invoice_type": `${active}`,
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

        getInvoiceLists();
        
    }, [filter, active])
    
    return (
        <div>
            <h1 className="text-center">Invoice</h1>
        
            <Row xs={3} className="g-4 mb-4">
                <Col>
                    <Card onClick={() => setActive('admin')} border={active === 'admin' && 'warning'}>
                        <Card.Body><Card.Title>Admin</Card.Title></Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card onClick={() => setActive('student')} border={active === 'student' && 'warning'}>
                        <Card.Body><Card.Title>Student</Card.Title></Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card onClick={() => setActive('instructor')} border={active === 'instructor' && 'warning'}>
                        <Card.Body><Card.Title>Instructor</Card.Title></Card.Body>
                    </Card>
                </Col>
            </Row>

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
                <Link to={{ pathname: '/invoice', state: { id: item.id} }}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                {item.lisence_title}
                                <br/><small>{item.invoice_created_at}</small>
                            </Col>
                            <Col xs="3" lg="2">
                                DKK {item.price}
                                <br/><small>{item.status}</small>
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Body>
                </Link>
            </Card>)}
        </div>
    )
}

export default InvoiceList
