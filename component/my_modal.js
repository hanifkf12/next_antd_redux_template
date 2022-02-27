import {Button, Modal} from "antd";
import React from "react";

const DeleteModal = (props)=>{
    return(
        <Modal title={props.title} visible={props.show} onOk={props.confirm} onCancel={props.hide} cancelButtonProps={{}}>
            {`Apakah anda yakin akan menghapus data ini?`}
        </Modal>
    )
}

module.exports = {
    DeleteModal
}
