let debug = process.env.NODE_ENV !== 'production'

let imgDomain
let apiDomain
let apiDomain2
if (process.env.NODE_ENV === 'production') {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'http://php.yunser.com'
    apiDomain2 = 'http://node.api.yunser.com'
} else {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'http://php.api.yun.com'
    // apiDomain = 'http://php.yunser.com'
    apiDomain2 = 'http://localhost:1026'
}

module.exports = {
    imgDomain,
    apiDomain,
    apiDomain2,
    debug
}
