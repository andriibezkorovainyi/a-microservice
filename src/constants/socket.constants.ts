export enum SocketUserEvents {
  USER_GET_CONNECTED_USERS = 'user:getConnectedUsers',
}

export enum SocketParserApi {
  PARSER_API_HANDLE_CONNECTION = 'parserApi:handleConnection',
  PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE = 'parserApi:sendChatGptCommonMessage',
  PARSER_API_SEND_CHAT_GPT_PERSONAL_MESSAGES = 'parserApi:sendChatGptPersonalMessages',
  PARSER_API_SEND_CHAT_GPT_PROJECT_MESSAGE = 'parserApi:sendChatGptProjectMessage',
}
