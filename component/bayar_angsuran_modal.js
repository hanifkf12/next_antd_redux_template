import React, {useState} from "react";
import {Card, Col, Input, Modal, Row} from "antd";

const BayarAngsuranModal = (props) => {
    const [jumlah, setJumlah] = useState(0)
    const onChangeJumlah = (e) => {
        setJumlah(e.target.value)
    }
    return(
        <Modal destroyOnClose={true} visible={props.show} title={'Bayar Ansuran'} okText={'Bayar'} onCancel={props.hide} onOk={()=>{
            const data= {
                jumlah: jumlah? parseInt(jumlah) : (props.data.angsuran_pokok + props.data.bunga_per_bulan)
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
                        <Input onChange={onChangeJumlah} defaultValue={props.data.angsuran_pokok + props.data.bunga_per_bulan} placeholder={'Jumlah'} type={'number'} style={{width: '100%'}}/>
                    </Col>

                </Row>
            </Row>
        </Modal>
    )
}

export default BayarAngsuranModal
