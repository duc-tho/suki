import {
    TypedUseSelectorHook,
    useDispatch as uDispatch,
    useSelector as uSelector
} from 'react-redux';

import type { RootState, AppDispatch } from './index.js';

export const useDispatch: () => AppDispatch = uDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = uSelector;
