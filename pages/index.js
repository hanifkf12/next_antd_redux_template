import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signOut , getSession } from "next-auth/react"
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "../component/layout";
import LayoutKu from "../component/layout";
import {Card, Col, Row} from "antd";
import {connect} from "react-redux";
import {testDispatch} from "../redux/tes/testRedux";
import {useEffect} from "react";

function Home(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('props, ',props)
  console.log(session)
  useEffect(()=>{
    props.tesDong();
  }, [])
  return (
    <Row gutter={6}>
      <Col span={12}>
        <Row>
          {props.data.map(tes => (
              <Col key={tes.id} span={24}>
                <Card title={tes.original_title} >

                </Card>
              </Col>
          ))}
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
  return {
    tes: state.tes.tes,
    data: state.tes.data
  }
}

Home.auth = true

export default connect(mapStateToProps, testDispatch)(Home)
