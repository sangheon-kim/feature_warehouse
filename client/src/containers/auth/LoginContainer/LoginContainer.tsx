import React from "react"
import {
  Wrapper,
  Color,
  Box,
  Container,
  Form,
  Title,
  InputBox,
  Input,
  Forget,
  Square,
} from "src/containers/auth/SMSAuthenticateContainer/SMSAuthenticateContainer.css"

type Props = {}

const SMSAuthenticateContainer: React.FC<Props> = () => {
  return (
    <section className={Wrapper}>
      <div className={Color}></div>
      <div className={Color}></div>
      <div className={Color}>123</div>
      <div className={Box}>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Container}>
          <div className={Form}>
            <h2 className={Title}>Login Form</h2>
            <form>
              <div className={InputBox}>
                <input className={Input} type="text" placeholder="Username" />
              </div>
              <div className={InputBox}>
                <input
                  className={Input}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className={InputBox}>
                <input className={Input} type="submit" value="Login" />
              </div>
              <p className={Forget}>
                Forgot Password ?<a href="#">Click Here</a>
              </p>
              <p className={Forget}>
                Don`t have an account ?<a href="#">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SMSAuthenticateContainer
