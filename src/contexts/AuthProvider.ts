/**
 * Auth Provider
 * 
 * Utility provider to access the user's current access token. Implementations should retrieve existing tokens that are still valid through app cache.
 * @author Efdal Sancak
 */
import { createContext } from 'react';
import { StoreWrapper } from '../lib/StoreWrapper';

/**
 * @version 1.0.0
 * @returns {StoreWrapper} Auth provider
 */
function _default_(): StoreWrapper {
    return StoreWrapper.default()
}

export const AuthProvider = createContext<StoreWrapper>(_default_())