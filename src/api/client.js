import axios from "axios";
import { Buffer } from 'buffer';

let state = {
  CLIENT: false,
  token: false,
};

let CLIENT = (logIn = false) => {
  // if (logIn) {
  //   // this part is special case if there is no token saved or the session expired
  //   let data = new URLSearchParams();
  //   data.append("Email", "test@test.com");
  //   data.append("Subscription", "basic");

  //   axios({
  //     method: "post",
  //     url: process.env.REACT_APP_BASE_URL+"/auth/access_token",
  //     headers: {
  //       Authorization: `Basic ${Buffer.from(
  //         `${process.env.REACT_APP_user}:${process.env.REACT_APP_pass}`
  //       ).toString("base64")}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: data,
  //   })
  //     .then((response) => {

  //       console.group(response)
  //       localStorage.setItem("token", response?.data?.access_token);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   return;
  // }

  // const token = localStorage.getItem("token");

  // if (!state.CLIENT || !state.token || state.token !== token) {
  //   if (!state.token || state.token !== token) {
  //     console.log("take the token from the storage");
  //     state.token = token;
  //   }

  //   console.log("NewClient");
    //create client save it then return it //HAPPENED FOR THE FIRST TIME or there is new token
    const client = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers:
      //  state.token
      //   ? 
        {
            Authorization: process.env.REACT_APP_token,
            "Content-Type": "application/json",
            accept: "*/*",
          }
        // : 
        // {
        //     "Content-Type": "application/json",
        //     accept: "*/*",
        //   },
    });

    state.CLIENT = client;
  //   return client;
  // } else {
  //   //if there is already client just return it
  //   console.log("OldClient");
    return state.CLIENT;
  // }
};

export default CLIENT;
