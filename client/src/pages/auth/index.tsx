/* eslint-disable @next/next/no-page-custom-font */
import type { GetStaticPropsContext, NextPage } from "next"
import React from "react"
import Head from "next/head"
import wrapper from "src/store/configureStore"
import SMSAuthenticateContainer from "src/containers/auth/SMSAuthenticateContainer/SMSAuthenticateContainer"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const AuthPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>인증 관련</title>
      </Head>
      <SMSAuthenticateContainer />
    </React.Fragment>
  )
}

export default AuthPage

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (ctx: GetStaticPropsContext) => {
    const { locale } = ctx

    try {
      return {
        props: {
          ...(await serverSideTranslations(locale as string, ["common"])),
        },
      }
    } catch (error) {
      return {
        props: {},
      }
    }
  }
)
