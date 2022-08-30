import axios from "axios";

const api = axios.create({
  baseURL: "https://api.scaleserp.com/search?api_key=B9E7BDF7D3024533B62B918CED851541&search_type=shopping&location=Brazil&q=",
});

export default api;