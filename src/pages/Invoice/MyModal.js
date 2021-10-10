import React from 'react'

const MyModal = (props) => {
    return (
        <div>
            {props.show &&(<div id="myModal" className="my_modal">
                <div className="my_modal-content">
                    <span onClick={() => props.setModalShow(!props.show)} className="my_modal-close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>)}
        </div>
    )
}

export default MyModal
