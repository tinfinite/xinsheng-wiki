import axios from 'axios'
import PREFIX from './config'

export default {
  checkParams (params) {
    if (!params.url) {
      throw new Error('无效的请求地址')
    }
  },
  get (params, successCallback, errorCallback) {
    this.checkParams(params)
    axios({
      method: 'get',
      url: PREFIX + params.url,
      headers: params.headers,
      data: params.data
    }).then((res) => {
      successCallback(res.data)
    }).catch((error) => {
      console && console.error('get', params, error)
      errorCallback && errorCallback(error)
      throw new Error('Request fail: ' + PREFIX + params.url)
    })
  },
  post (params, successCallback, errorCallback) {
    this.checkParams(params)
    axios({
      method: 'post',
      url: PREFIX + params.url,
      headers: params.headers,
      data: params.data
    }).then((res) => {
      successCallback(res.data)
    }).catch((error) => {
      console && console.error('get', params, error)
      errorCallback && errorCallback(error)
      throw new Error('Request fail: ' + PREFIX + params.url)
    })
  }
}
