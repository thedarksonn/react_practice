import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoader: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setLoader } = LoaderSlice.actions