import React, {useEffect, useState} from "react";
import LayoutKu from "../../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select, Spin} from "antd";
import 'moment/locale/id'
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {pengeluaranDispatch} from "../../../redux/pengeluaran_redux";
import {connect} from "react-redux";
import moment from "moment";
import {EditConfirmationModal} from '../../../component/my_modal'

const EditPengeluaran = (props) => {
    const router = useRouter()
    const {id} = router.query;
    const { data: session } = useSession()
    const [uraian, setUraian] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [keterangan, setKeterangan] = useState('')
    const [tanggal, setTanggal] = useState('')
    const [confirmationVisibility, setConfirmationVisibility] = useState(false)

    const showConfirmation = () => {
        setConfirmationVisibility(true)
    }
    const hideConfirmation = () => {
        setConfirmationVisibility(false)
    }
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
            uraian: uraian? uraian : props.dataPengeluaran.uraian,
            jumlah: jumlah? jumlah : props.dataPengeluaran.jumlah,
            keterangan: keterangan? keterangan : props.dataPengeluaran.keterangan,
            tanggal: tanggal? tanggal : moment(props.dataPengeluaran.tanggal).format('LL'),
            tahun: tanggal? tanggal.split(' ')[2] : props.dataPengeluaran.tahun,
            bulan: tanggal? tanggal.split(' ')[1] : props.dataPengeluaran.bulan
        }
        console.log(data)
        props.updatePengeluaran({
            token: session.token,
            id: id,
            data: data
        })
        hideConfirmation()
    }
    useEffect(()=>{
        props.pengeluaranById({
            id: id,
            token: session.token
        })
    },[])
    useEffect(()=>{
        if(props.status){
            router.replace('/pengeluaran')
        }
    }, [props.status])
    return(
        <>
            <EditConfirmationModal show={confirmationVisibility} hide={hideConfirmation} title={'Pengeluaran'} confirm={submit}/>
            <Card title='Edit Data Pengeluaran'>
                {props.loading? (
                    <Row justify={'center'} align={'middle'}>
                        <Col>
                            <Spin tip={'Loading...'} size="small" />
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Uraian
                            </Col>
                            <Col span={16}>
                                <Input onChange={onChangeUraian} defaultValue={props.dataPengeluaran.uraian} placeholder={'Uraian'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Jumlah
                            </Col>
                            <Col span={16}>
                                <Input onChange={onChangeJumlah} defaultValue={props.dataPengeluaran.jumlah} type={'number'}  placeholder={'Jumlah'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Keterangan
                            </Col>
                            <Col span={16}>
                                <Input.TextArea onChange={onChangeKeterangan} defaultValue={props.dataPengeluaran.keterangan} placeholder={'Keterangan'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Tanggal
                            </Col>
                            <Col span={16}>
                                <DatePicker onChange={onChangeTanggal} defaultValue={moment(props.dataPengeluaran.tanggal)} placeholder={'Tanggal'} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>

                            </Col>
                            <Col span={16}>
                                <Button type='primary' onClick={showConfirmation}>Submit</Button>
                            </Col>
                        </Row>
                    </>
                )}

            </Card>

        </>
    )
}
EditPengeluaran.getLayout = function getLayout(page) {
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
        dataPengeluaran: state.pengeluaran.dataPengeluaran
    }
}
EditPengeluaran.auth = true
export default connect(mapStateToProps, pengeluaranDispatch)(EditPengeluaran)
