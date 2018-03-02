let debug = process.env.NODE_ENV !== 'production'

let imgDomain
let apiDomain
if (process.env.NODE_ENV === 'production') {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'http://php.yunser.com'
} else {
    imgDomain = 'http://120.79.29.47'
    // apiDomain = 'http://php.api.yun.com'
    apiDomain = 'http://php.yunser.com'
}

module.exports = {
    imgDomain,
    apiDomain,
    debug
}
