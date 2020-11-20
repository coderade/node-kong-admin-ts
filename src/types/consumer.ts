export type ConsumerRequest = {
    username: string,
    custom_id?: string,
    tags?: string
}

export type ConsumerResponse =  {
    id: string;
    custom_id?: string;
    created_at?: number;
}

export type ConsumerList = {
    data: ConsumerResponse[],
    next?: string
}


