import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lead } from 'src/leads/lead.entity'
import { Comment } from 'src/comments/comment.entity'
import { LeadsModule } from 'src/leads/leads.module'
import { CommentsModule } from 'src/comments/comments.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_DATABASE'),
                entities: [Lead, Comment],
                synchronize: true,
            }),
        }),
        LeadsModule,
        CommentsModule,
    ],
})
export class AppModule {}
