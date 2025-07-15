export class CreateMenuDto {}
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddonDto {
  @IsString() name: string;
  @IsNumber() originalPrice: number;
  @IsNumber() sellingPrice: number;
}

class ItemInfoDto {
  @IsString() label: string;
  @IsString() description: string;
  @IsNumber() originalPrice: number;
  @IsNumber() sellingPrice: number;
  @IsString() type: string;
  @IsString() category: string;
  @IsEnum(['ACTIVE', 'INACTIVE']) status: 'ACTIVE' | 'INACTIVE';
  @IsString() image: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddonDto)
  addons?: AddonDto[];
}

export class UpsertMenuItemDto {
  @IsOptional()
  @IsString()
  menuId?: string;

  @ValidateNested()
  @Type(() => ItemInfoDto)
  itemInfo: ItemInfoDto;
}
