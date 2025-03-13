import ky, { HTTPError } from "ky";
import { baseApiUrl } from "../config";

export const httpClient = ky.create({
  prefixUrl: baseApiUrl,
  mode: "no-cors",
  // credentials: "omit",
  // integrity: ,
  // timeout: false,
  timeout: 1000000,

  hooks: {
    beforeRequest: [
      async (request) => {
        console.log(request.url);
        return request;
        // const userAgent = await Constants.getWebViewUserAgentAsync();
        // if (userAgent) {
        //   request.headers.set("User-Agent", userAgent);
        // }
        // const sessionId = SecureStore.getItem(sessionIdFieldName);
        // if (sessionId) {
        //   request.headers.set("Authorization", "Session " + sessionId);
        // }
      },
    ],
    beforeError: [
      async (error: HTTPError) => {
        const { response } = error;
        if (response) {
          // const res = await response.json();
          console.log(response);
        }
        console.log(error.message);

        return error;
      },
    ],
    // afterResponse: [
    //   async (request, options, response) => {
    //     if (request.url.endsWith("auth/logout") && response.ok) {
    //       await SecureStore.deleteItemAsync(sessionIdFieldName);
    //     }
    //   },
    // ],
  },
});
