import apiCall from "./apiCall";

let queries = {
  //hitName : (queries, body)=> apiCall( type "post/get"  , '/endPoint', Params {}, body {})

  summary: (params) => apiCall("get", "/summary", params, {}),
};

export default queries;
