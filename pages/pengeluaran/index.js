import React from "react";
import {Card} from "antd";
import LayoutKu from "../../component/layout";

const Pengeluaran = (props) => {
    return(
        <>
            <Card>
                Tesss
            </Card>
        </>
    )
}
Pengeluaran.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

Pengeluaran.auth = true
export default Pengeluaran
