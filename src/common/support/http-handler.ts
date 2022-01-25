import { IncomingMessage } from 'http';

/**
 * Handle http response
 * @param {IncomingMessage} response - IncomingMessage
 * @returns The data that was returned from the server.
 */
export const httpHandler = async (response: IncomingMessage) => {
  let body = '';

  response.setEncoding('utf-8');

  for await (const chunk of response) {
    const text = chunk.toString();
    body += text;
  }

  const parcedData = JSON.parse(body);

  return parcedData;
};
