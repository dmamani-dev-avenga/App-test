import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"
import "./index.css"

import { Amplify } from "aws-amplify"
import awsExports from "./aws-exports"

//Todo:FileConfig
const awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_JSGrwY8pL",
  "aws_user_pools_web_client_id": "75mr906vu61ajhbub8i80fubcd",
  "oauth": {
      "domain": "emergencias-idp-dev.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "https://dev.d2z0e7l40kje54.amplifyapp.com",
      "redirectSignOut": "https://dev.d2z0e7l40kje54.amplifyapp.com",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [
      "APPLE",
      "FACEBOOK",
      "GOOGLE"
  ],
  "aws_cognito_signup_attributes": [
      "GIVEN_NAME",
      "FAMILY_NAME",
      "PREFERRED_USERNAME",
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OPTIONAL",
  "aws_cognito_mfa_types": [
      "TOTP"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 10,
      "passwordPolicyCharacters": [
          "REQUIRES_LOWERCASE",
          "REQUIRES_UPPERCASE",
          "REQUIRES_NUMBERS",
          "REQUIRES_SYMBOLS"
      ]
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};


Amplify.configure(awsmobile)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
