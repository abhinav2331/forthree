import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Appmodal(props) {    
    //console.log(props);
    return (
        <div>
            <Modal className={props.className} isOpen={props.openModal}>
                <ModalHeader toggle={props.closeModal}>{props.modalHeader}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    {
                        (Object.keys(props.errors).length === 0) ? <Button type="submit" className="btn_submit dh_btn_normal" onClick={props.onSubmit}>{props.btnContent}</Button>
                            : <Button type="submit" disabled className="btn_submit dh_btn_normal" onClick={props.onSubmit}>{props.btnContent}</Button>
                       
                    }
                    {/*<Button type="submit" className="btn_submit dh_btn_normal" onClick={props.onSubmit}>{props.btnContent}</Button>*/}
                                   
                    
                </ModalFooter>
            </Modal>
        </div>
    );
}