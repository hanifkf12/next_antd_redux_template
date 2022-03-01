import React from "react";
import LayoutKu from "../../../component/layout";

const ApprovalPinjamanDetail = (props) => {
    return (
        <>
            Tess Detail
        </>
    )
}
ApprovalPinjamanDetail.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

ApprovalPinjamanDetail.auth = true
export default ApprovalPinjamanDetail
