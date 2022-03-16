import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signOut , getSession } from "next-auth/react"
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "../component/layout";
import LayoutKu from "../component/layout";
import {Card, Col, Row} from "antd";

export default function Home(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('props, ',props)
  console.log(session)
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

// export async function getServerSideProps (context) {
//   const {data: data} = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   const session = await getSession(context)
//   console.log('my=session, ',session)
//   console.log(data)
//   return {
//     props: {
//       name: "hanif",
//       data: data
//     }, // will be passed to the page component as props
//   }
// }

Home.auth = true
