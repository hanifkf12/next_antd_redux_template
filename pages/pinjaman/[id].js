import React from "react";
import {useRouter} from "next/router";
import LayoutKu from "../../component/layout";

const DetailPinjaman = (props) => {
    const router = useRouter()
    const {id} = router.query;
    return(
        <>
            Hi, {id}
        </>
    )
}

DetailPinjaman.getLayout = function getLayout(page){
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

DetailPinjaman.auth = true;

export default DetailPinjaman
