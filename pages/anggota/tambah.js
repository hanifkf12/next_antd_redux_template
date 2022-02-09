import LayoutKu from "../../component/layout";
import {Button, Card, Form, Input, Row, Radio, Col, Space, Select} from "antd";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {anggotaDispatch} from "../../redux/anggota/anggota-redux";
import {connect} from "react-redux";

function TambahAnggota(props) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [page, setPage] = useState(1)
    console.log(router.query)
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFinish = values => {
        console.log('Received values of form:', values);
    };
    const provinsiOptions = [];
    props.provinsi.map(data => {
        provinsiOptions.push(<Select.Option key={data.id} value={`${data.nama}|${data.id}`}>{data.nama}</Select.Option>)
    })
    const handleChangeProvinsi = (value) => {
        console.log(value)
        const splitData = value.split('|')
        const id = splitData[1]
        console.log(id)
        props.loadKota(id)
    }
    const kotaOptions = [];
    props.kota.map(data => {
        kotaOptions.push(<Select.Option key={data.id} value={`${data.nama}|${data.id}`}>{data.nama}</Select.Option>)
    })
    const handleChangeKota = (value) => {
        console.log(value)
        const splitData = value.split('|')
        const id = splitData[1]
        console.log(id)
        props.loadKecamatan(id)
    }
    const kelurahanOptions = [];
    props.kelurahan.map(data => {
        kelurahanOptions.push(<Select.Option key={data.id} value={`${data.nama}|${data.id}`}>{data.nama}</Select.Option>)
    })
    const handleChangeKecamatan = (value) => {
        console.log(value)
        const splitData = value.split('|')
        const id = splitData[1]
        console.log(id)
        props.loadKelurahan(id)
    }
    const kecamatanOptions = [];
    props.kecamatan.map(data => {
        kecamatanOptions.push(<Select.Option key={data.id} value={`${data.nama}|${data.id}`}>{data.nama}</Select.Option>)
    })
    const handleChangeKelurahan = (value) => {
        console.log(value)
        const splitData = value.split('|')
        const id = splitData[1]
        console.log(id)
    }

    const addPage = () => {
        let newPage = page;
        newPage++
        setPage(newPage)
        router.push(`${router.pathname}?page=${page}&action=tes`, undefined, {shallow: true})
    }
    const onChangeName = (e) => {
        console.log(e.target.value)
    }
    useEffect(() => {

        console.log('page change, ', page)
    }, [router.query])
    useEffect(() => {
        // Always do navigations after the first render
        props.loadProvinsi();
        router.push(`${router.pathname}?page=${page}`, undefined, {shallow: true})
    }, [])


    return (
        <>
            <Card title='Tambah Anggota Baru'>
                <Row justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Nama
                    </Col>
                    <Col span={16}>
                        <Input  placeholder={'Nama'} onChange={onChangeName} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Nomer KTP
                    </Col>
                    <Col span={16}>
                        <Input placeholder={'Nomer KTP'} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='top'>
                    <Col span={3}>
                        Alamat
                    </Col>
                    <Col span={16}>
                        <Input.TextArea placeholder={'Alamat'} style={{width: '50%'}} />
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        RT/RW
                    </Col>
                    <Col span={16}>
                        <Space style={{width: '100%'}}>
                            <Input style={{width: '100%'}} placeholder={'RT'} />
                            <Input placeholder={'RW'}/>
                        </Space>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Provinsi
                    </Col>
                    <Col span={16}>
                        <Select showSearch style={{width: '50%'}}
                                onChange={handleChangeProvinsi}
                                placeholder={'Pilih Provinsi'}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                        >
                            {provinsiOptions}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Kota/Kabupaten
                    </Col>
                    <Col span={16}>
                        <Select showSearch style={{width: '50%'}}
                                onChange={handleChangeKota}
                                placeholder={'Pilih Kota / Kabupaten'}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                        >
                            {kotaOptions}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Kecamatan
                    </Col>
                    <Col span={16}>
                        <Select showSearch style={{width: '50%'}}
                                onChange={handleChangeKecamatan}
                                placeholder={'Pilih Kecamatan'}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                        >
                            {kecamatanOptions}
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Kelurahan
                    </Col>
                    <Col span={16}>
                        <Select showSearch style={{width: '50%'}}
                                onChange={handleChangeKelurahan}
                                placeholder={'Pilih Kelurahan'}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                        >
                            {kelurahanOptions}
                        </Select>
                    </Col>
                </Row>


                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Instansi
                    </Col>
                    <Col span={16}>
                        <Input placeholder={'Instansi'} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Jenis Kelamin
                    </Col>
                    <Col span={16}>
                        <Select style={{width: '50%'}} placeholder="Jenis Kelamin">
                            <Select.Option value="1">Laki - Laki</Select.Option>
                            <Select.Option value="2">Perempuan</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>

                    </Col>
                    <Col span={16}>
                        <Button type='primary' onClick={addPage}>Submit</Button>
                    </Col>
                </Row>

            </Card>
        </>
    )
}


TambahAnggota.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
TambahAnggota.auth = true

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        provinsi: state.anggota.provinsi,
        kota: state.anggota.kota,
        kecamatan: state.anggota.kecamatan,
        kelurahan: state.anggota.kelurahan,

    }
}

export default connect(mapStateToProps, anggotaDispatch)(TambahAnggota)
