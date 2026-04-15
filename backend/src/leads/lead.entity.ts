import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { LeadStatus } from './enums'
import { Comment } from '../comments/comment.entity'

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column({ unique: true, nullable: true })
    email?: string

    @Column({ nullable: true })
    company?: string

    @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
    status!: LeadStatus

    @Column({ type: 'decimal', nullable: true })
    value?: number

    @Column({ type: 'text', nullable: true })
    notes?: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Comment, (comment) => comment.lead, { cascade: true })
    comments!: Comment[]
}
