import React, {useState} from "react";
import {Card, Col, Input, Modal, Row} from "antd";

const TambahKategoriModal = ({show, hide, submit}) => {
    const [name, setName] = useState(0)
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    return(
        <Modal destroyOnClose={true} visible={show} title={'Tambah Kategori'} okText={'Simpan'} onCancel={hide} onOk={()=>{
            const data= {
                name: name
            }
            submit(data)
            setName(0)
        }} cancelText={'Batal'}>
            <Row>
                <Row justify={"start"} align={'middle'} style={{width: '100%'}}>
                    <Col span={6}>
                        Nama Kategori
                    </Col>
                    <Col span={18}>
                        <Input onChange={onChangeName}  placeholder={'Nama Kategori'} style={{width: '100%'}}/>
                    </Col>

                </Row>
            </Row>
        </Modal>
    )
}

export default TambahKategoriModal
