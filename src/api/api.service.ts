import axios from "axios";

const BASE_URL = "https://api.github.com/";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export { axiosClient };
