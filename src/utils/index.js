import axios from 'axios'


const domain = 'https://cqservices.com.au/api/'
export const request = function (url, options) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${domain}${url}`,
      ...options
    }).then(res => {
      console.log(res)
      if (res && res.data.code == 0) {
        resolve(res.data.data || res.data)
      } else {
        reject('网络错误')
      }

    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}
