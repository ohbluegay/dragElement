import 'isomorphic-fetch'
//fetch
export const fetchBase = (method = 'GET', endPoint = '', params = {}, customeHeaders = {}, backError = 'oneString') => {
    let url = '/api' + endPoint;
    //设置请求头部
    const headers = {
        'Content-Type': 'application/json',
        ...customeHeaders
    }
    const options = { method, headers }
    delete params.queryString
    //请求为各个请求时，对请求参数进行处理
    if (method === 'GET') {
        const queryString = `${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`
        if (url.indexOf('/http/report/query') > -1) {
            url += '?' + encodeURIComponent(params)
        } else {
            url = url + "?" + queryString
        }
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            options.body = `${Object.keys(params).map(k => [k, params[k]].join('=')).join('&')}`
        } else if (headers['Content-Type'] === 'multipart/form-data') {
            delete headers['Content-Type']
            const formData = new FormData()
            Object.keys(params).forEach(key => formData.append(key, params[key]))
            options.body = formData
        } else {
            options.body = JSON.stringify(params)
        }
    }
    return fetch(url, options).then((res) => {
        //错误code码处理
        if (!res.ok) {
            //封装后台返回的错误信息
            if (backError === 'oneString') {
                return res.json().then((e) => {
                    return Promise.reject({ code: e.Code, message: e.Message })
                })
            } else {
                return res.json().then((e) => Promise.reject({ message: e.message }))
            }
        }
        const contentType = res.headers.get('content-type')
            //对返回体进行处理
        if (/json/.test(contentType)) {
            return res.json()
        }
        if (/text/.test(contentType)) {
            return res.text()
        }
        if (/image\/png/.test(contentType)) {
            return res.blob().then((blob) => URL.createObjectURL(blob))
        }
        return null
    })
}

export const setJson = (params) => fetchBase('POST', '/setJson', params)
export const getJson = () => fetchBase('GET', '/getJson')
