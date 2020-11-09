export type ConnectorParams = {
    url: string,
    auth?: string
};

export type QueryString = {
    offset: string
}

export type Header = {
    'User-Agent': string,
    'Content-Type': string,
    'Accept': string
    'Connection': string
    'Authorization': string | null
};

export type ConsumerRequest = {
    username: string,
    custom_id?: string,
    tags?: string
}


export type TargetRequest = {
    upstream?: string,
    target?: string,
    weight?: number,
    tags?: string[];
}

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

export type SniRequest = {
    name: string,
    id?: string,
    tags: string[],
    certificate: string,
}