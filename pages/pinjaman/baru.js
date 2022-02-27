import React from "react";
import LayoutKu from "../../component/layout";
import {Card, Col, Input, Row} from "antd";


const TambahPinjaman = (props) => {
    return(
        <>
            <Card title='Pengajuan Pinjaman'>
                <Row justify={"start"} align={'middle'}>
                    <Col span={3}>
                        Nama
                    </Col>
                    <Col span={16}>
                        <Input  placeholder={'Nama'} style={{width: '50%'}}/>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

TambahPinjaman.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

TambahPinjaman.auth = true


export default TambahPinjaman
