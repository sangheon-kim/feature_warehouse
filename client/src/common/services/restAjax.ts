import { AxiosResponse } from "axios"
import axiosClient from "src/common/vendor/axiosConfig"
import { SERVER_URL } from "src/common/services/apiUrl"

interface Ajax {
  method?: "get" | "delete" | "post" | "put" | "patch"
  url?: string
  data?: { [key: string]: any }
  header?: { [key: string]: any }
}

class Api {
  Host: string
  constructor(protected serverName: ServerName) {
    this.Host = SERVER_URL[serverName]

    this.ajax = this.ajax.bind(this)
  }

  private default_header = {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
  }

  ajax<T>({ method = "get", url = "", data = {}, header = {} }: Ajax) {
    let dataKeyArr = Object.keys(data),
      qs = "",
      headers = {
        ...this.default_header,
        ...(Object.keys(header).length > 0 && { ...header }),
      }

    if ((method === "get" || method === "delete") && dataKeyArr.length > 0) {
      // * method가 get이거나 delete면서 서버로 전송할 객체가 있을 경우,
      // * body값 대신 query string으로 변환 처리

      qs =
        "?" +
        dataKeyArr
          .reduce((acc: Array<string>, cur: string) => {
            acc.push(`${cur}=${data[cur]}`)
            return acc
          }, [])
          .join("&")
    }

    return axiosClient({
      method,
      url: `${this.Host}${url}${qs}`,
      ...(method !== "get" && method !== "delete" && { data }),
      headers: { ...headers },
    })
      .then((res: AxiosResponse<T>) => {
        return res
      })
      .catch((err) => console.error(err))
  }
}

export default Api
