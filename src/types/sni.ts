import {CertificateRequest} from "./certificate";

export type SniRequest = {
    name: string,
    id?: string,
    tags?: string[],
    certificate: string,
}

export type SniResponse = {
    id: string,
    name: string,
    created_at: number,
    tags: string[],
    certificate: CertificateRequest,
}

export type SniList = {
    data: SniResponse[],
    next?: string
}