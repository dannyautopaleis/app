/**
 * Auth Provider
 * 
 * Utility provider to access the user's current access token. Implementations should retrieve existing tokens that are still valid through app cache.
 * @author Efdal Sancak
 */
import { createContext } from 'react';

interface IAuthProvider {
   jwt?: string
   claims?: {email: string, role: string}
   guest?: boolean,
}

/**
 * @version 1.0.0
 * @returns {IAuthProvider} Auth provider model
 */
function _default_(): IAuthProvider {
    return {
        guest: false
    }
}

export const AuthProvider = createContext<IAuthProvider>(_default_())