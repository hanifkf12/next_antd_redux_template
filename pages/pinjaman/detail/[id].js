import React, {useEffect, useState} from "react";
import LayoutKu from "../../../component/layout";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import moment from "moment";
import 'moment/locale/id'
import {connect} from "react-redux";
import {pinjamanDispatch} from "../../../redux/pinjaman_redux";
import {Button, Card, Col, Input, Row, Select, Space, Spin, Table} from "antd";
import {formatRupiah} from "../../../utils/rupiahFormat";
import BayarAngsuranModal from "../../../component/bayar_angsuran_modal";
import {DownloadOutlined} from "@ant-design/icons";
import Link from "next/link";
const PinjamanDetail = (props) => {
    const router = useRouter()
    const {data: session} = useSession()
    const {id} = router.query
    const statusMapper = {
        dibayar: 'Dibayar',
        belum_dibayar: 'Belum Dibayar'
    }
    const [bayarAngsuranVisibility, setBayarAngsuranVisibility] = useState(false)
    const [idAngsuran, setIdAngsuran] = useState(0)
    const showBayarAngsuran = (data) => {
        setBayarAngsuranVisibility(true)
        setIdAngsuran(data)
    }
    const hideBayarAngsuran = () => {
        setBayarAngsuranVisibility(false)
        setIdAngsuran(0)
    }
    const submitBayarAngsuran = (data) => {
        const payload = {
            data: {
                status: 'dibayar',
                angsuran_dibayar: data.jumlah
            },
            id: id,
            angsuranId: idAngsuran,
            token: session.token
        }
        console.log(payload)
        props.bayarAngsuran(payload)
        hideBayarAngsuran()
    }

    useEffect(() => {
        props.pinjamanById({
            id: id,
            token: session.token
        })
    }, [])

    const columns = [
        {
            title: 'Angsuran Ke',
            dataIndex: 'angsuran_ke',
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Angsuran Bulanan',
            dataIndex: 'angsuran_dibayar',
            key: 'angsuran_dibayar',
            render: (text, record) => (
                <>{formatRupiah(record.angsuran_dibayar)}</>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <>{statusMapper[record.status]}</>
            )
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (text, record) => (
                <>
                    <Button type={'primary'} onClick={()=>{
                        showBayarAngsuran(record.id)
                    }} disabled={record.status==='dibayar'}>Bayar</Button>
                </>
            )
        }

    ]
    return (
        <>
            <BayarAngsuranModal data={props.pinjamanData} show={bayarAngsuranVisibility} submit={submitBayarAngsuran} hide={hideBayarAngsuran}/>
            {props.loading ? (
                <Row justify={'center'} align={'middle'}>
                    <Col>
                        <Spin tip={'Loading...'} size="small"/>
                    </Col>
                </Row>
            ) : (
                <Row gutter={4}>
                    <Col span={12}>
                        <Card title={'Detail Pinjaman'}>

                            <>
                                <Row justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Status
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true}
                                               defaultValue={props.pinjamanData.status === 'lunas' ? 'Lunas' : 'Belum Lunas'}
                                               placeholder={'Jumlah'} style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Nama Anggota
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true} defaultValue={props.pinjamanData.user.name}
                                               placeholder={'Jumlah'} style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Jumlah Diajukan
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true}
                                               defaultValue={formatRupiah(props.pinjamanData.jumlah_diajukan)}
                                               placeholder={'Jumlah'} style={{width: '100%'}}/>
                                    </Col>

                                </Row>

                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Masa Pinjaman
                                    </Col>
                                    <Col span={18}>
                                        <Input defaultValue={`${props.pinjamanData.masa_pinjaman} Bulan`}
                                               disabled={true}
                                               placeholder={'Terbilang'} style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Jumlah Disetujui
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder={'Jumlah Disetujui'} disabled
                                               value={formatRupiah(props.pinjamanData.jumlah_disetujui)}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>

                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Administrasi
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder={'Administrasi'} disabled
                                               value={`${props.pinjamanData.administrasi} %`}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Biaya Administrasi
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true}
                                               value={formatRupiah(props.pinjamanData.biaya_administrasi)}
                                               placeholder={'Terbilang'}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Bunga
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder={'Administrasi'} disabled
                                               value={`${props.pinjamanData.bunga} %`}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Total Bunga
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true} value={formatRupiah(props.pinjamanData.jumlah_bunga)}
                                               placeholder={'Terbilang'}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Bunga Per Bulan
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true} value={formatRupiah(props.pinjamanData.bunga_per_bulan)}
                                               placeholder={'Terbilang'}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Angsuran Pokok
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true} value={formatRupiah(props.pinjamanData.angsuran_pokok)}
                                               placeholder={'Terbilang'}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                                    <Col span={6}>
                                        Angsuran Per Bulan
                                    </Col>
                                    <Col span={18}>
                                        <Input disabled={true}
                                               value={formatRupiah(props.pinjamanData.angsuran_pokok + props.pinjamanData.bunga_per_bulan)}
                                               placeholder={'Terbilang'}
                                               style={{width: '100%'}}/>
                                    </Col>

                                </Row>
                            </>

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Card title={'Dokumen'}>
                                    <Space direction={'horizontal'}>
                                        <Link href={`http://127.0.0.1:4005/api/v1/pinjaman/pdf2/${id}`} passHref={true} target={'_blank'}>
                                            <Button type="primary" icon={<DownloadOutlined />} >
                                                Download SPH
                                            </Button>
                                        </Link>
                                        <Link href={`http://127.0.0.1:4005/api/v1/pinjaman/pdf/${id}`} passHref={true} target={'_blank'}>
                                            <Button type="primary" icon={<DownloadOutlined />} >
                                                Download Formulir Pengajuan
                                            </Button>
                                        </Link>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: '4px'
                        }}>
                            <Col span={24}>
                                <Card title='Angsuran'>
                                    <Table columns={columns} rowKey={'id'}
                                           dataSource={props.pinjamanData.angsuran}
                                           style={{marginTop: '20px'}}
                                           pagination={{
                                               pageSize: 10,
                                               total: props.pinjamanData.angsuran.length,
                                               // onChange: onChangePage,
                                           }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    )
}

PinjamanDetail.getLayout = function getLayout(page) {
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

PinjamanDetail.auth = true
export default connect(mapStateToProps, pinjamanDispatch)(PinjamanDetail)
