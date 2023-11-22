import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from "firebase/auth";


// -----------type for slice STATE---------
interface AuthState {
    user: User | null
    authReady: boolean
}

// -----------Defining initial state-------
const initialState: AuthState = {
    user: null,
    authReady: false
}

//--------------SLICE------------------
export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,

    reducers: {
        authState: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.authReady = true
        },
        authLogin: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        authLogout: (state) => {
            state.user = null
        }

    },
})


//getting the actions separately
export const { authLogout, authLogin, authState } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user
export const selectAuthReady = (state: RootState) => state.auth.authReady

export default authSlice.reducer