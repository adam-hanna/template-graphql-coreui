import { createHTTPServers, HTTPServers } from './servers';
import { Server } from 'http';
import { AddressInfo } from 'net'

export type HealthResponse = {
	http?: boolean;
}

export type MetaData = {
	http: {
		host: string;
		port: number;
	}
}

export type ServerSettings = {
    httpPort?: number;
    httpHost?: string;
}

export class GraphQLServer {
    constructor(settings: ServerSettings) {
        this.settings_ = settings;
        this.httpServers_ = createHTTPServers({});
    }

    listen(): void {
        this.httpServer_ = this.httpServers_.httpServer?.listen(
            this.settings_?.httpPort, 
            this.settings_?.httpHost, 
            () => {
                const { address, port } = this.httpServer_?.address() as AddressInfo

                console.log(
                    `HTTP server is now running on http://${address}:${port}`
                );
            }
        );

        return
    }

    stop(): void {
        this.httpServer_?.close()
    }

    health(): HealthResponse {
        return {
            http: this.httpServer_?.listening,
        }
    }

    info(): MetaData {
        const { address: httpHost, port: httpPort } = this.httpServer_?.address() as AddressInfo
        
        return {
            http: {
                host: httpHost,
                port: httpPort,
            },
        }
    }

    private readonly settings_?: ServerSettings
    private readonly httpServers_: HTTPServers

    private httpServer_?: Server
}
