/**
 * Dynamic Header implies the concept of header shrink animation based on scroll over product overview
 * 
 * This animation is by definition a clamp bounce animation, shrinking the header, and expanding it when scrolling back
 *  @author Efdal Sancak
 */
import { createContext } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { INITIAL } from '../components/header';

interface DynamicHeader {
   scrollBar?: (ev: NativeSyntheticEvent<NativeScrollEvent>) => void 
   YPos: number,
   clampAnimHeader: Animated.Value | null
}

/**
 * @version 1.0.0
 * @returns {DynamicHeader} dynamic header model
 */
function _default_(): DynamicHeader {
    return {
        clampAnimHeader: null,
        YPos: 0
    }
}

export const DynamicHeaderProvider = createContext<DynamicHeader>(_default_())