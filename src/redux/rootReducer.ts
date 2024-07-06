import { baseApi } from "./api/baseApi";
import pageReloadReducer from "./slice/reloadSlice"



export const reducer = {
    pageReload: pageReloadReducer,
    [baseApi.reducerPath]: baseApi.reducer,
}

