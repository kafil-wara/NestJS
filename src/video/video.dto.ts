import { IsNotEmpty } from 'class-validator';

export class VideoForm {
  @IsNotEmpty()
  name: string;

  productionhouseid: number;
}
