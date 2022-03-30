import React, {useEffect, useState} from "react";
import LayoutKu from "../../component/layout";
import {Button, Card, Col, Row, Space, Table} from "antd";
import TambahKategoriModal from '../../component/tambah_kategori_modal'
import EditKategoriModal from '../../component/edit_kategori_modal'
import {useSession} from "next-auth/react";
import {connect, useDispatch} from "react-redux";
import {inventarisDispatch} from "../../redux/inventaris_redux";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {searchFilter} from "../../utils/filterHelper";
import {DeleteModal} from '../../component/my_modal'

const MasterKategori = (props) => {
    const {data: session} = useSession()
    const dispatch = useDispatch()
    const [addVisibility, setAddVisibility] = useState(false)
    const showAdd = () => {
        setAddVisibility(true)
    }
    const hideAdd = () => {
        setAddVisibility(false)
    }
    const submit = (data) => {
        data.status = 'active'
        console.log(data)
        const payload = {
            token: session.token,
            data: data
        }
        props.tambahKategori(payload)
        hideAdd()
    }

    const [deleteVisibility, setDeleteVisibility] = useState(false)
    const [deletedId, setDeletedId] = useState(0)
    const showDelete = (id) => {
        setDeleteVisibility(true)
        setDeletedId(id)
    }
    const hideDelete = () => {
        setDeleteVisibility(false)
        setDeletedId(0)
    }

    const submitDelete = () => {
        const payload = {
            token: session.token,
            id: deletedId
        }
        console.log(payload)
        props.deleteKAtegori(payload)
        hideDelete()
    }

    const [editVisibility, setEditVisibility] = useState(false)
    const [editData, setEditData] = useState({})
    const showEdit = (data) => {
        setEditVisibility(true)
        setEditData(data)
    }
    const hideEdit = () => {
        setEditVisibility(false)
        setEditData({})
    }

    const submitEdit = (data) => {
        data.status = 'active'
        console.log(data)
        const payload = {
            token: session.token,
            data: data,
            id: editData.id
        }
        console.log(payload)
        props.updateKategori(payload)
        hideEdit()
    }
    const columns = [

        {
            title: 'Nama Kategori',
            dataIndex: 'name',
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (text, record) => (
                <Space size="small">

                    <Button onClick={()=>showEdit(record)} style={{
                        color: 'white',
                        backgroundColor: 'forestgreen'
                    }} icon={<EditOutlined/>}/>

                    {/*<Button shape={'round'} style={{backgroundColor: '#589d45', color: 'white'}} icon={<EyeOutlined/>}/>*/}
                    <Button onClick={() => showDelete(record.id)}
                            style={{backgroundColor: 'red', color: 'white'}} icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ]
    useEffect(() => {
        props.loadMasterKategori({
            token: session.token
        })
    }, [])
    return (
        <>
            <DeleteModal title='Konfirmasi Hapus Kategori' confirm={submitDelete} show={deleteVisibility}
                         hide={hideDelete}/>
            <TambahKategoriModal show={addVisibility} hide={hideAdd} submit={submit}/>
            <EditKategoriModal show={editVisibility} submit={submitEdit} hide={hideEdit} defaultData={editData}/>
            <Card title={'Master Kategori'}>
                <Row justify={'start'}>
                    <Col span={12}><Button onClick={showAdd} type={'primary'}>Tambah Baru</Button></Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col span={12}>
                        <Table columns={columns} dataSource={props.kategoriLists}
                               pagination={{
                                   pageSize: 10,
                                   total: props.kategoriLists.length,
                                   showTotal: (e, t) => {

                                   }
                               }}
                        />
                    </Col>
                </Row>

            </Card>
        </>
    )
}

MasterKategori.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
MasterKategori.auth = true

const mapStateToProps = (state) => {
    console.log(state.inventaris)
    return {
        loading: state.inventaris.loading,
        kategoriLists: state.inventaris.kategoriLists
    }
}
export default connect(mapStateToProps, inventarisDispatch)(MasterKategori)
