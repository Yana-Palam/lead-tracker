import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Like, Repository } from 'typeorm'
import { Lead } from './lead.entity'
import { CreateLeadDto } from './dto/create-lead.dto'
import { UpdateLeadDto } from './dto/update-lead.dto'
import { LeadsQueryDto } from 'src/leads/dto'
import { Paginated } from 'src/common/interfaces'

@Injectable()
export class LeadsService {
    constructor(
        @InjectRepository(Lead)
        private readonly leadRepo: Repository<Lead>
    ) {}

    async findAll(query: LeadsQueryDto): Promise<Paginated<Lead>> {
        const { page = 1, limit = 10, q, status, sort = 'createdAt', order = 'desc' } = query

        const where: FindOptionsWhere<Lead> | FindOptionsWhere<Lead>[] = q
            ? [
                  { name: Like(`%${q}%`), ...(status && { status }) },
                  { email: Like(`%${q}%`), ...(status && { status }) },
                  { company: Like(`%${q}%`), ...(status && { status }) },
              ]
            : { ...(status && { status }) }

        const [data, total] = await this.leadRepo.findAndCount({
            where,
            order: { [sort]: order.toUpperCase() },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['comments'],
        })

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }

    async findOne(id: string): Promise<Lead> {
        const lead = await this.leadRepo.findOne({
            where: { id },
            relations: ['comments'],
        })

        if (!lead) throw new NotFoundException(`Lead ${id} not found`)

        return lead
    }

    create(dto: CreateLeadDto): Promise<Lead> {
        const lead = this.leadRepo.create(dto)

        return this.leadRepo.save(lead)
    }

    async update(id: string, dto: UpdateLeadDto): Promise<Lead> {
        await this.findOne(id)
        await this.leadRepo.update(id, dto)

        return this.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id)
        await this.leadRepo.delete(id)
    }
}
