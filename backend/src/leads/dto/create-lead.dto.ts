import { IsString, IsEmail, IsOptional, IsEnum, IsNumber } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { LeadStatus } from '../enums'

export class CreateLeadDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name!: string

    @ApiPropertyOptional({ example: 'john@gmail.com' })
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiPropertyOptional({ example: 'Google' })
    @IsString()
    @IsOptional()
    company?: string

    @ApiPropertyOptional({ enum: LeadStatus })
    @IsEnum(LeadStatus)
    @IsOptional()
    status?: LeadStatus

    @ApiPropertyOptional({ example: 1000 })
    @IsNumber()
    @IsOptional()
    value?: number

    @ApiPropertyOptional({ example: 'Important client' })
    @IsString()
    @IsOptional()
    notes?: string
}
