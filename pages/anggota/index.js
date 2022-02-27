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

function Tes(props) {
    const { data: session } = useSession()
    const router = useRouter()
    const axios = guardInstance(session.token)
    const [modal, setModal] = useState(false)
    const onChange = () => {};
    const {Title} = Typography;
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const info = () => {
        message.info('This is a normal message');
    };
    const [user,setUser] = useState([])
    const [id, setId] = useState(0)
    const [loading, setLoading] = useState(true)
    const showModal = (data)=>{
        setModal(true)
        setId(data.id)
    }
    const hideModal = ()=>{
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
        await deleteAnggota(id, session.token)
        hideModal()
        await getData()
    }
    const getData = async () => {
        setLoading(true)
        const data = await getAllAnggota(session.token)
        setLoading(false)
        if(data){
            setUser(data)
        }
        return data
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
        },
        {
            title: 'No Hp',
            dataIndex: 'phone',
            key: 'phone',
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
                    <Button shape={'round'} style={{backgroundColor:'#5a4cf5', color:'white'}} icon={<EditOutlined/>}/>
                    <Button shape={'round'} style={{backgroundColor:'#589d45', color:'white'}} icon={<EyeOutlined/>}/>
                    <Button shape={'round'} onClick={()=>showModal(record)}style={{backgroundColor: 'red', color: 'white'}} icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const onSearch = (e)=>{
        console.log(e.target.value)
        router.push({
            pathname: '',
            search: new URLSearchParams({search: e.target.value})
        })
    }
    const onSearch2 = (e)=>{
        console.log(e)
        router.push({
            pathname: '',
            search: new URLSearchParams({search: e})
        })
    }
    useEffect(async ()=>{
        const {search} = router.query
        console.log(search)
        const data = await getData()
        const final = searchFilter(data? data : [], 'name', search)
        setUser(final)
    }, [router.query])
    return(
        <>
            <DeleteModal title='Konfirmasi Hapus Anggota' confirm={confirmDelete} show={modal} hide={hideModal}/>
            <Card title='User Data'>
                <Row>
                    <Col span={5}>
                        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
                    </Col>
                </Row>
                {loading? (
                    <div>
                        <Row justify={'center'} align={'middle'}>
                            <Col>
                                <Spin tip={'Loading...'} size="small" />
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <Table columns={columns} rowKey={'id'} dataSource={user} onChange={(tess) => {
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
        data: state.tes.data
    }
}
Tes.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

Tes.auth = true

export default connect(mapStateToProps, testDispatch)(Tes)

