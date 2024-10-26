import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://blog-29d47-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
