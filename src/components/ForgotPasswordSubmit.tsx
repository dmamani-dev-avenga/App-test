// type PropTypes = {
//   updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => void
//   forgotPasswordSubmit: () => void
// }

// function ForgotPasswordSubmit(props: PropTypes) {
function ForgotPasswordSubmit() {
  return (
    <div>
      <input
        name="confirmationCode"
        placeholder="Confirmation code"
        // onChange={(e) => {
        //   e.persist()
        //   props.updateFormState(e)
        // }}
      />
      <input
        name="password"
        placeholder="New password"
        type="password"
        // onChange={(e) => {
        //   e.persist()
        //   props.updateFormState(e)
        // }}
      />
      <button>Save new password</button>
      {/* <button onClick={props.forgotPasswordSubmit}>Save new password</button> */}
    </div>
  )
}

export default ForgotPasswordSubmit
