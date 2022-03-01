import React, {useEffect, useState} from "react";
import {Card, Col, Input, Modal, Row, Select} from "antd";

const AjukanPinjamanModal = (props) => {
    const [jumlah, setJumlah] = useState(0)
    const [terbilang, setTerbilang] = useState('')
    const [masaPinjaman, setMasaPinjaman] = useState(0)
    const [keperluan, setKeperluan] = useState('')
    const [jaminan, setJaminan] = useState('')
    const onChangeJumlah = (e) => {
        setJumlah(e.target.value)
    }
    const onChangeTerbilang = (e) => {
        setTerbilang(e.target.value)
    }
    const onChangeMasa = (e) => {
        setMasaPinjaman(e)
    }
    const onChangeKeperluan = (e) => {
        setKeperluan(e.target.value)
    }
    const onChangeSJaminan = (e) => {
        setJaminan(e.target.value)
    }
    const submitData = () => {
        const data = {
            jumlah: parseInt(jumlah),
            terbilang: terbilang,
            masaPinjaman: masaPinjaman,
            keperluan: keperluan,
            jaminan: jaminan
        }
        console.log(data)
        props.submit(data)
        resetState()
    }
    const resetState = () => {
        setJumlah(0)
        setTerbilang('')
        setMasaPinjaman(0)
        setKeperluan('')
        setJaminan('')
    }
    return(
        <Modal width={600} destroyOnClose={true} visible={props.show} title={'Ajukan Pinjaman Baru'} okText={'Simpan'} onCancel={props.hide} onOk={submitData} cancelText={'Batal'}>
            <Row>
                <Row justify={"start"} align={'middle'} style={{width: '100%'}}>
                    <Col span={6}>
                        Jumlah
                    </Col>
                    <Col span={18}>
                        <Input onChange={onChangeJumlah} placeholder={'Jumlah'} type={'number'} style={{width: '100%'}}/>
                    </Col>

                </Row>
                <Row style={{marginTop: '20px', width: '100%'}} justify={"start"} align={'middle'}>
                    <Col span={6}>
                        Terbilang
                    </Col>
                    <Col span={18}>
                        <Input onChange={onChangeTerbilang} placeholder={'Terbilang'}  style={{width: '100%'}}/>
                    </Col>

                </Row>
                <Row style={{marginTop: '20px', width: '100%'}} justify={"start"} align={'middle'}>
                    <Col span={6}>
                        Masa Pinjaman
                    </Col>
                    <Col span={18}>
                        <Select onChange={onChangeMasa} placeholder={'Pilih Masa Pinjaman'} style={{width: '100%'}}>
                            <Select.Option value={3}>3 Bulan</Select.Option>
                            <Select.Option value={6}>6 Bulan</Select.Option>
                            <Select.Option value={8}>8 Bulan</Select.Option>
                            <Select.Option value={10}>10 Bulan</Select.Option>
                        </Select>
                    </Col>

                </Row>
                <Row style={{marginTop: '20px', width: '100%'}} justify={"start"} align={'middle'}>
                    <Col span={6}>
                        Keperluan
                    </Col>
                    <Col span={18}>
                        <Input onChange={onChangeKeperluan} placeholder={'Keperluan'}  style={{width: '100%'}}/>
                    </Col>

                </Row>
                <Row style={{marginTop: '20px', width: '100%'}} justify={"start"} align={'middle'}>
                    <Col span={6}>
                        Jaminan
                    </Col>
                    <Col span={18}>
                        <Input onChange={onChangeSJaminan} placeholder={'Jaminan'}  style={{width: '100%'}}/>
                    </Col>

                </Row>
            </Row>
        </Modal>
    )
}

export default AjukanPinjamanModal
