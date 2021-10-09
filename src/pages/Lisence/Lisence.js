/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Lisence = (props) => {

    const [existing_lisence, setExistingLisence] = useState(null)
    const [selected_lisence, setSelectedLisence] = useState(null)
    const [selected_lisence_details, setSelectedLisenceDetails] = useState(null)
    const [lisences, setLisences] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {

        const getLisences = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'role': 'school'
                }
            }

            try {
                const res = await axios.post('/common/lisence/get-lisences', '', config)

                console.log(res.data);
                if(res.data.success) {
                    setLisences(res.data.data.lisences)
                    setSelectedLisence(res.data.data.lisences[0].id)
                    setSelectedLisenceDetails(res.data.data.lisences[0].details)
                    setExistingLisence(res.data.data.user_lisence)
                    
                    if(res.data.data.user_lisence) {
                        setSelectedLisence(res.data.data.user_lisence.lisence_id)
                        setSelectedLisenceDetails(prev => res.data.data.user_lisence.details)
                        setComment(res.data.data.user_lisence.comment)
                    }

                    console.log(existing_lisence, "existing_lisence");
                    console.log(selected_lisence, "selected_lisence");
                    console.log(selected_lisence_details, "selected_lisence_details");
                }
            } catch(err) {
                console.log(err);
            }
        }

        getLisences();
        
    }, [])

    const submitRequest = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'role': 'school'
            }
        }

        const data = {
            "lisence_id": selected_lisence,
            "comment": comment
        }
        
        try {
            const res = await axios.post('/common/purchase-lisence/add', data, config)
            console.log(res.data);
            if(res.data.success) {
                props.history.push('/dashboard')
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            <h1 className="text-center">Lisences</h1>

            <Row xs={3} className="g-4 mb-4">
            {lisences.map((item) => (
                <Col key={item.id} onClick={() => {setSelectedLisence(item.id); setSelectedLisenceDetails(item.details)}}>
                    <Card border={item.id == selected_lisence && 'primary'}>
                        <Card.Body><Card.Title>{item.title}</Card.Title></Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>

            <Card className="mb-4">
                <Card.Body>
                    {selected_lisence_details}
                </Card.Body>
            </Card>

            {
                existing_lisence ? (
                    <Card className="mb-4">
                        <Card.Body>
                            {existing_lisence.comment}
                        </Card.Body>
                    </Card>
                ) : (
                    <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-4">
                        <Form.Control onChange={e => setComment(e.target.value)} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                    </FloatingLabel>
                )
            }
            
            {
                existing_lisence ? (
                    <Link to="/invoice">Go to invoice</Link>
                ) : (
                    <Button onClick={submitRequest} as={Col} variant="primary">Submit Request</Button>
                )
            }
        </div>
    )
}

export default Lisence
