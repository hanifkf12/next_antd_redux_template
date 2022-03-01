import React, {useEffect, useState} from "react";
import LayoutKu from "../../component/layout";
import {Button, Card, Col, Input, Row, Select, Space, Spin, Table} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/id"
import {deleteInventaris, getAllInventaris} from "../../service/service_inventaris";
import {useSession} from "next-auth/react";
import {DeleteModal} from '../../component/my_modal'
import {useRouter} from "next/router";
import {searchFilter} from "../../utils/filterHelper";
import {inventarisDispatch} from "../../redux/inventaris_redux";
import {connect} from "react-redux";
import convertRupiah from "rupiah-format";

const Inventaris = (props) => {
    const {data: session} = useSession()
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(0)
    const showModal = (data) => {
        setModal(true)
        setId(data.id)
    }
    const hideModal = () => {
        setModal(false)
        setId(0)

    }

    const confirmDelete = async () => {
        props.deleteInventaris({
            id: id,
            token: session.token
        })
        hideModal()
    }
    const columns = [
        {
            title: 'Nama Barang',
            dataIndex: 'nama_barang',
            key: 'nama_barang',
            sorter: (a, b) => a.nama_barang.localeCompare(b.nama_barang),
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
        },
        {
            title: 'Biaya',
            dataIndex: 'biaya',
            key: 'biaya',
            render: (text, record) => (
                <>{convertRupiah.convert(record.biaya)}</>
            )
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
            key: 'tanggal',
            render: tanggal => (
                <>{moment(tanggal).format('ll')}</>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button onClick={() => {
                        router.push(`/inventaris/edit/${record.id}`)
                    }} style={{color: 'white',
                        backgroundColor: 'forestgreen'}} icon={<EditOutlined/>}/>
                    {/*<Button shape={'round'} style={{backgroundColor: '#589d45', color: 'white'}} icon={<EyeOutlined/>}/>*/}
                    <Button onClick={() => showModal(record)}
                            style={{backgroundColor: 'red', color: 'white'}} icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const onSearch = (e) => {
        console.log(e.target.value)
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
    useEffect(async () => {
        props.loadInventaris({token: session.token})
    }, [])
    return (
        <>
            <DeleteModal title='Konfirmasi Hapus Anggota' confirm={confirmDelete} show={modal} hide={hideModal}/>

            <Card title='Inventaris Data'>
                <Row>
                    <Col span={5}>
                        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
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
                    <Table columns={columns} style={{marginTop: '20px'}} rowKey={'id'} dataSource={
                        searchFilter(props.inventaris, 'nama_barang', router.query.search)
                    } pagination={{
                        pageSize: 10,
                        total: searchFilter(props.inventaris, 'nama_barang', router.query.search).length,
                    }} onChange={(tess, sorter, tes) => {
                        console.log('tess, ', tess)
                        console.log('tes, ', tes)
                    }}/>
                )}
            </Card>
        </>
    )
}

Inventaris.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

Inventaris.auth = true

const mapStateToProps = (state) => {
    return {
        inventaris: state.inventaris.inventaris,
        loading: state.inventaris.loading
    }
}
export default connect(mapStateToProps, inventarisDispatch)(Inventaris)
