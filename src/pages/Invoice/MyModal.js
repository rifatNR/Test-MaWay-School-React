import React, { useRef, useState } from 'react'
import { Badge, Card, Col, Dropdown, ListGroup, Row, FloatingLabel, Form } from 'react-bootstrap'


const MyModal = (props) => {

    const [comment, setComment] = useState('')

    const fileInputRef = useRef(null)
    
    return (
        <div>
            {props.show &&(<div id="myModal" className="my_modal">
                <div className="my_modal-content">
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Details of Payment
                                <span onClick={() => props.setModalShow(!props.show)} className="my_modal-close">&times;</span>
                            </Card.Title>

                            <Card>
                                <input type="file" ref={fileInputRef} style={{display: 'none'}} />
                                <Card onClick={() => fileInputRef.current.click()} border="primary" className="p-3">
                                    Upload Image
                                </Card>
                                <FloatingLabel controlId="floatingTextarea2" label="Comments" className="">
                                    <Form.Control onChange={e => setComment(e.target.value)} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                                </FloatingLabel>
                            </Card>
                            
                        </Card.Body>
                    </Card>
                </div>
            </div>)}
        </div>
    )
}

export default MyModal
