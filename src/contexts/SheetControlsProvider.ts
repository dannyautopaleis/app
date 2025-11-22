import BottomSheet from "@gorhom/bottom-sheet";
import { createContext, RefObject } from "react";

// If a screen wants to use this provider, a BottomSheet view should be present on it's screen layout content
// This will never trigger a re-render as it is a reference, so it is concurrency safe and accessablle on any app screen
export const SheetControlProvider = createContext<RefObject<BottomSheet | null> | null>(null)