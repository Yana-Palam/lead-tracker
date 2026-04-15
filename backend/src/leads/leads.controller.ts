import { Controller, Get, Post, Delete, Body, Param, Query, Patch } from '@nestjs/common'
import { LeadsService } from './leads.service'
import { CreateLeadDto, UpdateLeadDto, LeadsQueryDto } from './dto'
import { Lead } from '../leads/lead.entity'
import { Paginated } from 'src/common/interfaces'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger'

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) {}

    @Get()
    @ApiOperation({ summary: 'Get list of leads with filters' })
    @ApiResponse({ status: 200, description: 'List of leads' })
    findAll(@Query() query: LeadsQueryDto): Promise<Paginated<Lead>> {
        return this.leadsService.findAll(query)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get lead by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Lead found' })
    @ApiResponse({ status: 404, description: 'Lead not found' })
    findOne(@Param('id') id: string): Promise<Lead> {
        return this.leadsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create new lead' })
    @ApiResponse({ status: 201, description: 'Lead created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() dto: CreateLeadDto): Promise<Lead> {
        return this.leadsService.create(dto)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update lead' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Lead updated' })
    @ApiResponse({ status: 404, description: 'Lead not found' })
    update(@Param('id') id: string, @Body() dto: UpdateLeadDto): Promise<Lead> {
        return this.leadsService.update(id, dto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete lead' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Lead deleted' })
    @ApiResponse({ status: 404, description: 'Lead not found' })
    remove(@Param('id') id: string): Promise<void> {
        return this.leadsService.remove(id)
    }
}
