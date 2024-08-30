import { configureStore } from "@reduxjs/toolkit";
import { LoaderSlice } from "./LoaderSlice";
import { userSlice } from "./userSlide";

const store = configureStore({
    reducer: {
        loaders: LoaderSlice.reducer,
        users: userSlice.reducer
    }
})

export default store