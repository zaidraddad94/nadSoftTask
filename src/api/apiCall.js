import CLIENT from "./client";

let state = {
  count: 1,
};

let apiCall = (type, endPoint, params, body = {}) => {
  //get instance of the client
  const client = CLIENT();
  CLIENT(true)
  //flat all params to string to get request
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newParams;
  if (searchParams.toString()) {
    newParams = "?" + searchParams.toString();
  } else {
    newParams = "";
  }

  //used to calculate request time
  // state[state.count] = Date.now();//NotNeeded
  console.time(state.count);

  //return the data after printing the data to console if the development env is on
  return client[type](endPoint + newParams, body)
    .then((result) => {
      if ("development" === process.env.NODE_ENV) {
        console.log(
          `======================== API RESULT Success ${state.count} ========================\n`,
          `\n type:`,
          type,
          `\n result:`,
          result,
          `\n url:`,
          endPoint + newParams,
          `\n body:`,
          body,
        );
        console.timeEnd(state.count);
        state.count = state.count + 1;
      }
      return result;
    })
    .catch((e) => {
      if ("development" === process.env.NODE_ENV) {
        console.error(
          `======================== API RESULT Failed ${state.count} ========================\n`,
          `\n type:`,
          type,
          `\n error:`,
          e,
          `\n url:`,
          endPoint + newParams,
          `\n body:`,
          body,
        );
        console.timeEnd(state.count);
        state.count = state.count + 1;
      }

      if (e.response.status === 401) {
        // if the session expired
        console.log("should log out");
        localStorage.removeItem("token"); // delete the old token
        CLIENT(true); // call CLIENT to get new token
        return apiCall(type, endPoint, params, body); // redo the request so nothing will be skipped
      }
      return e;
    });
};

export default apiCall;
