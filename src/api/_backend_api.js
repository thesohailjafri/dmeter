let hostname = window.location.hostname
const localUrl = 'http://localhost:5000/'

const liveUrl = '/'

let _backend_api

if (hostname === 'localhost') {
  _backend_api = localUrl
} else {
  _backend_api = liveUrl
}

_backend_api += 'api'

export default _backend_api
