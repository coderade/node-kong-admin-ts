import {UpstreamRequest} from "./upstream";

export type TargetRequest = {
    upstream?: string | UpstreamRequest,
    target?: string,
    weight?: number,
    tags?: string[];
}

export type TargetResponse = {
    "id": string,
    "created_at": number
    "upstream": UpstreamRequest,
    "target": string,
    "weight": number,
    "tags": string[]
}

export type TargetList = {
    data: TargetResponse[],
    next?: string
}