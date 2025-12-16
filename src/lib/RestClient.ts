import axios, { Axios, AxiosError, AxiosHeaders, AxiosRequestHeaders, Method, RawAxiosRequestHeaders } from "axios"
import { APIResponse, CreateToolsResponse } from "./ApiResponses"
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
        try {
            let req = await axios({
                method: method as any as string, // will pass always,
                url,
                data: body,
                headers: headers
            })
          
            if (req.status === 200){
                return Promise.resolve({success: true, data: req.data.data})
            }
    
            return Promise.reject({succes: false, data: req.data.data})
        } catch (err) {
            if(err instanceof AxiosError) {
                return Promise.reject({success: err.response?.data.success ?? false, data: err.response?.data.data})
            }
            
            return Promise.reject({success: false, data: {"reasonUnknown": err}})
        }
    }

    private setupAuthHeaders(): {"Authorization": string, "Content-Type": string} {
        return {
            Authorization: `Bearer ${this.jwt}`,
            "Content-Type": "application/json"
        }
    }

    borrowTool(id: string): Promise<RequestResponse> {
         return this.build_request(
            "GET", 
            `${RestBaseURL}/${this.resources.tools}/borrow/${id}`,
            undefined,
            {
                ...this.setupAuthHeaders()
            }
        )
    }

    createTool(data: {
        name: string,
        desc: string,
        image_ext: Array<string>
        categories: Array<string>,
        location: string,
        price: Number,
        images: Array<string>
    }): Promise<RequestResponse> {
         return this.build_request(
            "POST", 
            `${RestBaseURL}/${this.resources.tools}/create`,
            data,
            {
                ...this.setupAuthHeaders()
            }
        )
    }

    getTools(cats?: Array<string>): Promise<RequestResponse> {
        return this.build_request(
            "GET", 
            cats ? `${RestBaseURL}/${this.resources.tools}?page=1&limit=10&category=${cats.join(",")}`  : `${RestBaseURL}/${this.resources.tools}?page=1&limit=10`,
            undefined,
            {
                "Content-Type": "application/json"
            }
        )
    }

    myReservations(): Promise<RequestResponse> {
        return this.build_request(
            "GET", 
            `${RestBaseURL}/${this.resources.tools}/reservations`,
            undefined,
            {
                ...this.setupAuthHeaders()
            }
        )
    }

    myLendings(): Promise<RequestResponse> {
        return this.build_request(
            "GET", 
            `${RestBaseURL}/${this.resources.tools}/lendings`,
            undefined,
            {
                ...this.setupAuthHeaders()
            }
        )
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