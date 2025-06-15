import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
