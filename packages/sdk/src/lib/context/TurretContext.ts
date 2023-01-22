import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {TurretOptions} from "../initialize";
import {AppRouter} from "@turretjs/server/src/adapters/trpc/router";
import {ClientService} from "../../domain/client/services/ClientService";
import {ClientDto} from "@turretjs/server/src/adapters/trpc/api/v1/client/dto/ClientDto";
import {ProjectDto} from "@turretjs/server/src/adapters/trpc/api/v1/project/dto/ProjectDto";
import {ProjectService} from "../../domain/project/services/ProjectService";
import {ClientSessionService} from "../../domain/session/services/ClientSessionService";
import {ClientSessionDto} from "@turretjs/server/src/adapters/trpc/api/v1/clientsession/dto/ClientSessionDto";

type TrpcClient = ReturnType<typeof createTRPCProxyClient<AppRouter>>;

export class TurretContext {

    private readonly _trpcClient: TrpcClient;

    private readonly _clientService: ClientService;
    private readonly _projectService: ProjectService;
    private readonly _clientSessionService: ClientSessionService;

    private _client: ClientDto | null = null;
    private _project: ProjectDto | null = null;
    private _clientSession: ClientSessionDto | null = null;

    constructor(
        private readonly _options: TurretOptions,
    ) {
        this._trpcClient = createTRPCProxyClient<AppRouter>({
            links: [
                httpBatchLink({
                    url: this._options.baseUrl,
                    maxURLLength: 2083
                })
            ]
        });

        this._clientService = new ClientService(this);
        this._projectService = new ProjectService(this);
        this._clientSessionService = new ClientSessionService(this);

        this.initialize();
    }

    private async initialize() {
        this._clientService.declareClient()
            .then((client) => {
                this._client = client;

                if (client) {
                    this._clientSessionService.declareSession(client.id)
                        .then((session) => {
                            this._clientSession = session;
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });

        this._projectService.declareProject(this._options.project, this._options.projectVersion)
            .then((project) => {
                this._project = project;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    public get client() {
        return this._client;
    }

    public get clientSession() {
        return this._clientSession;
    }

    public get project() {
        return this._project;
    }

    public get options() {
        return this._options;
    }

    public get trpcClient() {
        return this._trpcClient;
    }

}