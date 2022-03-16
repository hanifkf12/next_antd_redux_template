export const searchFilter = (data,params,query)=>{
    const final = data.filter((a) => {
        return a[params].toLowerCase().includes(query) || a[params].includes(query)
    })
    return query? final : data
}

export const searchFilter2 = (data,params1,params2,query)=>{
    const final = data.filter((a) => {
        return a[params1][params2].toLowerCase().includes(query) || a[params1][params2].includes(query)
    })
    return query? final : data
}
export const pinjamanFilter = (data, nama, tahun, status) => {
    const final = data.filter((a) => {
        return a.user.name.toLowerCase().includes(nama) || (a.tahun.includes(tahun) && a.status.includes(status))
    })
    console.log(final)
    return final
}
export const groupFilter = (data, params, params2, query, query2)=>{
    console.log('q1, ', query)
    console.log('q2, ', query2)
    const final = data.filter((a) => {
        return a[params] === query && a[params2] === query2
    })
    console.log('final, ',final)
    console.log('tsss, ', query && query2)
    return query && query2? final : data
}

export const groupFilterSingle = (data, params, query)=>{
    const final = data.filter((a) => {
        return a[params] === query
    })
    return query? final : data
}

export const groupDepartmentFilter = (data, params, query)=>{
    console.log(params)
    const final = data.filter((a) => {
        return a[params] === query
    })
    return query? final : data
}
