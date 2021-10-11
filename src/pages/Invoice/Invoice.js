import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Badge, Card, Col, Dropdown, ListGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import MyModal from './MyModal';
import CancelModal from './CancelModal';

const Invoice = (props) => {

    const location = useLocation()
    const id = location.state.id
    
    const [invoice, setInvoice] = useState(null)
    const [curr_status_level, setStatusLevel] = useState(null)
    const [modal_show, setModalShow] = useState(false)
    const [modal_show2, setModalShow2] = useState(false)

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
                case 'paid1':
                    setStatusLevel(3)
                    break;
                case 'missing1':
                    setStatusLevel(4)
                    break;
                case 'paid2':
                    setStatusLevel(5)
                    break;
                case 'missing2':
                    setStatusLevel(6)
                    break;
                case 'accepted':
                    setStatusLevel(10)
                    break;
                default:
                    break;
            }
        }
    }, [invoice])

    return (
        <div className="mb-5">
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
                    <Card.Title>Invoice Status Tracker ({curr_status_level})</Card.Title>
                    <ListGroup as="ol">
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
                                Date: {(invoice && invoice.action_dates.paid1 !== 'X') && invoice.action_dates.paid1}
                            </div>
                            <Badge variant="primary" pill>School</Badge>
                        </ListGroup.Item>

                        {curr_status_level >= 4 && (<ListGroup.Item variant={curr_status_level >= 4 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Missing</div>
                                Date: {(invoice && invoice.action_dates.missing1 !== 'X') && invoice.action_dates.missing1}
                            </div>
                            <Badge variant="primary" pill>Admin</Badge>
                        </ListGroup.Item>)}

                        {curr_status_level >= 5 && (<ListGroup.Item variant={curr_status_level >= 5 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Paid</div>
                                Date: {(invoice && invoice.action_dates.paid2 !== 'X') && invoice.action_dates.paid2}
                            </div>
                            <Badge variant="primary" pill>School</Badge>
                        </ListGroup.Item>)}

                        {curr_status_level >= 6 && (<ListGroup.Item variant={curr_status_level >= 6 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Missing</div>
                                Date: {(invoice && invoice.action_dates.missing2 !== 'X') && invoice.action_dates.missing2}
                            </div>
                            <Badge variant="primary" pill>Admin</Badge>
                        </ListGroup.Item>)}

                        <ListGroup.Item variant={curr_status_level >= 10 && "primary"} as="li" className="d-flex justify-content-between align-items-start">
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
                <Card.Title className="mx-3 mt-2">Comment</Card.Title>

                {(invoice && invoice.invoice_attachments !== 'X') && invoice.invoice_attachments.map(i => <Card.Body key={i.id}>
                    <Card.Title>Payment Details:  <small className="text-secondary">{i.created_at_formated}</small></Card.Title>
                    {i.payment_details}
                    <br />
                    <img src={`http://localhost:8000/${i.attachment}`} alt="" width="200"/>
                    {i.reply && <Card.Title>Missing Payment message:  <small className="text-danger">{i.updated_at_formated}</small></Card.Title>}
                    {i.reply}
                </Card.Body>)}

                {(invoice && invoice.invoice_comment !== 'X') && <Card.Body>
                    <Card.Title>Admin:</Card.Title>
                    {invoice.invoice_comment}
                </Card.Body>}

                {(invoice && invoice.request_comment !== 'X') && <Card.Body>
                    <Card.Title>School:</Card.Title>
                    {invoice.request_comment}
                </Card.Body>}
            </Card>

            {(invoice && invoice.status === 'requested') && (<Button onClick={() => setModalShow2(!modal_show2)} variant="primary" size="lg">Cancel Purchase</Button>)}
            {(invoice && (invoice.status === 'created' || invoice.status === 'missing1')) && (<div className="col">
                <Button variant="light" size="lg">Cancel</Button>
                <Button onClick={() => setModalShow(!modal_show)} variant="primary" size="lg">Pay</Button>
            </div>)}
            {(invoice && (invoice.status === 'paid1' || invoice.status === 'paid2')) && (<Button variant="primary" size="lg">Remind Admin</Button>)}
            {(invoice && invoice.status === 'missing2') && (<h1>Please contact admin</h1>)}

            <MyModal show={modal_show} setModalShow={setModalShow} id={invoice && invoice.id}/>
            <CancelModal show={modal_show2} setModalShow2={setModalShow2} id={invoice && invoice.id}/>
            
        </div>
    )
}

export default Invoice
