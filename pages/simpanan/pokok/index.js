import React from "react";
import LayoutKu from "../../../component/layout";
import {Card, Col, Input, Row, Spin, Table} from "antd";
import {searchFilter} from "../../../utils/filterHelper";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const SimpananPokok = (props) => {
    const {data: session} = useSession()
    const router = useRouter()
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
            dataIndex: 'name',
            key: 'name',
            // render: c => <a>{c}</a>,
        },
        {
            title: 'Jumlah',
            dataIndex: 'alamat',
            key: 'alamat',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        // {
        //     title: 'No Hp',
        //     dataIndex: 'phone',
        //     key: 'phone',
        // },
    ]
    return(
        <>
            <Card title='Daftar Simpanan Pokok'>
                <Row>
                    <Col span={5}>
                        <Input.Search onPressEnter={onSearch} placeholder={'Search'} onSearch={onSearch2}/>
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
                           style={{marginTop: '20px'}}
                    />
                {/*)}*/}
            </Card>
        </>
    )
}

SimpananPokok.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

SimpananPokok.auth = true
export default SimpananPokok
