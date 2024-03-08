import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  @IsNotEmpty()
  topic_id: string;

  @IsNumber()
  @IsDefined()
  duration: number;
}
