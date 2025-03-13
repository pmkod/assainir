import { fetch } from "expo/fetch";
import { httpClient } from "./http-client";
// import https from "https";
// import axios from "axios";

interface LoginRequestBody {
  email: string;
  password: string;
}
interface LoginResponseData {
  email: string;
  success: boolean;
  message: string;
}

// const httpClient = axios.create({
//   // fetchOptions: ""
//   // headers: {}
// });
export const loginRequest = async ({ email, password }: LoginRequestBody) => {
  const res = await fetch(
    "https://assainirplus.appli.edu.ci/api/login.php",

    {
      method: "POST",
      mode: "no-cors",

      body: JSON.stringify({
        email,
        mdp: password,
      }),
      headers: {
        Origin: "https://assainirplus.appli.edu.ci",
      },
      // credentials: 'include' // Permet d'envoyer les cookies si nécessaire
    }
  );

  console.log(res);
  console.log(res.status);

  const { message, success } = (await res.json()) as LoginResponseData;
  // const { message, success } = res.data as LoginResponseData;

  return { message, success };
};

interface SignupRequestBody {
  email: string;
  password: string;
}
interface SignupResponseData {
  email: string;
  success: boolean;
  message: string;
}

export const signupRequest = async () => {
  const res = await httpClient.post("inscription.php", {
    json: {},
  });
};

export const passwordReserRequest = () => {
  return httpClient.post("login.php");
};

export const newPasswordReserRequest = () => {
  return httpClient.post("login.php");
};
