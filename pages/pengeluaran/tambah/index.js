import React, {useEffect, useState} from "react";
import LayoutKu from "../../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select} from "antd";
import 'moment/locale/id'
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {pengeluaranDispatch} from "../../../redux/pengeluaran_redux";
import {connect} from "react-redux";

const TambahPengeluaran = (props) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [uraian, setUraian] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [keterangan, setKeterangan] = useState('')
    const [tanggal, setTanggal] = useState('')

    const onChangeUraian = (e) => {
        setUraian(e.target.value)
    }
    const onChangeJumlah = (e) => {
        setJumlah(parseInt(e.target.value))
    }
    const onChangeKeterangan = (e) => {
        setKeterangan(e.target.value)
    }
    const onChangeTanggal = (e, t) => {
        setTanggal(e.format('LL'))
    }
    const submit = () => {
        const data = {
            uraian: uraian,
            jumlah: jumlah,
            keterangan: keterangan,
            tanggal: tanggal,
            tahun: tanggal.split(' ')[2],
            bulan: tanggal.split(' ')[1]
        }
        console.log(data)
        props.savePengluaran({
            token: session.token,
            data: data
        })
    }
    useEffect(()=>{
        if(props.status){
            router.push('/pengeluaran')
        }
    }, [props.status])
    return(
        <>
            <Card title='Tambah Data Pengeluaran'>
                <Row justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Uraian
                    </Col>
                    <Col span={16}>
                        <Input onChange={onChangeUraian} placeholder={'Uraian'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Jumlah
                    </Col>
                    <Col span={16}>
                        <Input onChange={onChangeJumlah} type={'number'}  placeholder={'Jumlah'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Keterangan
                    </Col>
                    <Col span={16}>
                        <Input.TextArea onChange={onChangeKeterangan} placeholder={'Keterangan'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Tanggal
                    </Col>
                    <Col span={16}>
                        <DatePicker onChange={onChangeTanggal} placeholder={'Tanggal'} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>

                    </Col>
                    <Col span={16}>
                        <Button type='primary' onClick={submit}>Submit</Button>
                    </Col>
                </Row>

            </Card>

        </>
    )
}
TambahPengeluaran.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
const mapStateToProps = (state) => {
    return{
        loading: state.pengeluaran.loading,
        status: state.pengeluaran.status,
    }
}
TambahPengeluaran.auth = true
export default connect(mapStateToProps, pengeluaranDispatch)(TambahPengeluaran)
