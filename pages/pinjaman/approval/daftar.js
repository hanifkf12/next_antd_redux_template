import React, {useEffect} from "react";
import LayoutKu from "../../../component/layout";
import {useRouter} from "next/router";
import {Button, Card, Col, DatePicker, Input, Row, Select, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {pinjamanDispatch} from "../../../redux/pinjaman_redux";
import {connect} from "react-redux";
import {useSession} from "next-auth/react";

const ApprovalPinjaman = (props) => {
    const router = useRouter()
    const { data: session } = useSession()
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
            title: 'Nama',
            dataIndex: ['user','name'],
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Jumlah Diajukan',
            dataIndex: 'jumlah_diajukan',
            key: 'jumlah_diajukan',
        },
        {
            title: 'Status Pengajuan',
            dataIndex: 'status_pengajuan',
            key: 'status_pengajuan',
        },
        {
            title: 'Masa Pinjaman',
            dataIndex: 'masa_pinjaman',
            key: 'masa_pinjaman'
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button shape={'round'}style={{backgroundColor:'forestgreen', color:'white'}}>Review</Button>
                </Space>
            ),
        },
    ]
    useEffect(()=>{
        props.loadPendingPinjaman({
            token: session.token
        })
    },[])
    return(
        <>
            <Card title='Approval Pinjaman'>
                {/*<Row gutter={6} justify={'start'}>*/}
                {/*    <Col span={5}>*/}
                {/*        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>*/}
                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <DatePicker style={{width: '100%'}} placeHolder={'Pilih Tahun'} locale={'id'} picker={'year'}/>*/}


                {/*    </Col>*/}
                {/*    <Col span={3}>*/}
                {/*        <Select placeholder={'Pilih Status'} defaultValue={'belum_lunas'} style={{width: '100%'}}>*/}
                {/*            <Select.Option value={'lunas'}>Lunas</Select.Option>*/}
                {/*            <Select.Option value={'belum_lunas'}>Belum Lunas</Select.Option>*/}
                {/*        </Select>*/}

                {/*    </Col>*/}
                {/*</Row>*/}
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
                       style={{marginTop: '20px'}}
                       dataSource={props.pendingPinjaman}
                />
                {/*)}*/}
            </Card>
        </>
    )
}
ApprovalPinjaman.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

const mapStateToProps = (state) => {
    return{
        loading: state.pinjaman.loading,
        pendingPinjaman: state.pinjaman.pendingPinjaman,
        status: state.pinjaman.status
    }
}

ApprovalPinjaman.auth = true
export default connect(mapStateToProps, pinjamanDispatch)(ApprovalPinjaman)
