import axios from 'axios'

const ERR_OK = 0
axios.defaults.baseURL =
  import.meta.env.MODE === 'production' ? 'http://ustbhuangyi.com/music-next/' : '/'
export function get(url, params) {
  return axios
    .get(url, {
      params
    })
    .then((res) => {
      const serverData = res.data
      if (serverData.code === ERR_OK) {
        return serverData.result
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
