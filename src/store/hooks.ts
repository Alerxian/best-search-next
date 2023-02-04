import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppState } from '.';

// export const useAppDispatch: () => AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
