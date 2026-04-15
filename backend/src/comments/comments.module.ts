import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment.entity'
import { Lead } from '../leads/lead.entity'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Lead])],
    providers: [CommentsService],
    controllers: [CommentsController],
})
export class CommentsModule {}
