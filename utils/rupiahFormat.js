import convertRupiah from "rupiah-format";
import angkaTerbilang from '@develoka/angka-terbilang-js'

const formatRupiah = (value) => {
    const value1 = convertRupiah.convert(value).replace(',00','')
    return value1.replace('Rp.', 'Rp')
}

const nominalToWord = (value) => {
    const value1 = angkaTerbilang(value)
    return `${value1} rupiah`
}
module.exports = {
    formatRupiah,
    nominalToWord
}
