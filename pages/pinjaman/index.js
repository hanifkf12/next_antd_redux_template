import React, {useEffect, useState} from "react";
import LayoutKu from "../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select, Space, Spin, Table} from "antd";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {pinjamanDispatch} from "../../redux/pinjaman_redux";
import {useSession} from "next-auth/react";
import convertRupiah from "rupiah-format";
import {groupFilter, pinjamanFilter, searchFilter, searchFilter2} from "../../utils/filterHelper";
import moment from "moment";
import {formatRupiah} from "../../utils/rupiahFormat";
import Link from 'next/link'

const Pinjaman = (props) => {
    const router = useRouter()
    const {data: session} = useSession()
    const [filterStatus, setFilterStatus] = useState('')
    const [filterTahun, setFilterTahun] = useState(new Date().getFullYear().toString())
    const onSearch = (e) => {
        console.log(e.target.value)
        // const newFilter = filter;
        // filter.search = e.target.value;
        // setFilter(newFilter)
        const newFilter = filter;
        newFilter.search = e.target.value;
        setFilter(newFilter)
        console.log('new FIlter, ', newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
    }
    const [filter, setFilter] = useState({
        search: '',
        tahun: '2022',
        status: ''
    })
    const onSearch2 = (e) => {
        console.log(e)
        const newFilter = filter;
        newFilter.search = e;
        setFilter(newFilter)
        console.log('new FIlter, ', newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
    }
    const onChangeStatus = (e) => {
        console.log(e)
        setFilterStatus(e)
        const newFilter = filter;
        newFilter.status = e;
        setFilter(newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
    }
    console.log(new Date().getFullYear().toString())
    const onChangeTahun = (e, t) => {
        console.log(t)
        console.log('RR', e)
        const newFilter = filter;
        newFilter.tahun = e.format('YYYY');
        setFilter(newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
        // console.log(filterTahun)
    }
    const columns = [
        {
            title: 'Nama',
            dataIndex: ['user', 'name'],
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Jumlah',
            dataIndex: 'jumlah_disetujui',
            key: 'jumlah_disetujui',
            render: (tex, record) => (
                <>{formatRupiah(record.jumlah_disetujui)}</>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (tex, record) => (
                <>{record.status === 'lunas' ? 'Lunas' : 'Belum Lunas'}</>
            )
        },
        {
            title: 'Masa Pinjaman',
            dataIndex: 'masa_pinjaman',
            key: 'masa_pinjaman',
            render: (tex, record) => (
                <>{record.masa_pinjaman} Bulan</>
            )
        },
        {
            title: 'Angsuran Pokok',
            dataIndex: 'angsuran_pokok',
            key: 'angsuran_pokok',
            render: (tex, record) => (
                <>{formatRupiah(record.angsuran_pokok)}</>
            )
        },
        {
            title: 'Bunga /Bulan',
            dataIndex: 'bunga_per_bulan',
            key: 'bunga_per_bulan',
            render: (tex, record) => (
                <>{formatRupiah(record.bunga_per_bulan)}</>
            )
        },
        {
            title: 'Angsuran (Pokok + Bunga) /Bulan',
            dataIndex: 'bunga_per_bulan',
            key: 'bunga_per_bulan',
            render: (tex, record) => (
                <>{formatRupiah(record.bunga_per_bulan + record.angsuran_pokok)}</>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    {record.status==='belum_lunas' && (
                        <Link href={`/pinjaman/detail/${record.id}`}>
                            <Button style={{backgroundColor: 'royalblue', color: 'white'}}>Edit</Button>
                        </Link>
                    )}
                    <Link href={`/pinjaman/detail/${record.id}`}>
                        <Button style={{backgroundColor: 'forestgreen', color: 'white'}}>Lihat</Button>
                    </Link>
                </Space>
            ),
        },
    ]
    // console.log(props.pinjamanBerjalan)
    useEffect(() => {
        props.loadPinjamanBerjalan({
            token: session.token
        })
    }, [router.query])
    return (
        <>
            <Card title='Daftar Pinjaman Berjalan'>
                <Row gutter={6} justify={'start'}>
                    <Col span={5}>
                        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
                    </Col>
                    <Col span={3}>
                        <DatePicker defaultValue={moment(filterTahun)} onChange={onChangeTahun} style={{width: '100%'}}
                                    placeHolder={'Pilih Tahun'} locale={'id'} picker={'year'}/>


                    </Col>
                    <Col span={3}>
                        <Select onChange={onChangeStatus} placeholder={'Pilih Status'} defaultValue={''}
                                style={{width: '100%'}}>
                            <Select.Option value={''}>Semua</Select.Option>
                            <Select.Option value={'lunas'}>Lunas</Select.Option>
                            <Select.Option value={'belum_lunas'}>Belum Lunas</Select.Option>
                        </Select>

                    </Col>
                </Row>
                {props.loading ? (
                    <div>
                        <Row justify={'center'} align={'middle'}>
                            <Col>
                                <Spin tip={'Loading...'} size="small"/>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <Table columns={columns} rowKey={'id'}
                           style={{marginTop: '20px'}}
                           // dataSource={groupFilter(searchFilter2(props.pinjamanBerjalan, 'user', 'name', router.query.search), 'status', 'tahun', filterStatus, filterTahun)}
                           dataSource={pinjamanFilter(props.pinjamanBerjalan,router.query.search,filterTahun,filterStatus)}
                    />
                )}
            </Card>
        </>
    )
}

Pinjaman.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
const mapStateToProps = (state) => {
    console.log(state.pinjaman)
    return {
        loading: state.pinjaman.loading,
        pinjamanBerjalan: state.pinjaman.pinjamanBerjalan,
        status: state.pinjaman.status
    }
}
Pinjaman.auth = true

export default connect(mapStateToProps, pinjamanDispatch)(Pinjaman)
