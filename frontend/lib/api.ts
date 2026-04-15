import axios from 'axios'
import type {
    Lead,
    Comment,
    PaginatedResponse,
    LeadsQueryParams,
    CreateLeadDto,
    UpdateLeadDto,
} from '@/types'

const api = axios.create({
    baseURL: '/api',
})

// --- Leads ---

export async function getLeads(params: LeadsQueryParams = {}): Promise<PaginatedResponse<Lead>> {
    const { data } = await api.get('/leads', { params })

    return data
}

export async function getLead(id: string): Promise<Lead> {
    const { data } = await api.get(`/leads/${id}`)

    return data
}

export async function createLead(dto: CreateLeadDto): Promise<Lead> {
    const { data } = await api.post('/leads', dto)

    return data
}

export async function updateLead(id: string, dto: UpdateLeadDto): Promise<Lead> {
    const { data } = await api.patch(`/leads/${id}`, dto)

    return data
}

export async function deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`)
}

// --- Comments ---

export async function getComments(leadId: string): Promise<Comment[]> {
    const { data } = await api.get(`/leads/${leadId}/comments`)

    return data
}

export async function createComment(leadId: string, text: string): Promise<Comment> {
    const { data } = await api.post(`/leads/${leadId}/comments`, { text })

    return data
}

// --- Error helper ---

export function getApiError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? error.message
    }

    return 'Невідома помилка'
}
