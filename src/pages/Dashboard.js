import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard Page 🚀🚀🚀🚀🚀🚀🚀🚀</h1>

            <Row xs={3} className="g-4 mb-4">
                <Col>
                    <Link to='/students'>
                        <Card border={'primary'}>
                            <Card.Body><Card.Title>Students</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Link to='/instructors'>
                        <Card border={'primary'}>
                            <Card.Body><Card.Title>Instructors</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Link to='/invoices'>
                        <Card border={'primary'}>
                            <Card.Body><Card.Title>Invoices</Card.Title></Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>

            <Link to='/lisences'>
                <Card bg={'primary'} text={'light'}>
                    <Card.Body><Card.Title>Purchase a Lisence</Card.Title></Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default Dashboard