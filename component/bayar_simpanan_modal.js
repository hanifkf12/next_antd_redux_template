import React, {useEffect, useState} from "react";
import {Card, Col, Input, Modal, Row} from "antd";

const BayarSimpananWajibModal = (props) => {
    const [jumlah, setJumlah] = useState(0)
    const onChangeJumlah = (e) => {
        setJumlah(e.target.value)
    }
    return(
        <Modal destroyOnClose={true} visible={props.show} title={'Bayar Simpanan Wajib'} okText={'Bayar'} onCancel={props.hide} onOk={()=>{
            const data= {
                jumlah: jumlah? parseInt(jumlah) : props.data.jumlah
            }
            props.submit(data)
            setJumlah(0)
        }} cancelText={'Batal'}>
            <Row>
                <Row justify={"start"} align={'middle'} style={{width: '100%'}}>
                    <Col span={6}>
                        Jumlah
                    </Col>
                    <Col span={12}>
                        <Input onChange={onChangeJumlah} defaultValue={props.data.jumlah} placeholder={'Jumlah'} type={'number'} style={{width: '100%'}}/>
                    </Col>

                </Row>
                <Row style={{marginTop: '20px', width: '100%'}} justify={"start"} align={'middle'}>
                    <Col span={6}>
                        Bulan
                    </Col>
                    <Col span={12}>
                        <Input placeholder={'Bulan'} defaultValue={props.data.bulan} disabled={true}  style={{width: '100%'}}/>
                    </Col>

                </Row>
            </Row>
        </Modal>
    )
}

export default BayarSimpananWajibModal
