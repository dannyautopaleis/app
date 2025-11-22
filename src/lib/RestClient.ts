import axios, { Axios, AxiosError, AxiosHeaders, AxiosRequestHeaders, Method, RawAxiosRequestHeaders } from "axios"
export interface Filter {
    search: string
    category: string
    order: "desc" | "asc"
}

export interface RequestResponse {
    success: boolean,
    data: {[key: string]: any}
}

interface Claims {
    iss: string,
    sub: string
    exp: number,
    iat: number,
    role: string
}

export interface User {
    message: string
    token: string
    claims: Claims
}

// todo
export var RestBaseURL = process.env["EXPO_PUBLIC_API_URL"] ?? "https://692a913ffd10.ngrok-free.app/api/v1" // nog niet online
export class RestClient {
    private resources = {
        tools: "tools",
        login: "login",
        register: "register"
    }
    public jwt: string | null = null
    constructor() {}

    // be aware to handle parameters or querystrings yourself and provide them in `url`
    private async build_request(method: Method, url: string, body?: unknown, headers?: any): Promise<RequestResponse> {
        console.log("url", url)
        try {
            let req = await axios({
                method: method as any as string, // will pass always,
                url,
                data: body ?? null,
                headers: headers ?? null
            })
    
            if (req.status === 200){
                return Promise.resolve({success: true, data: req.data.data})
            }
    
            return Promise.reject({succes: false, data: req.data.data})
        } catch (err) {
            if(err instanceof AxiosError) {
                return Promise.reject({success: err.response?.status ? true : false, data: err.response?.data.data})
            }
            
            return Promise.reject({success: false, data: {"reasonUnknown": err}})
        }
    }

    register(email: string, username: string, password: string): Promise<RequestResponse> {
        password = btoa(password)
        return this.build_request(
            "POST", 
            `${RestBaseURL}/${this.resources.register}`,
            {
                email,
                username,
                password
            },
            {
                "Content-Type": "application/json"
            }
        )
    } 

    login(email: string, password: string): Promise<RequestResponse> {
        password = btoa(password)
        return this.build_request(
            "POST", 
            `${RestBaseURL}/${this.resources.login}`,
            {
                email,
                password
            },
            {
                "Content-Type": "application/json"
            }
        )
    }
    getProducts(page: number, entries: number, filter?: Filter) {}
    getProduct(id: string) {}
}