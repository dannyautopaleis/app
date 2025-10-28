/**
 * Device Provider
 * 
 * Consumers can subscribe to retrieve device specific data, such as notifications push tokens or to fingerprint for HWID.
 * A notification push token is used to send notifications using FCN and APN APIs which are no-cost services, but they require
 * a specific device token to send to notifs for a specific app on a specific mobile phone.
 * 
 * @author Efdal Sancak
 */
import { createContext } from 'react';

interface Device {
    notifications: {
        pushToken: string
    }
}

/**
 * voor de fun jsdoc gebruiken waarom niet
 * @version 1.0.0
 * @returns {Device} Device information model
 */
function _default_(): Device {
    return {
        notifications: {
            pushToken: ""
        }
    }
}

export const DeviceContext = createContext<Device>(_default_())