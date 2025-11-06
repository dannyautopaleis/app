export interface Filter {
    search: string
    category: string
    order: "desc" | "asc"
}

export var RestBaseURL = "https://school.z3ntl3.com/api/v1/tools"
export class RestClient {
    private jwt: string

    constructor(jwt: string) {
        this.jwt = jwt
    }

    getProducts(page: number, entries: number, filter?: Filter) {}
    getProduct(id: string) {}
}