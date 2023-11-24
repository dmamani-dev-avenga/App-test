import { Amplify, Auth, Hub } from "aws-amplify"
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { BsApple, BsBuilding } from "react-icons/bs"
import { BsGoogle } from "react-icons/bs"
import { BsFacebook } from "react-icons/bs"
import { useEffect } from "react"

// import awsConfig from '../aws-exports';

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   // [::1] is the IPv6 localhost address.
//   window.location.hostname === '[::1]' ||
//   // 127.0.0.1/8 is considered localhost for IPv4.
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//   )
// );

// // Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [
//   localRedirectSignIn,
//   productionRedirectSignIn,
// ] = awsConfig.oauth?.redirectSignIn.split(',');

// const [
//   localRedirectSignOut,
//   productionRedirectSignOut,
// ] = awsConfig.oauth.redirectSignOut.split(',');

// const updatedAwsConfig = {
//   ...awsConfig,
//   oauth: {
//     ...awsConfig.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
//   }
// }

// Amplify.configure(updatedAwsConfig);

const SocialLogin = ({ disableField }: { disableField: boolean }) => {
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      const ID_TOKEN = data.signInUserSession.idToken.jwtToken
      const REFRESH_TOKEN = data.signInUserSession.refreshToken.token
      const ACCESS_TOKEN = data.signInUserSession.accessToken.jwtToken
      let loginTokens = {
        idToken: ID_TOKEN,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      }
      let clientId = window.localStorage.getItem("clientId")
      //ToDo////////////////////////
      if (clientId)
        window.localStorage.clear()
      window.location.replace(
        `https://wvpmfeq2o7.execute-api.us-east-1.amazonaws.com/auth/callback?clientId=${clientId}&idToken=${loginTokens.idToken}&accessToken=${loginTokens.accessToken}&refreshToken=${loginTokens.refreshToken}`
      )
    });

    return unsubscribe;
  }, []);

  const handleClick = () => {
    // do something meaningful, Promises, if/else, whatever, and then
    window.location.assign('https://emergencias-idp-dev.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=AzureAD-Test&redirect_uri=http://localhost:5173/&response_type=code&client_id=75mr906vu61ajhbub8i80fubcd&scope=aws.cognito.signin.user.admin email openid phone profile');
  }
  return (
    <section className="flex flex-col justify-stretch gap-5">
      <button
        className="bg-white border-[1px] border-slate-600 rounded-md px-3 py-2 text-center text-slate-600 flex justify-center items-center gap-2 group hover:bg-slate-600 hover:text-white transition"
        disabled={disableField}
        onClick={() => handleClick()}
      >
        <BsBuilding
          className="text-blue-600 group-hover:text-white"
          aria-hidden="true"
        />{" "}
        Ingresar con credenciales corporativas
      </button>
      <button
        className="bg-white border-[1px] border-slate-600 rounded-md px-3 py-2 text-center text-slate-600 flex justify-center items-center gap-2 group hover:bg-slate-600 hover:text-white transition"
        disabled={disableField}
        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}
      >
        <BsFacebook
          className="text-blue-600 group-hover:text-white"
          aria-hidden="true"
        />{" "}
        Ingresar con Facebook
      </button>
      <button
        className="bg-white border-[1px] border-slate-600 rounded-md px-3 py-2 text-center text-slate-600 flex justify-center items-center gap-2 group hover:bg-slate-600 hover:text-white transition"
        disabled={disableField}
        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
      >
        <BsGoogle
          className="text-orange-600 group-hover:text-white"
          aria-hidden="true"
        />
        Ingresar con Google
      </button>
      {/* <button className="bg-slate-600 rounded-md px-3 py-2 text-center text-white flex justify-center items-center gap-2">
        <FcGoogle />
        Ingresar con Google
      </button> */}
      <button
        className="bg-white border-[1px] border-slate-600 rounded-md px-3 py-2 text-center text-slate-600 flex justify-center items-center gap-2 group hover:bg-slate-600 hover:text-white transition"
        disabled={disableField}
        onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple })}
      >
        <BsApple className="group-hover:text-white" aria-hidden="true" />
        Ingresar con Apple
      </button>
    </section>
  )
}

export default SocialLogin
