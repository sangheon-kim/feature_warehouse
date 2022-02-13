import axios, { AxiosError } from "axios"

const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
})

axiosClient.interceptors.request.use(function (request) {
  return request
}, console.error)

axiosClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ msg: string }>) => {
    // 에러 코드 처리
    switch (error.response?.status) {
      case 401:
        console.log("미인증 처리 하자")
        break
      case 404:
        console.log("잘못 조회한 것 같은데?")
        break
    }

    switch (error.response?.data.msg) {
      case "A Error":
        console.log("A Error 처리")
        break
      case "B Error":
        console.log("B Error 처리")
        break
    }

    return Promise.reject(error)
  }
)

export default axiosClient
