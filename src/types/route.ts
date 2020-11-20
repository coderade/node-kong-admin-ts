import {ServiceRequest} from "./service";
export type RouteRequest = {
    id?: string,
    name: string;
    protocols: string[];
    methods?: string[];
    hosts: string[];
    paths: string[];
    headers?: Record<string, unknown>;
    https_redirect_status_code: number;
    regex_priority?: number;
    strip_path?: boolean;
    path_handling?: string;
    preserve_host?: boolean;
    snis?: string[];
    sources?: string[];
    destinations?: string[];
    tags?: string[];
    service: ServiceRequest;
};

export type RouteResponse = {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    protocols: string[];
    methods: string[];
    hosts: string[];
    paths: string[];
    headers: Record<string, unknown>;
    https_redirect_status_code: number;
    regex_priority: number;
    strip_path: boolean;
    path_handling: string;
    preserve_host: boolean;
    tags: string[];
    service: ServiceRequest;
};

export type RouteList = {
    data: RouteResponse[],
    next?: string
}
