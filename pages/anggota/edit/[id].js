
import {Button, Card, Form, Input, Row, Radio, Col, Space, Select, DatePicker, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {connect} from "react-redux";
import {useSession} from "next-auth/react";
import moment from "moment";
import LayoutKu from "../../../component/layout";
import {anggotaDispatch} from "../../../redux/anggota/anggota-redux";
import {EditConfirmationModal} from '../../../component/my_modal'

function EditAnggota(props) {
    const router = useRouter();
    const {id} = router.query
    const { data: session } = useSession()
    const [page, setPage] = useState(1)
    const [nama, setNama] = useState('')
    const [noKtp, setNoKtp] = useState('')
    const [alamat, setAlamat] = useState('')
    const [rt, setRt] = useState('')
    const [rw, setRw] = useState('')
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
    const [statusAnggota, setStatusAnggota] = useState('')

    const [formLayout, setFormLayout] = useState('horizontal');
    const [confirmationVisibility, setConfirmationVisibility] = useState(false)

    const showConfirmation = () => {
        setConfirmationVisibility(true)
    }
    const hideConfirmation = () => {
        setConfirmationVisibility(false)
    }
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
        console.log(e.target.value)
        setRt(e.target.value)
    }
    const onChangeRw = (e) => {
        console.log(e.target.value)
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
    const onChangeStatusAnggota = (e) => {
        setStatusAnggota(e)
    }
    useEffect(() => {
        props.anggotaById({
            id: id,
            token: session.token
        })
        // Always do navigations after the first render
        props.loadProvinsi();
        // router.push(`${router.pathname}?page=${page}`, undefined, {shallow: true})
    }, [])
    useEffect(async ()=>{
        if(props.status){
            router.replace('/anggota')
        }
    },[props.status])
    const submit  = async () => {
        console.log(rt)
        console.log(rw)
        const data = {
            name: nama? nama: props.dataAnggota.name,
            no_ktp: noKtp? noKtp: props.dataAnggota.no_ktp,
            instansi: instansi? instansi: props.dataAnggota.instansi,
            phone: telepon? telepon: props.dataAnggota.phone,
            status: statusAnggota? statusAnggota : props.dataAnggota.status,
            alamat: alamat? alamat: props.dataAnggota.alamat,
            rt_rw: rt||rw ? `${rt}/${rw}` : props.dataAnggota.rt_rw,
            kelurahan: kelurahan? kelurahan: props.dataAnggota.kelurahan,
            kecamatan: kecamatan? kecamatan: props.dataAnggota.kecamatan,
            kota_kabupaten: kota? kota: props.dataAnggota.kota_kabupaten,
            propinsi: provinsi? provinsi: props.dataAnggota.propinsi,
            email: email? email: props.dataAnggota.email,
            status_perkawinan: statusPerkawinan? statusPerkawinan: props.dataAnggota.status_perkawinan,
            jenis_kelamin: jenisKelamin? jenisKelamin: props.dataAnggota.jenis_kelamin,
            tempat_lahir: tempatLahir? tempatLahir: props.dataAnggota.tempat_lahir,
            tanggal_lahir: tanggalLahir? tanggalLahir: props.dataAnggota.tanggal_lahir
        }
        console.log(data)
        props.updateAnggota({
            token: session.token,
            id: id,
            data: data
        })
        hideConfirmation()
    }

    return (
        <>
            <EditConfirmationModal show={confirmationVisibility} hide={hideConfirmation} title={'Pengeluaran'} confirm={submit}/>
            {props.loading ? (
                <Row justify={'center'} align={'middle'}>
                    <Col>
                        <Spin tip={'Loading...'} size="small"/>
                    </Col>
                </Row>
            ) : (
                <>
                    <Card title='Edit Data Anggota'>
                        <Row justify={"start"} align={'middle'}>
                            <Col span={3}>
                                Nama
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.dataAnggota.name} placeholder={'Nama'} onChange={onChangeName} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Nomer KTP
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.dataAnggota.no_ktp} placeholder={'Nomer KTP'} onChange={onChangeKtp} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Nomer Telepon
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.dataAnggota.phone} placeholder={'Nomer Telepon'} onChange={onChangeTelepon} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Email
                            </Col>
                            <Col span={16}>
                                <Input defaultValue={props.dataAnggota.email} placeholder={'Email'} onChange={onChangeEmail} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Tempat Tanggal Lahir
                            </Col>
                            <Col span={16}>
                                <Space style={{width: '100%'}}>
                                    <Input defaultValue={props.dataAnggota.tempat_lahir} style={{width: '100%'}} onChange={onChangeTempatLahir} placeholder={'Tempat Lahir'} />
                                    <DatePicker defaultValue={moment(props.dataAnggota.tanggal_lahir)} onChange={onChangeTanggalLahir} locale={'id'} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='top'>
                            <Col span={3}>
                                Alamat
                            </Col>
                            <Col span={16}>
                                <Input.TextArea defaultValue={props.dataAnggota.alamat} placeholder={'Alamat'} onChange={onChangeAlamat} style={{width: '50%'}} />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                RT/RW
                            </Col>
                            <Col span={16}>
                                <Space style={{width: '100%'}}>
                                    <Input defaultValue={props.dataAnggota.rt_rw.split('/')[0]}style={{width: '100%'}} onChange={onChangeRt} placeholder={'RT'} />
                                    <Input defaultValue={props.dataAnggota.rt_rw.split('/')[1]}placeholder={'RW'} onChange={onChangeRw}/>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Provinsi
                            </Col>
                            <Col span={16}>
                                <Select defaultValue={props.dataAnggota.propinsi} showSearch style={{width: '50%'}}
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
                                <Select defaultValue={props.dataAnggota.kota_kabupaten} showSearch style={{width: '50%'}}
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
                                <Select defaultValue={props.dataAnggota.kecamatan} showSearch style={{width: '50%'}}
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
                                <Select defaultValue={props.dataAnggota.kelurahan} showSearch style={{width: '50%'}}
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
                                <Input defaultValue={props.dataAnggota.instansi} placeholder={'Instansi'} onChange={onChangeInstansi} style={{width: '50%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Jenis Kelamin
                            </Col>
                            <Col span={16}>
                                <Select defaultValue={props.dataAnggota.jenis_kelamin} onChange={onChangeJenisKelamin} style={{width: '50%'}} placeholder="Jenis Kelamin">
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
                                <Select defaultValue={props.dataAnggota.status_perkawinan} onChange={onChangeStatusPerkawinan} style={{width: '50%'}} placeholder="Status Perkawinan">
                                    <Select.Option value="Kawin">Kawin</Select.Option>
                                    <Select.Option value="Tidak Kawin">Tidak Kawin</Select.Option>
                                    <Select.Option value="Cerai">Cerai</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>
                                Status Keanggotaan
                            </Col>
                            <Col span={16}>
                                <Select defaultValue={props.dataAnggota.status} onChange={onChangeStatusAnggota} style={{width: '50%'}} placeholder="Status Perkawinan">
                                    <Select.Option value="active">Aktif</Select.Option>
                                    <Select.Option value="non-active">Tidak Aktif</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}} justify={"start"} align='middle'>
                            <Col span={3}>

                            </Col>
                            <Col span={16}>
                                <Button type='primary' onClick={showConfirmation}>Submit</Button>
                            </Col>
                        </Row>


                    </Card>
                </>
            )}
        </>
    )
}


EditAnggota.getLayout = function getLayout(page) {
    return (
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}
EditAnggota.auth = true

const mapStateToProps = (state) => {
    console.log(state.anggota.dataAnggota)
    return {
        provinsi: state.anggota.provinsi,
        kota: state.anggota.kota,
        kecamatan: state.anggota.kecamatan,
        kelurahan: state.anggota.kelurahan,
        dataAnggota: state.anggota.dataAnggota,
        status: state.anggota.status,
        loading: state.anggota.loading,

    }
}

export default connect(mapStateToProps, anggotaDispatch)(EditAnggota)
