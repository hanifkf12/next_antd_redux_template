import React from "react";
import LayoutKu from "../../../component/layout";

const SimpananPokok = (props) => {
    return(
        <>sdasda</>
    )
}

SimpananPokok.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

SimpananPokok.auth = true
export default SimpananPokok
