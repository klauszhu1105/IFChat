
let { RespMap } = require('./error')
function respHttp(res, respCode, data) {
    let resp = {
        code: 200,
        data: "",
        message: "success",
    }
    if (respCode != 200) {
        resp.code = respCode
        resp.message = RespMap[respCode]
    } else {
        resp.data = data
    }
    res.json(resp)
}

function RespSuccess(res) {
    respHttp(res, 200)
}

function RespError(res, respCode) {
    respHttp(res, respCode)
}

function RespData(res, data) {
    respHttp(res, 200, data)
}
module.exports = {
    RespSuccess,
    RespError,
    RespData
}
