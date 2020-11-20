import {ServiceRequest} from "./service";
import {ConsumerRequest} from "./consumer";

export type PluginRequest = {
    name: string,
    id?: string
    route?: string,
    service?: ServiceRequest,
    consumer?: ConsumerRequest,
    config?: PluginConfig,
    run_on?: string,
    protocols: string[],
    enabled?: boolean,
    tags?: string[],
};

export type PluginResponse = {
    name: string,
    id?: string,
    route?: string,
    service?: ServiceRequest,
    consumer?: ConsumerRequest,
    config?: PluginConfig,
    protocols: string[],
    enabled?: boolean,
    tags?: string[],
};


export type PluginConfig = {
    hour?: number,
    minute?: number
}

export type EnabledPlugins = {
    enabled_plugins: string[]
}

export type PluginsList = {
    data: PluginResponse[],
    next?: string
}