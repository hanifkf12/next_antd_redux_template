import LayoutKu from "../../component/layout";
import {Button, Card, Form, Input, Row, Radio, Col, Space, Select, DatePicker} from "antd";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {anggotaDispatch} from "../../redux/anggota/anggota-redux";
import {connect} from "react-redux";
import {useSession} from "next-auth/react";
import {tambahAnggota} from "../../service/service_anggota";
import moment from "moment";

function TambahAnggota(props) {
    const [form] = Form.useForm();
    const router = useRouter();
    const { data: session } = useSession()
    const [page, setPage] = useState(1)
    const [nama, setNama] = useState('')
    const [noKtp, setNoKtp] = useState('')
    const [alamat, setAlamat] = useState('')
    const [rw, setRt] = useState('')
    const [rt, setRw] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kota, setKota] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kelurahan, setKelurahan] = useState('')
    const [instansi, setInstansi] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('')
    const [telepon, setTelepon] = useState('')
    const [email, setEmail] = useState('')
    const [statusPerkawinan, setStatusPerkawinan] = useState('')
    const [tempatLahir, setTempatLahir] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')

    const [formLayout, setFormLayout] = useState('horizontal');

    const provinsiOptions = [];
    props.provinsi.map(data => {
        provinsiOptions.push(<Select.Option key={data.id} value={`${data.nama}|${data.id}`}>{data.nama}</Select.Option>)
    })
    const handleChangeProvinsi = (value) => {
        console.log(value)
        const splitData = value.split('|')
        const id = splitData[1]
        console.log(id)
        setProvinsi(splitData[0])
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
        setKota(splitData[0])
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
        setKecamatan(splitData[0])
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
        setKelurahan(splitData[0])
        console.log(id)
    }


    const onChangeName = (e) => {
        // console.log(e.target.value)
        setNama(e.target.value)
    }

    const onChangeKtp = (e) => {
        setNoKtp(e.target.value)
    }
    const onChangeTelepon = (e) => {
        setTelepon(e.target.value)
    }
    const onChangeAlamat = (e) => {
        // console.log(e.target.value)
        setAlamat(e.target.value)
    }
    const onChangeRt = (e) => {
        setRt(e.target.value)
    }
    const onChangeRw = (e) => {
        setRw(e.target.value)
    }
    const onChangeInstansi = (e) => {
        setInstansi(e.target.value)
    }
    const onChangeJenisKelamin = (e) => {
        console.log(e)
        setJenisKelamin(e)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangeTempatLahir = (e) => {
        setTempatLahir(e.target.value)
    }
    const onChangeTanggalLahir = (date, dateString) => {
        console.log(date.format('LLLL'))
        // console.log(dateString)
        setTanggalLahir(date.format('LL'))
        // setTanggalLahir(e.target.value)
    }
    const onChangeStatusPerkawinan = (e) => {
        setStatusPerkawinan(e)
    }
    useEffect(() => {
        // Always do navigations after the first render
        props.loadProvinsi();
        // router.push(`${router.pathname}?page=${page}`, undefined, {shallow: true})
    }, [])
    useEffect(()=>{
        if(props.status){
            router.push('/anggota')
        }
    },[props.status])
    const submit  = async () => {
        const data = {
            name: nama,
            no_ktp: noKtp,
            instansi: instansi,
            phone: telepon,
            status: "active",
            alamat: alamat,
            rt_rw: `${rt}/${rw}`,
            kelurahan: kelurahan,
            kecamatan: kecamatan,
            kota_kabupaten: kota,
            propinsi: provinsi,
            email: email,
            status_perkawinan: statusPerkawinan,
            jenis_kelamin: jenisKelamin,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir
        }
        console.log(data)
        props.tambahAnggota({
            token: session.token,
            data: data
        })
    }

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
                        <Input placeholder={'Nomer KTP'} onChange={onChangeKtp} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Nomer Telepon
                    </Col>
                    <Col span={16}>
                        <Input placeholder={'Nomer Telepon'} onChange={onChangeTelepon} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Email
                    </Col>
                    <Col span={16}>
                        <Input placeholder={'Email'} onChange={onChangeEmail} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                       Tempat Tanggal Lahir
                    </Col>
                    <Col span={16}>
                        <Space style={{width: '100%'}}>
                            <Input style={{width: '100%'}} onChange={onChangeTempatLahir} placeholder={'Tempat Lahir'} />
                            <DatePicker onChange={onChangeTanggalLahir} locale={'id'} />
                        </Space>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='top'>
                    <Col span={3}>
                        Alamat
                    </Col>
                    <Col span={16}>
                        <Input.TextArea placeholder={'Alamat'} onChange={onChangeAlamat} style={{width: '50%'}} />
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        RT/RW
                    </Col>
                    <Col span={16}>
                        <Space style={{width: '100%'}}>
                            <Input style={{width: '100%'}} onChange={onChangeRt} placeholder={'RT'} />
                            <Input placeholder={'RW'} onChange={onChangeRw}/>
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
                        <Input placeholder={'Instansi'} onChange={onChangeInstansi} style={{width: '50%'}}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Jenis Kelamin
                    </Col>
                    <Col span={16}>
                        <Select onChange={onChangeJenisKelamin} style={{width: '50%'}} placeholder="Jenis Kelamin">
                            <Select.Option value="Laki - Laki">Laki - Laki</Select.Option>
                            <Select.Option value="Perempuan">Perempuan</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                    <Col span={3}>
                        Status Perkawinan
                    </Col>
                    <Col span={16}>
                        <Select onChange={onChangeStatusPerkawinan} style={{width: '50%'}} placeholder="Status Perkawinan">
                            <Select.Option value="Kawin">Kawin</Select.Option>
                            <Select.Option value="Tidak Kawin">Tidak Kawin</Select.Option>
                            <Select.Option value="Cerai">Cerai</Select.Option>
                        </Select>
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
        loading: state.anggota.loading,
        status: state.anggota.status

    }
}

export default connect(mapStateToProps, anggotaDispatch)(TambahAnggota)
