import React, { useState, useEffect, useRef } from "react"
import { BiSolidErrorCircle } from "react-icons/bi"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { AiOutlineEye } from "react-icons/ai"
import SocialLogin from "./SocialLogin"

import { Auth } from "aws-amplify"

type SigninPropsType = {
  updateFormType: (e: string) => void
  setLoading: (e: boolean) => void
  // signIn: (username: string, password: string) => void
}

type SignInUserSessionType = {
  idToken: string
  refreshToken: string
  accessToken: string
}

const SignIn = ({ updateFormType, setLoading }: SigninPropsType) => {
  // const SignIn = ({ signIn, updateFormType }: SigninPropsType) => {
  // const SignIn = ({ signIn, , updateFormType, updateFormState }: SigninPropsType) => {
  const [showPass, setShowPass] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [signInError, setSignInError] = useState(false)
  const [appHeaders, setAppHeaders] = useState("")
  const [disableField, setDisableField] = useState(false)
  const [loginTokens, setLoginTokens] = useState<SignInUserSessionType | null>(
    null
  )

  const emailField = useRef<HTMLInputElement>(null)
  const passField = useRef<HTMLInputElement>(null)

  const signIn = async (username: string, password: string) => {
    setDisableField(true)
    setLoading(true)
    try {
      const user = await Auth.signIn(username, password)
      const ID_TOKEN = user.signInUserSession.idToken.jwtToken
      const REFRESH_TOKEN = user.signInUserSession.refreshToken.token
      const ACCESS_TOKEN = user.signInUserSession.accessToken.jwtToken
      setLoginTokens({
        idToken: ID_TOKEN,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      })
    } catch (error) {
      setSignInError(true)
    } finally {
      setDisableField(false)
      setLoading(false)
    }
  }

  const logIn = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await signIn(user, pass)
    } catch (error) {
      // console.log(error)
    }
    // setUser("")
    // setPass("")
  }

  useEffect(() => {
    // const myHeaders = new Headers()
    // const clientIdHeader = myHeaders.get("client_id")

    const params = new URLSearchParams(document.location.search)
    const clientIdParam = params.get("clientId")
    if (clientIdParam) {
      setAppHeaders(clientIdParam)
      window.localStorage.setItem("clientId", clientIdParam)
    }
  }, [])

  useEffect(() => {
    emailField.current?.addEventListener("input", () => {
      if (emailField.current?.validity.typeMismatch) {
        emailField.current.setCustomValidity(
          "Por favor introduzca un email válido"
        )
      } else {
        emailField.current?.setCustomValidity("")
      }
    })

    // return () => emailField.current?.removeEventListener("input")
  }, [])

  // Redirection to AWS end-point
  useEffect(() => {
    if (loginTokens !== null) {
      window.location.replace(
        `https://wvpmfeq2o7.execute-api.us-east-1.amazonaws.com/auth/callback?clientId=${appHeaders}&idToken=${loginTokens.idToken}&accessToken=${loginTokens.accessToken}&refreshToken=${loginTokens.refreshToken}`
      )
    }
  }, [loginTokens])

  const customMessage = () => {
    if (emailField.current?.validity.valueMissing) {
      emailField.current.setCustomValidity("Este campo debe ser completado")
    }
    if (passField.current?.validity.valueMissing) {
      passField.current.setCustomValidity("Este campo debe ser completado")
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 text-gray-700"
        onSubmit={(e) => logIn(e)}
      >
        {signInError && (
          <div
            className={`p-6 pl-4 border-solid border-[1px] border-red-600 text-red-600 bg-white rounded-md flex gap-2`}
            role="alert"
          >
            <div>
              <BiSolidErrorCircle className="text-red-600 text-4xl" />
            </div>
            <p>
              Su usuario y/o contraseña es incorrecta. Intente nuevamente. Si no
              recuerda su contraseña puede ir al formulario de recuperación de
              cuenta.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="username">E-mail</label>
          <input
            ref={emailField}
            type="email"
            name="username"
            id="username"
            required
            onChange={(e) => {
              setUser(e.target.value)
              setSignInError(false)
              // e.persist()
              // updateFormState(e)
            }}
            // onInvalid={() => {
            //   console.log("este mail no es valido")
            // }}
            placeholder="ingrese su correo electrónico"
            className="border border-1 border-gray-400 rounded-md px-3 py-2"
            autoFocus
            value={user}
            disabled={disableField}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Contraseña</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            required
            onChange={(e) => {
              setPass(e.target.value)
              setSignInError(false)
              // e.persist()
              // updateFormState(e)
            }}
            placeholder="ingrese su contraseña"
            className="w-full border border-1 border-gray-400 rounded-md px-3 py-2 passInput"
            value={pass}
            ref={emailField}
            disabled={disableField}
          />
          <button
            type="button"
            className="flex gap-2 items-center group"
            onClick={() => setShowPass(!showPass)}
            disabled={disableField}
            aria-label={showPass ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {showPass ? (
              <AiOutlineEyeInvisible aria-hidden="true" />
            ) : (
              <AiOutlineEye aria-hidden="true" />
            )}{" "}
            {showPass ? (
              <span
                className="text-sm group-hover:underline"
                aria-hidden="true"
              >
                Ocultar contraseña
              </span>
            ) : (
              <span className="text-sm group-hover:underline">
                Ver contraseña
              </span>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full text-center text-white bg-[#fd771a] rounded-md px-3 py-2 hover:bg-[#AC5D25] transition mt-2"
          onClick={customMessage}
        >
          Iniciar sesión
        </button>
      </form>
      <section className="mx-auto">
        <button
          onClick={() => updateFormType("forgotPassword")}
          className="underline"
          disabled={disableField}
          style={{ opacity: `${disableField ? ".4" : "1"}` }}
        >
          Olvidé mi contraseña
        </button>
      </section>
      <div className="w-full flex justify-center relative before:top-2/4 before:absolute before:block before:h-[1px] before:w-[80%] before:mx-auto before:bg-slate-300">
        <p className="relative z-10 text-center bg-white p-2 rounded-full">
          o utilice sus redes sociales
        </p>
      </div>
      <div>{ }</div>
      <SocialLogin disableField={disableField} />
    </>
  )
}

export default SignIn
