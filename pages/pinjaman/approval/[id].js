import React, {useEffect, useState} from "react";
import LayoutKu from "../../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select, Spin} from "antd";
import {pinjamanDispatch} from "../../../redux/pinjaman_redux";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import moment from "moment";
import 'moment/locale/id'
import {nominalToWord} from "../../../utils/rupiahFormat";

const ApprovalPinjamanDetail = (props) => {
    const router = useRouter()
    const {data: session} = useSession()
    const {id} = router.query
    const [jumlahDisetujui, setJumlahDisetujui] = useState(props.pinjamanData.jumlah_diajukan)
    const [disetujuiTerbilang, setDisetujuiTerbilang] = useState('')
    const [admin, setAdmin] = useState(0)
    const [jumlahAdmin, setJumlahAdmin] = useState(0.0)
    const [bunga, setBunga] = useState(0)
    const [jumlahBunga, setJumlahBunga] = useState(0)
    const [bungaPerBulan, setBungaPerBulan] = useState(0)
    const [angsuranPokok, setAngsuranPokok] = useState(parseFloat((props.pinjamanData.jumlah_diajukan / props.pinjamanData.masa_pinjaman).toFixed(0)))
    const [angsuranPokokTerbilang, setAngsuranPokokTerbilang] = useState('')
    const onChangeJumlah = (e) => {
        const jumlah = parseFloat(e.target.value)
        const angsuranPokok2 = parseFloat((jumlah / props.pinjamanData.masa_pinjaman).toFixed(0))
        setJumlahDisetujui(jumlah)
        setAngsuranPokok(angsuranPokok2)
        console.log(jumlah)
        console.log(angsuranPokok2)
    }
    const onChangeAdmin = (e) => {
        setAdmin(e)
        const administrasi = parseFloat((jumlahDisetujui * (e / 100)).toFixed(0))
        setJumlahAdmin(administrasi)
        console.log(administrasi)
    }
    const onChangeBunga = (e) => {
        setBunga(e)
        const jumlahBunga = parseFloat((jumlahDisetujui * (e / 100)).toFixed(0))
        const bungaPerBulan = parseFloat((jumlahBunga / props.pinjamanData.masa_pinjaman).toFixed(0))
        setJumlahBunga(jumlahBunga)
        setBungaPerBulan(bungaPerBulan)
        console.log(jumlahBunga, 'total bunga')
        console.log(bungaPerBulan, 'bunga/bulan')
    }
    const onChangeAngsuranPokokTerbilang = (e) => {
        setAngsuranPokokTerbilang(e.target.value)
    }
    const onChangeDisetujuiTerbilang = (e) => {
        setDisetujuiTerbilang(e.target.value)
    }
    const submit = () => {
        const currentDate = new Date()
        const diterimaDate = moment(currentDate).format('YYYY-MM-DD')
        const startDate = moment(currentDate).add(1, 'months').format('YYYY-MM-DD')
        console.log(startDate)
        const endDate = moment(startDate).add(props.pinjamanData.masa_pinjaman, 'months').format('YYYY-MM-DD')
        console.log(endDate)
        const data = {
            jumlah_disetujui: jumlahDisetujui,
            jumlah_disetujui_terbilang: nominalToWord(jumlahDisetujui),
            administrasi: admin,
            biaya_administrasi: jumlahAdmin,
            bunga: bunga,
            jumlah_bunga: jumlahBunga,
            jumlah_adm_bunga: jumlahBunga + jumlahAdmin,
            angsuran_pokok: angsuranPokok,
            bunga_per_bulan: bungaPerBulan,
            status_pengajuan: "disetujui",
            diterima_tanggal: diterimaDate,
            angsuran_pertama: startDate,
            angsuran_terakhir: endDate,
            angsuran_pokok_terbilang: nominalToWord(angsuranPokok + bungaPerBulan),
            tahun: new Date().getFullYear().toString()
        }
        console.log(data)

        props.approvePinjaman({
            token: session.token,
            data: data,
            id: id
        })
    }

    useEffect(() => {
        props.pinjamanById({
            id: id,
            token: session.token
        })
    }, [])
    useEffect(() => {
        if (props.status) {
            router.replace('/pinjaman/approval/daftar')
        }
    }, [props.status])
    return (
        <>
            <Card title={'Review Pengajuan Pinjaman'}>
                {props.loading ? (
                    <Row justify={'center'} align={'middle'}>
                        <Col>
                            <Spin tip={'Loading...'} size="small"/>
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Nama Anggota
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} defaultValue={props.pinjamanData.user.name}
                                       placeholder={'Jumlah'} style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Jumlah Diajukan
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} defaultValue={props.pinjamanData.jumlah_diajukan}
                                       placeholder={'Jumlah'} type={'number'} style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        {/*<Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>*/}
                        {/*    <Col span={3}>*/}
                        {/*        Diajukan Terbilang*/}
                        {/*    </Col>*/}
                        {/*    <Col span={8}>*/}
                        {/*        <Input disabled={true} defaultValue={props.pinjamanData.jumlah_diajukan_terbilang}*/}
                        {/*               placeholder={'Terbilang'} style={{width: '100%'}}/>*/}
                        {/*    </Col>*/}

                        {/*</Row>*/}
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Masa Pinjaman
                            </Col>
                            <Col span={8}>
                                <Input defaultValue={`${props.pinjamanData.masa_pinjaman} Bulan`} disabled={true}
                                       placeholder={'Terbilang'} style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Jumlah Disetujui
                            </Col>
                            <Col span={8}>
                                <Input onChange={onChangeJumlah} placeholder={'Jumlah Disetujui'} defaultValue={props.pinjamanData.jumlah_diajukan} type={'number'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        {/*<Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>*/}
                        {/*    <Col span={3}>*/}
                        {/*        Disetujui Terbilang*/}
                        {/*    </Col>*/}
                        {/*    <Col span={8}>*/}
                        {/*        <Input onChange={onChangeDisetujuiTerbilang} placeholder={'Terbilang'} style={{width: '100%'}}/>*/}
                        {/*    </Col>*/}

                        {/*</Row>*/}
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Administrasi
                            </Col>
                            <Col span={8}>
                                <Select onChange={onChangeAdmin} placeholder={'Administrasi'} style={{width: '100%'}}>
                                    <Select.Option value={2}>2%</Select.Option>
                                    <Select.Option value={4}>4%</Select.Option>
                                </Select>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Biaya Administrasi
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} value={jumlahAdmin} placeholder={'Terbilang'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Bunga
                            </Col>
                            <Col span={8}>
                                <Select onChange={onChangeBunga} placeholder={'Bunga'} style={{width: '100%'}}>
                                    <Select.Option value={4}>4%</Select.Option>
                                    <Select.Option value={10}>10%</Select.Option>
                                </Select>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Total Bunga
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} value={jumlahBunga} placeholder={'Terbilang'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Bunga Per Bulan
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} value={bungaPerBulan} placeholder={'Terbilang'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Angsuran Pokok
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} value={angsuranPokok} placeholder={'Terbilang'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Angsuran Per Bulan
                            </Col>
                            <Col span={8}>
                                <Input disabled={true} value={angsuranPokok + bungaPerBulan} placeholder={'Terbilang'}
                                       style={{width: '100%'}}/>
                            </Col>

                        </Row>
                        {/*<Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>*/}
                        {/*    <Col span={3}>*/}
                        {/*        Angsuran Per Bulan Terbilang*/}
                        {/*    </Col>*/}
                        {/*    <Col span={8}>*/}
                        {/*        <Input onChange={onChangeAngsuranPokokTerbilang} placeholder={'Angsuran Per Bulan Terbilang'}*/}
                        {/*               style={{width: '100%'}}/>*/}
                        {/*    </Col>*/}

                        {/*</Row>*/}
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                            </Col>
                            <Col span={8}>
                                <Button onClick={submit} type={'primary'}>Submit</Button>
                            </Col>

                        </Row>
                    </>
                )}
            </Card>
        </>
    )
}
ApprovalPinjamanDetail.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.pinjaman.loading,
        pinjamanData: state.pinjaman.pinjamanData,
        status: state.pinjaman.status
    }
}
ApprovalPinjamanDetail.auth = true
export default connect(mapStateToProps, pinjamanDispatch)(ApprovalPinjamanDetail)
