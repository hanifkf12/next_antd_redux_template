import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import LayoutKu from "../../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select, Space, Spin, Table} from "antd";
import {anggotaDispatch} from "../../../redux/anggota/anggota-redux";
import {useSession} from "next-auth/react";
import {connect} from "react-redux";
import moment from "moment";
import {groupFilter, searchFilter} from "../../../utils/filterHelper";
import 'moment/locale/id'
import convertRupiah from "rupiah-format";
import BayarSimpananWajibModal from "../../../component/bayar_simpanan_modal";
import BayarAngsuranModal from "../../../component/bayar_angsuran_modal";
const DetailUser = (props) => {
    const router = useRouter()
    const {data: session} = useSession()
    const {id} = router.query;
    const [tahunSimpanan, setTahunSimpanan] = useState('')
    const [bulanSimpanan, setBulanSimpanan] = useState('')
    const [tahunPinjaman, setTahunPinjaman] = useState('')
    const [bayarSimpananVisibility, setBayarSimpananVisibility] = useState(false)
    const [simpananId, setSimpananId] = useState(0)
    const [bayarData, setBayarData] = useState({})
    const showBayarSimpanan = (data) => {
        setBayarSimpananVisibility(true)
        setSimpananId(data.id)
        setBayarData(data)
    }
    const hideBayarSimpanan = () => {
        setBayarSimpananVisibility(false)
        setSimpananId(0)
        setBayarData({})
    }
    const submitBayarSimpanan = (data) => {
        console.log(data)
        hideBayarSimpanan()
    }
    const [bayarAngsuranVisibility, setBayarAngsuranVisibility] = useState(false)
    const [pinjamanId, setPinjamanId] = useState(0)
    const [pinjamanData, setPinjamanData] = useState({})
    const showBayarAngsuran = (data) => {
        console.log(data)
        setBayarAngsuranVisibility(true)
        setPinjamanId(data.id)
        setPinjamanData(data)
    }
    const hideBayarAngsuran = () => {
        setBayarAngsuranVisibility(false)
        setPinjamanId(0)
        setPinjamanData({})
    }
    const submitBayarAngsuran = (data) => {
        console.log(data)
        hideBayarAngsuran()
    }
    const columns = [
        {
            title: 'Bulan',
            dataIndex: 'bulan',
            key: 'bulan',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Tahun',
            dataIndex: 'tahun',
            key: 'tahun',
        },
        {
            title: 'Jumlah',
            dataIndex: '',
            key: 'jumlah',
            render: (text, record) => (
                <>
                    {convertRupiah.convert(record.jumlah)}
                </>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <>{record.status ==='dibayar'? 'Dibayar' : 'Belum Dibayar'}</>
            )
        },
        {
            title: 'Action',
            align: 'center',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <>
                    <Button type={'primary'} onClick={()=>{
                        showBayarSimpanan(record)
                    }} disabled={record.status==='dibayar'}>Bayar</Button>
                </>
            )
        },
    ]
    const pinjamanColumns = [
        {
            title: 'Jumlah Pinjaman',
            dataIndex: '',
            key: 'jumlah_disetujui',
            render: (text, record) => (
                <>
                    {convertRupiah.convert(record.jumlah_disetujui)}
                </>
            )
        },
        {
            title: 'Masa Pinjaman',
            dataIndex: 'masa_pinjaman',
            key: 'masa_pinjaman',
            render: (text, record) => (
                <>{record.masa_pinjaman} Bulan</>
            )
        },
        {
            title: 'Pinjman Ke',
            dataIndex: 'pinjaman_ke',
            key: 'pinjaman_ke',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <>{record.status==='lunas'? 'Lunas' : 'Belum Lunas'}</>
            )
        },
        {
            title: 'Angsuran Bulanan',
            dataIndex: 'angsuran_pokok',
            key: 'angsuran_pokok',
            render: (text, record) => (
                <>{convertRupiah.convert(record.angsuran_pokok + record.bunga_per_bulan)}</>
            )
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => (
                <>
                    <Button onClick={()=>{
                        showBayarAngsuran(record)
                    }} type={'primary'} disabled={record.status==='lunas'}>Bayar</Button>
                </>
            )
        },
    ]
    const onChangeDateSimpanan = (t, s) => {
        console.log(t.format('LL'))
        const dataSplit = t.format('LL').split(' ')
        setTahunSimpanan(dataSplit[2])
        setBulanSimpanan(dataSplit[1])
    }

    useEffect(() => {
        props.anggotaById({
            id: id,
            token: session.token
        })
        props.loadSimpananWajibAnggota({
            id: id,
            token: session.token
        })
        props.loadPinjamanAnggota({
            id: id,
            token: session.token
        })
    }, [])
    return (
        <>
            <BayarSimpananWajibModal data={bayarData}show={bayarSimpananVisibility} submit={submitBayarAngsuran} hide={hideBayarSimpanan}/>
            <BayarAngsuranModal data={pinjamanData} show={bayarAngsuranVisibility} submit={submitBayarAngsuran} hide={hideBayarAngsuran}/>
            {props.loading ? (
                <Row justify={'center'} align={'middle'}>
                    <Col>
                        <Spin tip={'Loading...'} size="small"/>
                    </Col>
                </Row>
            ) : (
                <>
                    <Card title={'Data Anggota'}>
                        <Row>
                            <Col span={12}>
                                <Space direction={"vertical"} style={{width: '100%'}}>
                                    <Row>
                                        <Col span={6}>
                                            Nama
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            No KTP
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.no_ktp}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            Jenis Kelamin
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.jenis_kelamin}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            Tempat, Tanggal Lahir
                                        </Col>
                                        <Col span={10}>
                                            : {`${props.dataAnggota.tempat_lahir}, ${moment(props.dataAnggota.tanggal).format('LL')}`}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            No Telepon
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.phone}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            Email
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.email}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            Status Perkawinan
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.status_perkawinan}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            Instansi
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.instansi}
                                        </Col>
                                    </Row>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction={"vertical"} style={{width: '100%'}}>
                                    <Row>
                                        <Col span={5}>
                                            Alamat
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.alamat}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}>
                                            RT/RW
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.rt_rw}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}>
                                            Kelurahan
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.kelurahan}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}>
                                            Kota/Kabupaten
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.kota_kabupaten}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5}>
                                            Provinsi
                                        </Col>
                                        <Col span={10}>
                                            : {props.dataAnggota.propinsi}
                                        </Col>
                                    </Row>
                                </Space>
                            </Col>
                        </Row>


                    </Card>
                    <Row style={{marginTop: '20px'}} >
                        <Col span={24}>
                            <Card title={'Simpanan Wajib'}>
                                <Row>
                                    <Col span={24}>
                                        <DatePicker style={{width: '50%'}} onChange={onChangeDateSimpanan} placeHolder={'Pilih Tahun'} locale={'id'}
                                                    picker={'month'}/>

                                        <Table columns={columns} rowKey={'id'}
                                               dataSource={groupFilter(props.simpananWajib, 'tahun', 'bulan', tahunSimpanan, bulanSimpanan)}
                                               style={{marginTop: '20px'}}
                                               pagination={{
                                                   pageSize: 6,
                                                   total: groupFilter(props.simpananWajib, 'tahun', 'bulan', tahunSimpanan, bulanSimpanan).length,
                                                   // onChange: onChangePage,
                                               }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                    </Row>

                    <Row style={{marginTop: '20px'}}>
                        <Col span={24}>
                            <Card title={'Riwayat Pinjaman'}>
                                <Row>
                                    <Col span={24}>
                                        {/*<DatePicker style={{width: '50%'}} placeHolder={'Pilih Tahun'} locale={'id'}*/}
                                        {/*            picker={'year'}/>*/}

                                        <Button onClick={() => {
                                            router.push('/pinjaman/baru')
                                        }} type={'primary'} style={{marginLeft: '20px'}}>Ajukan Pinjaman Baru</Button>
                                        <Table columns={pinjamanColumns} rowKey={'id'}
                                               dataSource={props.pinjamanAnggota}
                                               style={{marginTop: '20px'}}
                                               pagination={{
                                                   pageSize: 6,
                                                   total: props.pinjamanAnggota.length,
                                                   // onChange: onChangePage,
                                               }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )
            }
        </>
    )
}
DetailUser.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.anggota.loading,
        dataAnggota: state.anggota.dataAnggota,
        simpananWajib: state.anggota.simpananWajib,
        pinjamanAnggota: state.anggota.pinjamanAnggota
    }
}

DetailUser.auth = true
export default connect(mapStateToProps, anggotaDispatch)(DetailUser)
