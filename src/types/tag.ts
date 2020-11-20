export type TagResponse = {
    entity_name: string
    entity_id: string
    tag: string
}

export type TagList = {
    data: TagResponse[],
    next?: string
}