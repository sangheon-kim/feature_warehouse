import Api from "../restAjax"

class AuthService extends Api {
  constructor(serverName: ServerName) {
    super(serverName)
  }

  async postSMSAuthenticate(body: PostSMSAuthenticateDto) {
    try {
      const res = await this.ajax<PostSMSAuthenticateResponseVO>({
        method: "post",
        url: "/user/sms",
        data: { ...body },
      })

      if (!res || !res.data) throw new Error("NO Result")

      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  async checkSMSAuthenticate(body: CheckSMSAuthenticateDto) {
    try {
      const res = await this.ajax<CheckSMSAuthenticateVO>({
        method: "put",
        url: "/user/sms",
        data: { ...body },
      })

      if (!res) throw new Error("No Result")
      return res.data
    } catch (e) {
      console.error(e)
    }
  }
}

export default new AuthService("playground")
