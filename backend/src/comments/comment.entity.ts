import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Lead } from '../leads/lead.entity'

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    leadId!: string

    @Column({ type: 'varchar', length: 500 })
    text!: string

    @CreateDateColumn()
    createdAt!: Date

    @ManyToOne(() => Lead, (lead) => lead.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'leadId' })
    lead!: Lead
}
