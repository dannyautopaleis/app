export interface Filter {
    search: string
    category: string
    order: "desc" | "asc"
}

enum RequestMethod {
    GET,
    POST
}

export var RestBaseURL = "https://school.z3ntl3.com/api/v1"
export class RestClient {
    public jwt: string

    constructor(jwt: string) {
        this.jwt = jwt
    }

    // be aware to handle parameters or querystrings yourself and provide them in `url`
    private build_request(method: RequestMethod, url: string, body?: unknown, headers?: unknown) {}
    getProducts(page: number, entries: number, filter?: Filter) {}
    getProduct(id: string) {}
}