import React, {useEffect, useState} from "react";
import LayoutKu from "../../component/layout";
import {Button, Card, Col, DatePicker, Input, Row, Select} from "antd";
import {getAllCategories, saveData} from "../../service/service_inventaris";
import {useSession} from "next-auth/react";
import {inventarisDispatch} from "../../redux/inventaris_redux";
import {connect} from "react-redux";
import {useRouter} from "next/router";

const TambahInventaris = (props) => {
    const router = useRouter()
    const { data: session } = useSession()
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
            nama_barang: nama,
            kategori: splitCategory[0],
            kategori_id: splitCategory[1],
            biaya: biaya,
            keterangan: keterangan,
            tanggal: tanggal
        }
        console.log(data)
        props.saveInventaris({
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
    },[])

    useEffect(()=>{
        console.log(props.status)
        if(props.status){
            router.replace('/inventaris')
        }
    },[props.status])
    return(
        <>
            <Card title='Tambah Data Inventaris'>
                <Row justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Nama Barang
                    </Col>
                    <Col span={16}>
                        <Input onChange={onChangeName} placeholder={'Nama'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Kategori
                    </Col>
                    <Col span={16}>
                        <Select onChange={onChangeCategory} placeholder={'Kategori'}  style={{width: '50%'}}>
                            {categoryOptions}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Biaya
                    </Col>
                    <Col span={16}>
                        <Input type={'number'} onChange={onChangeBiaya} placeholder={'Biaya'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Keterangan
                    </Col>
                    <Col span={16}>
                        <Input.TextArea onChange={onChangeKeterangan}  placeholder={'Keterangan'}  style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Tanggal
                    </Col>
                    <Col span={16}>
                        <DatePicker  onChange={onChangeTanggal} placeholder={'Tanggal'} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>

                    </Col>
                    <Col span={16}>
                        <Button type='primary' onClick={submit}>Submit</Button>
                    </Col>
                </Row>

            </Card>
        </>
    )
}

TambahInventaris.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

TambahInventaris.auth = true

const mapStateToProps = (state) => {
    return{
        loading: state.inventaris.loading,
        status: state.inventaris.status,
    }
}

export default connect(mapStateToProps, inventarisDispatch)(TambahInventaris)
