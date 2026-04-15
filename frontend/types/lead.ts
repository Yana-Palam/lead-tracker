import type { Order, Sort } from '@/types'

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST'

export interface Lead {
    id: string
    name: string
    email?: string
    company?: string
    status: LeadStatus
    value?: number
    notes?: string
    createdAt: string
    updatedAt: string
}

export interface LeadsQueryParams {
    page?: number
    limit?: number
    status?: LeadStatus | ''
    sort?: Sort
    order?: Order
}

export interface CreateLeadDto {
    name: string
    email?: string
    company?: string
    status: LeadStatus
    value?: number
    notes?: string
}

export type UpdateLeadDto = {
    [K in keyof CreateLeadDto]?: CreateLeadDto[K] | null
}
