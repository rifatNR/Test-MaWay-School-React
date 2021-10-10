import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Badge, Card, Col, Dropdown, ListGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import MyModal from './MyModal';

const Invoice = (props) => {

    const location = useLocation()
    const id = location.state.id
    
    const [invoice, setInvoice] = useState(null)
    const [curr_status_level, setStatusLevel] = useState(0)
    const [modal_show, setModalShow] = useState(true)

    const [payment_details, setPaymentDetails] = useState('')
    const [attachment, setAttachment] = useState(null)

    useEffect(() => {
        
        const getInvoice = async () => {
            const config = {headers: {'Content-Type': 'application/json','role': 'school'}}
            try {
                const data = {
                    "id": id
                }
                const res = await axios.post('/common/invoice/get-lisence-invoice', data, config)
                console.log(res.data);
                setInvoice(res.data.data)
            } catch(err) {
                console.log(err);
            }
        }

        getInvoice();
        
    }, [])

    useEffect(() => {
        if(invoice) {
            switch (invoice.status) {
                case 'requested':
                    setStatusLevel(1)
                    break;
                case 'created':
                    setStatusLevel(2)
                    break;
                case 'paid':
                    setStatusLevel(3)
                    break;
                case 'accepted':
                case 'rejected':
                case 'missing':
                    setStatusLevel(4)
                    break;
                default:
                    break;
            }
        }
    }, [])

    const pay = async () => {
        const config = {headers: {'Content-Type': 'application/json','role': 'school'}}
        try {
            const data = {
                "id": invoice.id,
                "payment_type": "manual",
                "payment_details": payment_details,
                "attachment": attachment
            }
            const res = await axios.post('/common/invoice/get-lisence-invoice', data, config)
            console.log(res.data);
            setInvoice(res.data.data)
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            <h4 className="text-center" >Invoice ID: {invoice && invoice.invoice_id}</h4>


            <Card className="mb-5" >
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex justify-content-between align-items-center border-bottom mb-2">
                            <div>
                                <div>{invoice && invoice.lisence_title}</div>
                                <br/>
                                <small>Validity: {invoice && invoice.duration}</small>
                            </div>
                            <div>
                                DKK {invoice && invoice.price}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom my-2">
                            <div>MOMS: </div>
                            <div>DKK {invoice && invoice.moms}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom my-2">
                            <div>Total: </div>
                            <div>DKK {invoice && (invoice.price + invoice.moms)}</div>
                        </div>
                    </Card.Title>
                </Card.Body>
            </Card>

            <Card className="mb-2" >
                <Card.Body>
                    <Card.Title>Invoice Status Tracker</Card.Title>
                    <ListGroup as="ol" numbered>

                        <ListGroup.Item variant={curr_status_level >= 1 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Requested</div>
                                Date: {(invoice && invoice.action_dates.requested !== 'X') && invoice.action_dates.requested}
                            </div>
                            <Badge variant="primary" pill>School</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item variant={curr_status_level >= 2 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Created</div>
                                Date: {(invoice && invoice.action_dates.created !== 'X') && invoice.action_dates.created}
                            </div>
                            <Badge variant="primary" pill>Admin</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item variant={curr_status_level >= 3 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Paid</div>
                                Date: {(invoice && invoice.action_dates.paid !== 'X') && invoice.action_dates.paid}
                            </div>
                            <Badge variant="primary" pill>School</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item variant={curr_status_level >= 4 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Accepted</div>
                                Date: {(invoice && invoice.action_dates.accepted !== 'X') && invoice.action_dates.accepted}
                            </div>
                            <Badge variant="primary" pill>Admin</Badge>
                        </ListGroup.Item>
                        
                    </ListGroup>
                    
                </Card.Body>
            </Card>

            <Card className="mb-5" >
                <Card.Body>
                    <Card.Title>Comment</Card.Title>
                    {invoice && invoice.request_comment}
                </Card.Body>
            </Card>

            {(invoice && invoice.status === 'requested') && (<Button variant="primary" size="lg">Cancel Purchase</Button>)}
            {(invoice && invoice.status === 'created') && (<div className="col">
                <Button variant="light" size="lg">Cancel</Button>
                <Button onClick={() => setModalShow(!modal_show)} variant="primary" size="lg">Pay</Button>
            </div>)}

            <MyModal show={modal_show} setModalShow={setModalShow}/>
            
        </div>
    )
}

export default Invoice
