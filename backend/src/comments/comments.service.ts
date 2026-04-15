import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { Lead } from '../leads/lead.entity'
import { CreateCommentDto } from './dto/create-comment.dto'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepo: Repository<Comment>,
        @InjectRepository(Lead)
        private readonly leadRepo: Repository<Lead>
    ) {}

    async findByLead(leadId: string): Promise<Comment[]> {
        return this.commentRepo.find({
            where: { leadId },
            order: { createdAt: 'DESC' },
        })
    }

    async create(leadId: string, dto: CreateCommentDto): Promise<Comment> {
        const lead = await this.leadRepo.findOneBy({ id: leadId })

        if (!lead) throw new NotFoundException(`Lead ${leadId} not found`)

        const comment = this.commentRepo.create({ ...dto, leadId })

        return this.commentRepo.save(comment)
    }

    async remove(id: string): Promise<void> {
        const comment = await this.commentRepo.findOneBy({ id })

        if (!comment) throw new NotFoundException(`Comment ${id} not found`)
        await this.commentRepo.delete(id)
    }
}
