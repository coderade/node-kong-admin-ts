export type UpstreamRequest = {
    id?: string,
    name: string,
    hash_on?: string,
    hash_fallback?: string,
    hash_on_cookie_path?: string,
    slots?: number,
    healthchecks: string[],
    tags?: string[];
}

export type UpstreamResponse = {
    healthchecks: Healthchecks;
    hash_on: string;
    id: string;
    tags: string[];
    name: string;
    hash_fallback_header?: any;
    hash_on_cookie?: any;
    created_at: number;
    hash_on_cookie_path: string;
    hash_fallback: string;
    hash_on_header?: any;
    slots: number;
}

export type Healthy = {
    http_statuses: number[];
    interval: number;
    successes: number;
}

export type Unhealthy = {
    http_statuses?: number[];
    tcp_failures: number;
    timeouts: number;
    http_failures: number;
    interval: number;
}

export type Active = {
    https_verify_certificate: boolean;
    concurrency: number;
    http_path: string;
    timeout: number;
    https_sni?: string | null;
    healthy: Healthy;
    unhealthy: Unhealthy;
    type: string;
}


export type Passive = {
    unhealthy: Unhealthy;
    type: string;
    healthy: Healthy;
}

export type Healthchecks = {
    active: Active;
    passive: Passive;
}

