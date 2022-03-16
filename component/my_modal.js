import {Button, Modal} from "antd";
import React from "react";

const DeleteModal = (props)=>{
    return(
        <Modal title={props.title} visible={props.show} onOk={props.confirm} onCancel={props.hide} cancelButtonProps={{}}>
            {`Apakah anda yakin akan menghapus data ini?`}
        </Modal>
    )
}

const EditConfirmationModal = ({title, show, confirm, hide}) => {
    return(
        <Modal title={`Konfirmasi Update Data ${title}`} visible={show} onOk={confirm} onCancel={hide} cancelButtonProps={{}}>
            {`Apakah anda yakin akan mengubah data ini?`}
        </Modal>
    )
}

module.exports = {
    DeleteModal,
    EditConfirmationModal
}
