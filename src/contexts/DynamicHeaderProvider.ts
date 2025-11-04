/**
 * Dynamic Header implies the concept of header shrink animation based on scroll over product overview
 * 
 * This animation is by definition a clamp bounce animation, shrinking the header, and expanding it when scrolling back
 *  @author Efdal Sancak
 */
import { createContext } from 'react';
import { Animated } from 'react-native';

interface DynamicHeader {
   clampAnimHeader: React.RefObject<Animated.Value> | null
   currentValue: number
   initial: number
}

/**
 * @version 1.0.0
 * @returns {DynamicHeader} dynamic header model
 */
function _default_(): DynamicHeader {
    const initial = 380
    return {
        initial,
        currentValue: initial,
        clampAnimHeader: null
    }
}

export const DynamicHeaderProvider = createContext<DynamicHeader>(_default_())