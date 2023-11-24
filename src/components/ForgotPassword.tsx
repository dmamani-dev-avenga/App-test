// import { FormState } from "./Form"

// type PropType = {
//   updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void
//   forgotPassword: () => void
// }

type ForgotPasswordProps = {
  updateFormType: (e: string) => void
}

// function ForgotPassword(props: PropType) {
function ForgotPassword({ updateFormType }: ForgotPasswordProps) {
  return (
    <>
      <form className="flex flex-col gap-4 text-gray-700">
        {/* <input
        name="username"
        placeholder="Username"
        // onChange={(e) => {
        //   e.persist()
        //   props.updateFormState(e)
        // }}
      /> */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username">E-mail</label>
          <input
            name="username"
            id="username"
            required
            onChange={(e) => {
              e.persist()
              // updateFormState(e)
            }}
            placeholder="su_mail@mail.com"
            className="border border-1 border-gray-400 rounded-md px-3 py-2"
            autoFocus
          />
        </div>
        <button
          type="button"
          // onClick={signIn}
          className="w-full text-center text-white bg-[#fd771a] rounded-md px-3 py-2 hover:bg-[#AC5D25] transition mt-2"
        >
          Recuperar cuenta
        </button>
        {/* <button onClick={props.forgotPassword}>Reset password</button> */}
      </form>
      <a
        onClick={() => updateFormType("signIn")}
        className="underline cursor-pointer text-center mt-6"
      >
        Volver al formulario de ingreso
      </a>
    </>
  )
}

export default ForgotPassword
