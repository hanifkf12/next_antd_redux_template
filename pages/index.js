import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signOut , getSession } from "next-auth/react"
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "../component/layout";
import LayoutKu from "../component/layout";
import {Card, Col, Row} from "antd";
import {useEffect} from "react";
import {connect} from "react-redux";
import {testDispatch} from "../redux/tes/testRedux";

const Home = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('props, ',props)
  console.log(session)
  useEffect(()=>{
    console.log('tess')
  }, [])
  return (
    <Row gutter={6}>
      <Col span={12} >
        <Row>
          <Col span={24}>
            <Card title={'Simpanan Wajib'}>

            </Card>
          </Col>
        </Row>
        <Row style={{marginTop: '6px'}}>
          <Col span={24}>
            <Card title={'Simpanan Pokok'}>

            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={24}>
            <Card title={'Pemasukan Pinjaman'} >

            </Card>
          </Col>
        </Row>
        <Row style={{marginTop: '6px'}}>
          <Col span={24}>
            <Card title={'Pemasukan Pinjaman'} >

            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Home.getLayout = function getLayout(page) {
  return(
      <LayoutKu>
        {page}
      </LayoutKu>
  )
}

const mapStateToProps = (state) => {
  return{
    tes: state.tes.tes,
    data: state.tes.data
  }
}


Home.auth = true

export default connect(mapStateToProps, testDispatch)(Home)
