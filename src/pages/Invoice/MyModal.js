import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Badge, Card, Col, Dropdown, ListGroup, Row, FloatingLabel, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';


const MyModal = (props) => {

    const [comment, setComment] = useState('')
    const [image, setImage] = useState(null)

    const fileInputRef = useRef(null)

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];

            let img64 = ''
            getBase64(img, (result) => {
                img64 = result;
                console.log(img64);
                setImage(img64)
            });
            
            // setImage(URL.createObjectURL(img))
        }
        console.log(image);
    }

    const pay = async () => {
        const config = {headers: {'Content-Type': 'application/json','role': 'school'}}
        try {
            const data = {
                "id": props.id,
                "payment_type": "manual",
                "payment_details": comment,
                "attachment": image
            }
            const res = await axios.post('/common/invoice/pay', data, config)
            console.log(res.data);
            if(res.data.success) {
                props.history.push('/dashboard')
            }
            props.setModalShow(false)
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
                                Details of Payment
                                <span onClick={() => props.setModalShow(!props.show)} className="my_modal-close">&times;</span>
                            </Card.Title>

                            <Card>
                                <input type="file" ref={fileInputRef} onChange={onImageChange} style={{display: 'none'}} />
                                <Card onClick={() => fileInputRef.current.click()} border="primary" className="p-3">
                                    Upload Image
                                </Card>
                                <FloatingLabel controlId="floatingTextarea2" label="Comments" className="">
                                    <Form.Control onChange={e => setComment(e.target.value)} as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                                </FloatingLabel>
                            </Card>

                            <Button onClick={pay} variant="primary" size="lg">Submit</Button>
                            
                        </Card.Body>
                    </Card>
                </div>
            </div>)}
        </div>
    )
}

export default MyModal
