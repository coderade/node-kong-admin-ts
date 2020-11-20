export type ServiceRequest = {
    name?: string,
    id?: string,
    retries?: number,
    protocol?: string,
    host: string,
    port?: number,
    path: string,
    connect_timeout?: number,
    write_timeout?: number,
    read_timeout?: number,
    tags?: string[],
    url?: string,
}

export type ServiceResponse = {
    id: string;
    created_at: number;
    updated_at: number;
    connect_timeout: number;
    protocol: string;
    host: string;
    port: number;
    path: string;
    name: string;
    retries: number;
    read_timeout: number;
    write_timeout: number;
}

export type ServicesList = {
    data: ServiceResponse[],
    next?: string
}