import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SendChatGptCommonMessageRequest } from '../greet.pb';

export class SendChatGptCommonMessageBodyRequestDto
  implements SendChatGptCommonMessageRequest
{
  @ApiProperty({ minimum: 1, maximum: Number.MAX_SAFE_INTEGER })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
