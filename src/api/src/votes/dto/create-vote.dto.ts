import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  @IsNotEmpty()
  session_id: string;

  @IsBoolean()
  @IsOptional()
  yes?: boolean;

  @IsBoolean()
  @IsOptional()
  no?: boolean;
}
