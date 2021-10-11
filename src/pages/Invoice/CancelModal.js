import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Badge, Card, Col, Dropdown, ListGroup, Row, FloatingLabel, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';


const CancelModal = (props) => {

    const [comment, setComment] = useState('')

    const cancel = async () => {
        const config = {headers: {'Content-Type': 'application/json','role': 'school'}}
        try {
            const data = {
                "id": props.id,
                "note": comment
            }
            const res = await axios.post('/common/invoice/cancel', data, config)
            console.log(res.data);
            if(res.data.success) {
                props.history.push('/dashboard')
            }
            props.setModalShow2(false)
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            {props.show &&(<div id="myModal" className="my_modal">
                <div className="my_modal-content">
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Cancellation Reason
                                <span onClick={() => props.setModalShow2(!props.show)} className="my_modal-close">&times;</span>
                            </Card.Title>

                            <Card className="mb-3">
                                <FloatingLabel controlId="floatingTextarea2" label="Comments" className="">
                                    <Form.Control onChange={e => setComment(e.target.value)} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                                </FloatingLabel>
                            </Card>

                            <Button onClick={cancel} variant="primary" size="lg">Submit</Button>
                            
                        </Card.Body>
                    </Card>
                </div>
            </div>)}
        </div>
    )
}

export default CancelModal
