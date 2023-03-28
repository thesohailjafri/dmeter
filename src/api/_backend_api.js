let hostname = window.location.hostname;
const localUrl = process.env.REACT_APP_LOCAL_SERVER;
const liveUrl = process.env.REACT_APP_LIVE_SERVER;

let _backend_api;

if (hostname === "localhost") {
    _backend_api = localUrl;
} else {
    _backend_api = liveUrl;
}

_backend_api += "api";

export default _backend_api;
