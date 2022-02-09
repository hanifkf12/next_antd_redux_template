import styles from "../utils/Tes.module.css";
import {
    Breadcrumb,
    Button,
    Col,
    DatePicker,
    Divider,
    Menu,
    Row,
    Space,
    Typography,
    Layout,
    Badge,
    Dropdown, Popconfirm, Popover, List
} from "antd";
import {
    AppstoreOutlined,
    BarChartOutlined, BellOutlined,
    CiCircleFilled, CloudOutlined, DesktopOutlined, DollarCircleOutlined, ExpandAltOutlined, ExportOutlined,
    FileOutlined, HomeFilled, InfoCircleOutlined,
    LaptopOutlined, LogoutOutlined, MoneyCollectOutlined,
    NotificationOutlined, PieChartOutlined, ShopOutlined,
    TeamOutlined, UploadOutlined,
    UserOutlined, VideoCameraOutlined
} from "@ant-design/icons";
import {useRouter} from "next/router";
import {useState} from "react";
import {signOut, useSession} from "next-auth/react";


export default function LayoutKu({children}) {
    const {data: session} = useSession()
    console.log(session)
    const {Title} = Typography;
    const {Header, Content, Footer, Sider} = Layout;
    const [selected, setSelected] = useState('1')
    const [collapsed, setCollapsed] = useState(false)
    const {SubMenu} = Menu;
    const router = useRouter()
    console.log('Path, ', router.pathname)
    const handleClick = (e) => {
        console.log('TESS, ', e)
        router.push(e.key)
    }
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };
    const content = (
        <List
            size="small"
            style={{width: '200px'}}
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            // bordered
            dataSource={['Tess', 'Ssss','Tess', 'Ssss','Tess', 'Ssss']}
            renderItem={item => <List.Item>{item}</List.Item>}
        />
    );
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Layout hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Row align='middle' justify='center' style={{height: '32px', margin: '16px'}}>
                            <Col><Typography.Title level={2} style={{color: 'white'}}>KAPOS</Typography.Title></Col>
                    </Row>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]} onClick={handleClick}>
                        <Menu.Item key="/" icon={<HomeFilled/>}>
                            Home
                        </Menu.Item>
                        <SubMenu key="anggota" icon={<UserOutlined />} title="Anggota">
                            <Menu.Item key="/anggota">Daftar Anggota</Menu.Item>
                            <Menu.Item key="/anggota/tambah">Tambah Anggota</Menu.Item>
                        </SubMenu>
                        <SubMenu key="simpanan" icon={<FileOutlined />} title="Simpanan">
                            <Menu.Item key="/simpanan/pokok">Simpanan Pokok</Menu.Item>
                            <Menu.Item key="/simpanan/wajib">Simpanan Wajib</Menu.Item>
                        </SubMenu>
                        <SubMenu key="pinjaman" icon={<AppstoreOutlined />} title="Pinjaman">
                            <Menu.Item key="5">Daftar Pinjaman</Menu.Item>
                            <Menu.Item key="6">Ajukan Pinjaman</Menu.Item>
                            <Menu.Item key="00">Pembayaran</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="16" icon={<ExpandAltOutlined/>}>
                            Pengeluaran
                        </Menu.Item>
                        <Menu.Item key="162" icon={<ExpandAltOutlined/>}>
                            Inventaris
                        </Menu.Item>
                        <Menu.Item key="7" icon={<InfoCircleOutlined/>}>
                            Pemasukan
                        </Menu.Item>
                        {/*<Menu.Item key="8" icon={<ExportOutlined/>}>*/}
                        {/*    Reporting*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200, minHeight: '100vh'}}>
                    <Header className="site-layout-background" style={{padding: 0, backgroundColor: '#fff'}}>
                        <Row justify='space-between' style={{marginRight: '20px', marginLeft: '20px'}} align='middle'>
                            <Col>
                                {session&&(
                                    <h1>Hi, {session.user.name}</h1>
                                )}
                            </Col>
                            <Space size="middle">
                                <Badge count={10}>
                                    <Popover placement="bottomRight" content={content} trigger="click">
                                        <Button icon={<BellOutlined/>} shape={"round"} type='dashed'/>
                                    </Popover>
                                </Badge>
                                <Popconfirm
                                    placement="bottomRight"
                                    title={'Apakah yakin untuk keluar?'}
                                    onConfirm={()=>signOut()}
                                    okText="Ya"
                                    cancelText="Tidak"
                                >
                                <Button type='default' shape='round' icon={<LogoutOutlined/>}>Keluar</Button>
                                </Popconfirm>
                            </Space>
                        </Row>
                    </Header>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        {children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}
