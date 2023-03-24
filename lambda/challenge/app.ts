import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

exports.handler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    console.log(event);
    console.log(event.queryStringParameters);

    if (event.queryStringParameters !== null) {
      console.log(event.queryStringParameters.challenge);
      const challenge = event.queryStringParameters.challenge;
      let response: APIGatewayProxyResult = {
          statusCode: 404,
          body: "missingEndpoint"
        };
      if (challenge) {
        response = {
          statusCode: 200,
          body: challenge
        }
      }
      return response
    }
    return {
      statusCode: 400,
      body: "Bad Request"
    };
  }