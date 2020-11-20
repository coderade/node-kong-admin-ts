import {UpstreamRequest} from "./upstream";

export type TargetRequest = {
    upstream?: string | UpstreamRequest,
    target?: string,
    weight?: number,
    tags?: string[];
}