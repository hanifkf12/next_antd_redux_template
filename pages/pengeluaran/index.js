import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Input, Row, Select, Space, Table} from "antd";
import LayoutKu from "../../component/layout";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {pengeluaranDispatch} from "../../redux/pengeluaran_redux";
import {connect} from "react-redux";
import moment from "moment";
const convertRupiah = require('rupiah-format')
import 'moment/locale/id';
import {EditOutlined} from "@ant-design/icons";
import {groupFilter, searchFilter} from "../../utils/filterHelper";
import {formatRupiah} from "../../utils/rupiahFormat";

const Pengeluaran = (props) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [filterTahun, setFiltertahun] = useState('')
    const [filterBulan, setFilterBulan] = useState('')
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

    const columns = [
        {
            title: 'Uraian',
            dataIndex: 'uraian',
            key: 'uraian',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Jumlah Pengeluaran',
            dataIndex: 'jumlah',
            key: 'jumlah',
            render: (text, record) => (
                <>{formatRupiah(record.jumlah)}</>
            )
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
            key: 'tanggal',
            render: (text, record) => (
                <>{moment(record.tanggal).format('LL')}</>
            )
        },
        {
            title: 'Action',
            align: 'center',
            dataIndex: 'tanggal',
            key: 'tanggal',
            render: (text, record) => (
                <>
                    <Space>
                        <Button onClick={()=>{
                            router.push(`/pengeluaran/edit/${record.id}`)
                        }} style={{
                            color: 'white',
                            backgroundColor: 'forestgreen'
                        }}icon={<EditOutlined/>}/>
                    </Space>
                </>
            )
        },
    ]
    useEffect(()=>{
        console.log('tes')
        props.loadPengeluaran({
            token: session.token
        })
    },[])
    return(
        <>
            <Card title='Daftar Pengeluaran'>
                {props.loading? (
                    <>Loading</>
                ) : (
                    <>
                        <Row gutter={6} justify={'start'}>
                            <Col span={5}>
                                <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
                            </Col>
                            <Col span={3}>
                                <DatePicker locale={'id'}onChange={(e, t)=>{
                                    if(e){
                                        const myDate = e.format('LL').split(' ')
                                        setFilterBulan(myDate[1])
                                        setFiltertahun(myDate[2])
                                    }else {
                                        setFilterBulan('')
                                        setFiltertahun('')
                                    }
                                }}style={{width: '100%'}} placeHolder={'Pilih Tahun'} picker={'month'}/>
                            </Col>
                        </Row>
                        {/*{props.loading ? (*/}
                        {/*    <div>*/}
                        {/*        <Row justify={'center'} align={'middle'}>*/}
                        {/*            <Col>*/}
                        {/*                <Spin tip={'Loading...'} size="small"/>*/}
                        {/*            </Col>*/}
                        {/*        </Row>*/}
                        {/*    </div>*/}
                        {/*) : (*/}
                        <Table columns={columns} rowKey={'id'}
                               dataSource={groupFilter(searchFilter(props.pengeluaran,'uraian', router.query.search),'bulan','tahun', filterBulan, filterTahun)}
                               style={{marginTop: '20px'}}
                        />
                        {/*)}*/}
                    </>
                )}
            </Card>
        </>
    )
}
Pengeluaran.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
const mapStateToProps = (state) => {
    console.log(state.pengeluaran)
    return{
        loading: state.pengeluaran.loading,
        pengeluaran: state.pengeluaran.pengeluaran
    }
}

Pengeluaran.auth = true
export default connect(mapStateToProps, pengeluaranDispatch)(Pengeluaran)
