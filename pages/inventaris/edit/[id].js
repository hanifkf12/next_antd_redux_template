import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Input, Row, Select, Spin} from "antd";

import {useSession} from "next-auth/react";
import LayoutKu from "../../../component/layout";
import {getAllCategories, saveData} from "../../../service/service_inventaris";
import {connect} from "react-redux";
import {inventarisDispatch} from "../../../redux/inventaris_redux";
import {useRouter} from "next/router";
import moment from "moment";

const EditInventaris = (props) => {
    const router = useRouter()
    const { data: session } = useSession()
    const {id} = router.query;
    const [dataCategory, setDataCategory] = useState([])
    const [nama, setNama] = useState('')
    const [category, setCategory] = useState('')
    const [biaya, setBiaya] = useState(0)
    const [keterangan, setKeterangan] = useState('')
    const [tanggal, setTanggal] = useState('')

    const onChangeName = (e) => {
        setNama(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e)
    }
    const onChangeBiaya = (e) => {
        setBiaya(e.target.value)
    }
    const onChangeKeterangan = (e) => {
        setKeterangan(e.target.value)
    }
    const onChangeTanggal = (e) => {
        setTanggal(e.format('LL'))
    }

    const categoryOptions = [];
    dataCategory.map(data => {
        categoryOptions.push(<Select.Option key={data.id} value={`${data.name}|${data.id}`}>{data.name}</Select.Option>)
    })
    const submit = async () =>{
        const splitCategory = category.split('|')
        const data ={
            nama_barang: nama? nama : props.data.nama_barang,
            kategori: splitCategory[0]? splitCategory[0] : props.data.kategori,
            kategori_id: splitCategory[1]? splitCategory[1] : props.data.kategori_id,
            biaya: biaya? biaya : props.data.biaya,
            keterangan: keterangan? keterangan : props.data.keterangan,
            tanggal: tanggal? tanggal : moment(props.data.tanggal).format('LL')
        }
        console.log(data)
        props.updateInventaris({
            id: id,
            token: session.token,
            data: data
        })
    }
    const getCategory = async () => {
        const data = await getAllCategories(session.token)
        setDataCategory(data)
    }
    useEffect(async ()=>{
        await getCategory()
        props.inventarisById({
            token: session.token,
            id: id
        })
    },[])
    useEffect(()=>{
        console.log(props.status, 'Status')
        if(props.status){
            router.push('/inventaris')
        }
    },[props.status])
    return(
        <>
            <Card title='Edit Inventaris'>
                {props.loading? (
                    <Row justify={'center'} align={'middle'}>
                        <Col>
                            <Spin tip={'Loading...'} size="small" />
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Nama Barang
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.data.nama_barang} onChange={onChangeName} placeholder={'Nama'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Kategori
                            </Col>
                            <Col span={16}>
                                <Select defaultValue={`${props.data.kategori}|${props.data.kategori_id}`} onChange={onChangeCategory} placeholder={'Kategori'}  style={{width: '50%'}}>
                                    {categoryOptions}
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Biaya
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.data.biaya} type={'number'} onChange={onChangeBiaya} placeholder={'Biaya'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Keterangan
                            </Col>
                            <Col span={16}>
                                <Input.TextArea defaultValue={props.data.keterangan} onChange={onChangeKeterangan}  placeholder={'Keterangan'}  style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Tanggal
                            </Col>
                            <Col span={16}>
                                <DatePicker  defaultValue={moment(props.data.tanggal)} onChange={onChangeTanggal} placeholder={'Tanggal'} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>

                            </Col>
                            <Col span={16}>
                                <Button type='primary' onClick={submit}>Submit</Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Card>
        </>
    )
}

EditInventaris.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

const mapStateToProps = (state) => {
    return{
        loading: state.inventaris.loading,
        status: state.inventaris.status,
        data: state.inventaris.inventarisData
    }
}

EditInventaris.auth = true

export default connect(mapStateToProps, inventarisDispatch)(EditInventaris)
