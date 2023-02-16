let hostname = window.location.hostname;
const localUrl = "http://localhost:5000/api";
const liveUrl = "https://dmeter-api.herokuapp.com/api";

let _backend_api;

if (hostname === "localhost") {
    _backend_api = localUrl;
} else {
    _backend_api = liveUrl;
}

export default _backend_api;
