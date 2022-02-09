import {
    CiCircleFilled,
    DeleteOutlined,
    EditOutlined,
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
    Divider,
    Layout,
    Menu, message, Modal,
    Row,
    Space,
    Table,
    Tag,
    Typography
} from "antd";
import styles from '../../utils/Tes.module.css'
import {getSession, useSession} from "next-auth/react";
import axios from "axios";
import LayoutKu from "../../component/layout";
import Home from "../index";
import {useEffect, useState} from "react";
import {testDispatch} from "../../redux/tes/testRedux";
import {connect} from "react-redux";

function SubMenu(props) {
    return null;
}

function Tes(props) {
    console.log(props)
    const { data: session } = useSession()
    const [modal, setModal] = useState(false)
    const onChange = () => {};
    const {Title} = Typography;
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    console.log(props.hanif)
    const info = () => {
        message.info('This is a normal message');
    };

    const showModal = (data)=>{
        setModal(true)
    }
    const hideModal = ()=>{
        setModal(false)
    }
    const columns = [
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
            render: c => <a>{c}</a>,
        },
        {
            title: 'Umur',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={()=>showModal(record)} style={{backgroundColor:'#5a4cf5', color:'white'}}><EditOutlined/></Button>
                    <Button style={{backgroundColor: 'red', color: 'white'}}><DeleteOutlined/></Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    useEffect(async ()=>{
        props.tesDong()
    },[])
    return(
        <>
            <MyModal title='Akuusdsdsu' show={modal} hide={hideModal}/>
            <Card title='User Data'>
                <Table columns={columns} dataSource={data} />
            </Card>
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            hanif: 'hanif'
        }, // will be passed to the page component as props
    }
}
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

const MyModal = (props)=>{
    useEffect(()=>{
        if(props.show){
            console.log('effect modal')
        }
    },[props.show])
    return(
        <Modal title={props.title} visible={props.show} onCancel={props.hide}>
            Hallo
        </Modal>
    )
}
