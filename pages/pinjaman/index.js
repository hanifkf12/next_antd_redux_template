import React from "react";
import LayoutKu from "../../component/layout";

const Pinjaman = (props) => {
    return(
        <>Tess</>
    )
}

Pinjaman.getLayout = function getLayout(page) {
    return(
        <LayoutKu>
            {page}
        </LayoutKu>
    )
}

Pinjaman.auth = true

export default Pinjaman
