import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SendChatGptCommonMessageResponse } from '../greet.pb';
import { ChatGptCommonMessageItemDto } from './chat-gpt-common-message-item.dto';

export class SendChatGptCommonMessageResponseDto
  implements SendChatGptCommonMessageResponse
{
  @ApiPropertyOptional({ type: ChatGptCommonMessageItemDto })
  @IsOptional()
  @IsObject()
  @Type(() => ChatGptCommonMessageItemDto)
  message?: ChatGptCommonMessageItemDto;
}
