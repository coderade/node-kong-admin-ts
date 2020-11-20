export type CertificateRequest = {
    cert: string;
    id?: string
    key: number;
    tags?: string[]
    snis?: string[]
}

export type CertificateResponse = {
    id: string;
    created_at: number;
    cert: string;
    key: number;
    tags: string[]
}

export type CertificateList = {
    data: CertificateResponse[],
    next?: string
}


