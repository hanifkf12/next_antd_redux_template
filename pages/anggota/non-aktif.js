

import {
    CiCircleFilled,
    DeleteOutlined,
    EditOutlined, EyeOutlined,
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    DatePicker,
    Divider, Input,
    Layout,
    Menu, message, Modal,
    Row,
    Space, Spin,
    Table,
    Tag,
    Typography
} from "antd";
import styles from '../../utils/Tes.module.css'
import {getSession, useSession} from "next-auth/react";
import axios from "axios";
import LayoutKu from "../../component/layout";
import Home from "../index";
import React, {useEffect, useState} from "react";
import {testDispatch} from "../../redux/tes/testRedux";
import {connect} from "react-redux";
import {guardInstance} from '../../utils/axiosConfig'

function SubMenu(props) {
    return null;
}

import {DeleteModal} from '../../component/my_modal'
import {deleteAnggota, getAllAnggota} from "../../service/service_anggota";
import {searchFilter} from "../../utils/filterHelper";
import {useRouter} from "next/router";
import {anggotaDispatch} from "../../redux/anggota/anggota-redux";
import convertRupiah from "rupiah-format";
import {formatRupiah} from "../../utils/rupiahFormat";

function NonActive(props) {
    const {data: session} = useSession()
    const router = useRouter()
    const axios = guardInstance(session.token)
    const [modal, setModal] = useState(false)
    const onChange = () => {
    };
    const {Title} = Typography;
    const {Header, Content, Footer, Sider} = Layout;
    const {SubMenu} = Menu;
    const info = () => {
        message.info('This is a normal message');
    };
    const [filter, setFilter] = useState({
        page: 1,
        search: ''
    })
    const [id, setId] = useState(0)
    const showModal = (data) => {
        setModal(true)
        setId(data.id)
    }
    const hideModal = () => {
        setModal(false)
        setId(0)
    }
    // const addPage = () => {
    //     let newPage = page;
    //     newPage++
    //     setPage(newPage)
    //     router.push(`${router.pathname}?page=${page}&action=tes`, undefined, {shallow: true})
    // }

    const confirmDelete = async () => {
        props.deleteAnggota({id: id, token: session.token})
        hideModal()
    }
    const columns = [
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Alamat',
            dataIndex: 'alamat',
            key: 'alamat',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <>
                    {record.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </>
            )
        },
        {
            title: 'Simpanan Pokok',
            dataIndex: ['simpanan_pokok', 'jumlah'],
            key: 'phone',
            render: (text, record) => (
                <>
                    {formatRupiah(record.simpanan_pokok.jumlah ? record.simpanan_pokok.jumlah : 0)}
                </>
            )
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <Button onClick={() => {
                        router.push(`/anggota/edit/${record.id}`)
                    }} style={{
                        color: 'white',
                        backgroundColor: 'forestgreen'
                    }} icon={<EditOutlined/>}/>
                    <Button onClick={() => {
                        router.push(`/anggota/detail/${record.id}`)
                    }} style={{backgroundColor: 'royalblue', color: 'white'}} icon={<EyeOutlined/>}/>
                    <Button onClick={() => showModal(record)}
                            style={{backgroundColor: 'red', color: 'white'}} icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const onSearch = (e) => {
        console.log(e.target.value)
        const newFilter = filter;
        filter.search = e.target.value;
        setFilter(newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
    }
    const onSearch2 = (e) => {
        console.log(e)
        router.push({
            pathname: '',
            search: new URLSearchParams({search: e})
        })
    }
    const onChangePage = (page, t) => {
        const newFilter = filter;
        filter.page = page;
        setFilter(newFilter)
        router.push({
            pathname: '',
            search: new URLSearchParams(filter)
        })
    }
    console.log('search, ', router.query)
    useEffect(async () => {
        props.loadAnggotaNonActive({token: session.token})
        if (!router.query) {
            router.push({
                pathname: '',
                search: new URLSearchParams(filter)
            })
        }
    }, [])
    return (
        <>
            <DeleteModal title='Konfirmasi Hapus Anggota' confirm={confirmDelete} show={modal} hide={hideModal}/>
            <Card title='Daftar Anggota Non Aktif Koperasi'>
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
                    <Table columns={columns} rowKey={'id'}
                           style={{marginTop: '20px'}}
                           dataSource={searchFilter(props.anggota, 'name', router.query.search)}
                           pagination={{
                               pageSize: 10,
                               total: searchFilter(props.anggota, 'name', router.query.search).length,
                               onChange: onChangePage,
                               showTotal: (e, t) => {

                               }
                           }}
                           onChange={(tess) => {
                               console.log(tess)
                           }}/>
                )}
            </Card>
        </>
    )
}

// export async function getServerSideProps(context) {
//     return {
//         props: {
//             hanif: 'hanif'
//         }, // will be passed to the page component as props
//     }
// }
const mapStateToProps = (state) => {
    return {
        data: state.tes.data,
        anggota: state.anggota.anggota,
        loading: state.anggota.loading
    }
}
NonActive.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

NonActive.auth = true

export default connect(mapStateToProps, anggotaDispatch)(NonActive)

