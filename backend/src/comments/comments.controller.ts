import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Comment } from './comment.entity'

@Controller('leads/:leadId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    findByLead(@Param('leadId') leadId: string): Promise<Comment[]> {
        return this.commentsService.findByLead(leadId)
    }

    @Post()
    create(@Param('leadId') leadId: string, @Body() dto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(leadId, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.commentsService.remove(id)
    }
}
