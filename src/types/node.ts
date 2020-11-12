export type Server = {
    total_requests: number;
    connections_active: number;
    connections_accepted: number;
    connections_handled: number;
    connections_reading: number;
    connections_writing: number;
    connections_waiting: number;
}

export type Database = {
    reachable: boolean;
}

export type NodeStatusResponse = {
    server: Server;
    database: Database;
}


export interface Plugins {
    available_on_server: string[];
    enabled_in_cluster: string[];
}


export interface NodeResponse{
    hostname: string;
    node_id: string;
    lua_version: string;
    plugins: Plugins;
    configuration: Record<string, unknown>;
    tagline: string;
    version: string;
}


