import React, {useEffect, useState} from "react";
import LayoutKu from "../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select, Space, Spin, Table} from "antd";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {pinjamanDispatch} from "../../redux/pinjaman_redux";
import {useSession} from "next-auth/react";
import convertRupiah from "rupiah-format";
import {groupFilter, searchFilter, searchFilter2} from "../../utils/filterHelper";
import moment from "moment";

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
        router.push({
            pathname: '',
            search: new URLSearchParams({search: e.target.value})
        })
    }
    const onSearch2 = (e) => {
        console.log(e)
        router.push({
            pathname: '',
            search: new URLSearchParams({search: e})
        })
    }
    const onChangeStatus  = (e) => {
        console.log(e)
        setFilterStatus(e)
    }
    console.log(new Date().getFullYear().toString())
    const onChangeTahun = (e,t) => {
        if(e){
            setFilterTahun(e.format('YYYY'))
        }else {
            setFilterTahun(new Date().getFullYear().toString())
        }
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
                <>{convertRupiah.convert(record.jumlah_disetujui)}</>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (tex, record) => (
                <>{record.status === 'lunas'? 'Lunas' : 'Belum Lunas'}</>
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
                <>{convertRupiah.convert(record.angsuran_pokok)}</>
            )
        },
        {
            title: 'Bunga /Bulan',
            dataIndex: 'bunga_per_bulan',
            key: 'bunga_per_bulan',
            render: (tex, record) => (
                <>{convertRupiah.convert(record.bunga_per_bulan)}</>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button style={{backgroundColor: 'forestgreen', color: 'white'}}>Review</Button>
                </Space>
            ),
        },
    ]
    console.log(props.pinjamanBerjalan)
    useEffect(() => {
        props.loadPinjamanBerjalan({
            token: session.token
        })
    }, [])
    return (
        <>
            <Card title='Daftar Pinjaman Berjalan'>
                <Row gutter={6} justify={'start'}>
                    <Col span={5}>
                        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
                    </Col>
                    <Col span={3}>
                        <DatePicker defaultValue={moment(filterTahun)} onChange={onChangeTahun} style={{width: '100%'}} placeHolder={'Pilih Tahun'} locale={'id'} picker={'year'}/>


                    </Col>
                    <Col span={3}>
                        <Select onChange={onChangeStatus} placeholder={'Pilih Status'} defaultValue={''} style={{width: '100%'}}>
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
                           dataSource={groupFilter(searchFilter2(props.pinjamanBerjalan,'user','name',router.query.search), 'status', 'tahun', filterStatus, filterTahun)}
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
