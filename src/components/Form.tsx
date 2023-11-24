import { useState } from "react"
import SignIn from "./SignIn"
import ForgotPassword from "./ForgotPassword"
import ForgotPasswordSubmit from "./ForgotPasswordSubmit"

import { CgSpinnerTwoAlt } from "react-icons/cg"

const Form = () => {
  const [formType, updateFormType] = useState("signIn")
  const [loading, setLoading] = useState(false)

  function renderForm() {
    switch (formType) {
      case "signIn":
        return (
          <SignIn
            // signIn={() => signIn(formState, setUser)}
            // updateFormState={(e) => updateForm(e)}
            updateFormType={updateFormType}
            setLoading={setLoading}
          />
        )
      case "forgotPassword":
        return (
          <ForgotPassword
            // forgotPassword={() => forgotPassword(formState, updateFormType)}
            // updateFormState={(e) => updateForm(e)}
            updateFormType={updateFormType}
          />
        )
      case "forgotPasswordSubmit":
        return (
          <ForgotPasswordSubmit
          // forgotPasswordSubmit={() =>
          //   forgotPasswordSubmit(formState, updateFormType)
          // }
          // updateFormState={(e) => updateForm(e)}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      {loading && (
        <CgSpinnerTwoAlt
          className="text-[2rem] h-[2rem] absolute top-[50vh] right-[50vw] lg:right-[25vw] z-10 text-[#fd771a] animate-spin"
          aria-label="Cargando"
          role="alert"
        />
      )}
      <div
        className="flex flex-col gap-4 text-gray-700 w-full max-w-[350px] relative"
        style={{ opacity: `${loading ? ".2" : "1"}` }}
      >
        {renderForm()}
      </div>
    </>
  )
}

export default Form
