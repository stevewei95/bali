import config from '../config'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
}

export const promisic = (func) => {
  const closure = (params = {}) => {
    /* eslint-disable no-new */
    new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        },
      })
      func(args)
    })
  }
  return closure
}

class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: `${config.api_base_url}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          this._showError(res.data.error_code)
        }
      },
      // API 调用失败
      fail: () => {
        reject()
        this._showError(1)
      },
    })
  }

  _showError(errorCode) {
    const tip = tips[errorCode || 1]
    wx.showToast({
      title: tip || tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}

export default HTTP
