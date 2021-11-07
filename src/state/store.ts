import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { artworkApi } from "state/artwork/artworkApi";

export const store = configureStore({
  reducer: {
    [artworkApi.reducerPath]: artworkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artworkApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
