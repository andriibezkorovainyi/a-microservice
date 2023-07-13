import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RpcExceptionFilter } from 'src/utils/filters/grpc-exception.filter';
import { ParserApiService } from './parser-api.service';
import { SendChatGptCommonMessageBodyRequestDto } from './dto/send-chat-gpt-common-message-body-request.dto';
import { SendChatGptCommonMessageResponseDto } from './dto/send-chat-gpt-common-message-response.dto';

@ApiTags('parser-api')
@UseFilters(RpcExceptionFilter)
@Controller('parser-api')
export class ParserApiController {
  constructor(private readonly parserApiService: ParserApiService) {}

  @Post('/message/gpt/common/send')
  @ApiOperation({
    summary: 'Send chat gpt common message',
  })
  @ApiBody({ type: SendChatGptCommonMessageBodyRequestDto })
  @ApiResponse({
    type: SendChatGptCommonMessageResponseDto,
  })
  async sendChatGptCommonMessage(
    @Body() body: SendChatGptCommonMessageBodyRequestDto,
  ) {
    // return this.parserApiService.sendChatGptCommonMessage(body);
  }
}
