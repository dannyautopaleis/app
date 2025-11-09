import { createMMKV, type MMKV } from "react-native-mmkv"

export interface User {
    jwt?: string
    claims?: {
        email: string
        exp: number
    }
    isGuest?: boolean
}

export enum Errors {
    NoInfo="no info",
    NotSignedIn="user is not signed in",
    EmptyKeys="some keys in user model were empty"
}

export enum AppStorageKeys {
    RETRIEVE_USER="user"
}

const STORAGE = createMMKV()

// Should create only one instance and pass it through context provider
export class StoreWrapper {
    // Not possible to null storage, as this would be unexpected behaviour
    public storage: MMKV
    
    static default(): StoreWrapper {
        return new StoreWrapper(STORAGE)
    }

    constructor(storage: MMKV) {
        this.storage = storage
    }

    // Changes the underlying storage, quick note: should not be relied upon.
    public changeStorage(storage: MMKV) {
        this.storage = storage
    }

    public isSignedIn(): boolean {
        try {
            this.getUser()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    public saveUser(user: User): boolean {
        if(typeof user.claims === "undefined" || typeof user.jwt === "undefined")
            throw new Error(Errors.EmptyKeys)

        this.storage.set(
            AppStorageKeys.RETRIEVE_USER, 
            JSON.stringify(user)
        )
        return true
    }

    public getUser(): User {
        let encoded = this.storage.getString(AppStorageKeys.RETRIEVE_USER)
        if(typeof encoded === "undefined")
            throw new Error(Errors.NoInfo)

        let user: User = JSON.parse(encoded)
        if(typeof user.jwt !== "undefined" && typeof user.isGuest === "undefined")
            throw new Error(Errors.NotSignedIn)
        
        return  user
    }
}