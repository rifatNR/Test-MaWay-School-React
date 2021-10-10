import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Tabs = (props) => {

    const [active, setActive] = useState(props.section)
    
    return (
        <div>
            <h1 className="text-center">Invoice</h1>
            
            <Row xs={3} className="g-4 mb-4">
                <Col>
                    <Link to='/invoices/admin'>
                        <Card onClick={() => setActive('admin')} border={active === 'admin' && 'warning'}>
                            <Card.Body><Card.Title>Admin</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Link to='/instructors'>
                        <Card onClick={() => setActive('student')} border={active === 'student' && 'warning'}>
                            <Card.Body><Card.Title>Student</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Link to='/invoices/admin'>
                        <Card onClick={() => setActive('instructor')} border={active === 'instructor' && 'warning'}>
                            <Card.Body><Card.Title>Instructor</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>

        </div>
    )
}

export default Tabs
