import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

export const handler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
  const SLACK_CHANNEL_ID = 'C04SJ4FEM2T';
  const SLACK_API_TOKEN = 'xoxb-4929310724737-5022879090801-4fNIoUd1yU3ecfAPtUbfYMGT';

  try {
    const stringBody: any = JSON.parse(event.body!);
    console.info(stringBody);
    // slackのurlチェック
    if (stringBody.challenge !== null) {
      return await verificationUrl(stringBody);
    }

    // 特定の絵文字に反応する
    if (stringBody.event.type === 'reaction_added' || stringBody.event.type === 'reaction_removed') {
      const reaction = stringBody.event.reaction;
      const user = stringBody.event.user;
      const item = stringBody.event.item;
      const response = await axios.post('https://slack.com/api/conversations.history', {
        token: SLACK_API_TOKEN,
        channel: item.channel,
        latest: item.ts,
        limit: 1,
        inclusive: true
      });

      const message = response.data.messages[0];
      const messageLink = `https://${message.team}.slack.com/archives/${message.channel}/p${message.ts.replace('.', '')}`;

      // Slack APIを使用してメッセージを投稿する
      await axios.post('https://slack.com/api/chat.postMessage', {
        token: SLACK_API_TOKEN,
        channel: SLACK_CHANNEL_ID,
        text: `User <@${user}> reacted with ${reaction} to message <${messageLink}|${message.text}>`
      });
    }
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 400,
    body: "BAD REQUEST!!!"
  }
}

async function verificationUrl(stringEventBody: any): Promise<APIGatewayProxyResult> {
  const body = {
    challenge: stringEventBody.challenge
  };
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}