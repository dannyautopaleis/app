import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventEmitter } from 'events';
import { useEffect } from "react";

export interface User {
    jwt?: string
    claims?: {
        email: string
        exp: number
        sub: string
    }
    isGuest?: boolean
}

export enum Errors {
    NoInfo="no info",
    NotSignedIn="user is not signed in",
    EmptyKeys="some keys in user model were empty",
    ProperGuest="not signed in but proper guest"
}

export enum AppStorageKeys {
    RETRIEVE_USER="user",
    CURRENT_CATEGORIES="categories"
}

export const STORE_UPDATE_EVENT = "store_update"

// Should create only one instance and pass it through context provider
export class StoreWrapper {
    public events: EventEmitter;

    static default(): StoreWrapper {
        return new StoreWrapper(new EventEmitter())
    }

    constructor(events: EventEmitter) {
        this.events = events
    }

    private fire_event(msg: string) {
        this.events.emit(STORE_UPDATE_EVENT, msg)
    }

    public async isSignedIn(): Promise<boolean> {
        try {
            await this.getUser()
            return true
        } catch (err) {
            return false
        } 
    }

    public async saveGuest(): Promise<boolean> {
        let user: User = {
            isGuest: true,
        }
        await AsyncStorage.setItem(AppStorageKeys.RETRIEVE_USER, JSON.stringify(user))
        this.fire_event("saveGuest")

        return Promise.resolve(true)
    }

    public async saveUser(user: User): Promise<boolean> {
        if((typeof user.claims === "undefined" || typeof user.jwt === "undefined"))
            return Promise.reject(Errors.EmptyKeys)

        await AsyncStorage.setItem(AppStorageKeys.RETRIEVE_USER, JSON.stringify(user))
        this.fire_event("saveUser")

        return Promise.resolve(true)
    }

    public signOut() {
        AsyncStorage.setItem(AppStorageKeys.RETRIEVE_USER, JSON.stringify({}), (err) => {
            if(err === null || typeof err === "undefined")
                this.fire_event("signOut")
        })
    }

    public async getUser(): Promise<User> {
        let encoded = await AsyncStorage.getItem(AppStorageKeys.RETRIEVE_USER).catch((err) => {
            console.log(err, "here")
            return Promise.resolve(Errors.NotSignedIn)
        })
        if(typeof encoded === "undefined" || encoded === null)
            return Promise.reject(Errors.NoInfo)

        if(encoded === "{}") {
            return Promise.reject(Errors.NotSignedIn)
        }

        let user: User = JSON.parse(encoded)
        if(typeof user.jwt === "undefined") {
            if(typeof user.isGuest !== "undefined" && user.isGuest === true) {
                return Promise.reject(Errors.ProperGuest)
            }
            return Promise.reject(Errors.NotSignedIn)
        }
        
        return Promise.resolve(user)
    }
}

export const STORE_INSTANCE = StoreWrapper.default()
export function useStoreListener(callback: (msg: string) => void) {
    useEffect(() => {
        STORE_INSTANCE.events.on(STORE_UPDATE_EVENT, callback)
    }, [])
}