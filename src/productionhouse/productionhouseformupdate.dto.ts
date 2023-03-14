import { Length } from 'class-validator';

export class ProductionhouseFormUpdate {
  @Length(3, 8)
  name: string;
}
