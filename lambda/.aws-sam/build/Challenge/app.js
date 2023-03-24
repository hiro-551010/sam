"use strict";exports.handler=async e=>{if(console.log(e),console.log(e.queryStringParameters),e.queryStringParameters!==null){console.log(e.queryStringParameters.challenge);let r=e.queryStringParameters.challenge,a={statusCode:404,body:"missingEndpoint"};return r&&(a={statusCode:200,body:r}),a}return{statusCode:400,body:"Bad Request"}};
//# sourceMappingURL=app.js.map
