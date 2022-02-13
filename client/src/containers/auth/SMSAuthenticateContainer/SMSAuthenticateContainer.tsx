import React from "react"
import AuthService from "src/common/services/Auth/Auth.service"
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
  Button,
  SubmitButton,
} from "src/containers/auth/SMSAuthenticateContainer/SMSAuthenticateContainer.css"

type Props = {}

const SMSAuthenticateContainer: React.FC<Props> = () => {
  const [hashKey, setHashKey] = React.useState("")
  const [isValidate, setValidate] = React.useState(false)
  const PhoneInput = React.createRef<HTMLInputElement>()
  const HashKeyInput = React.createRef<HTMLInputElement>()
  const AuthenticateNumber = React.createRef<HTMLInputElement>()

  const TelNumberClick = React.useCallback(async () => {
    if (!PhoneInput.current) return false

    const result = await AuthService.postSMSAuthenticate({
      phoneNumber: PhoneInput.current.value,
    })

    if (!!result && !!result.hash_key) {
      setHashKey(result.hash_key)
    }
  }, [PhoneInput])

  const checkAuthenticate = React.useCallback(async () => {
    if (
      !PhoneInput.current ||
      !HashKeyInput.current ||
      !AuthenticateNumber.current
    )
      return false

    const result = await AuthService.checkSMSAuthenticate({
      phoneNumber: PhoneInput.current.value,
      hash_key: HashKeyInput.current.value,
      authenticatedNumber: AuthenticateNumber.current.value,
    })

    if (!!result && !!result.isValidate) {
      setValidate(result.isValidate)
    }
  }, [AuthenticateNumber, HashKeyInput, PhoneInput])

  return (
    <section className={Wrapper}>
      <div className={Color}></div>
      <div className={Color}></div>
      <div className={Color}></div>
      <div className={Box}>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Square}></div>
        <div className={Container}>
          <div className={Form}>
            <h2 className={Title}>문자 인증</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={InputBox}>
                <input
                  className={Input}
                  type="text"
                  placeholder="휴대폰 번호"
                  ref={PhoneInput}
                />
                <button className={Button} onClick={TelNumberClick}>
                  인증번호받기
                </button>
              </div>
              <div className={InputBox}>
                <input
                  className={Input}
                  type="text"
                  placeholder="인증 번호"
                  ref={AuthenticateNumber}
                />
                <button className={Button} onClick={checkAuthenticate}>
                  인증하기
                </button>
              </div>
              <input type="hidden" value={hashKey} ref={HashKeyInput} />
              <button className={SubmitButton}>확인</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SMSAuthenticateContainer
