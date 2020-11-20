import {ConsumerResponse} from "./consumer";

export type KeyAuthResponse = {
    "consumer": ConsumerResponse
    "created_at": number,
    "id": string
    "key": string
}
export type KeyAuthList = {
    data: KeyAuthResponse[],
    next?: string
}