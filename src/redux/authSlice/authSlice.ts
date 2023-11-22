//redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
//firebase
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/config';


// -----------type for slice STATE---------
interface AuthState {
    user: User | null | undefined
    loading: boolean
    error: Error | null
    authReady: boolean
}

interface userAuth {
    email: string,
    password: string,
    name?: string
}

// -----------Defining initial state-------
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    authReady: false
}

//-----------------Async thunk for firebase signup, login, signout-----------------
//SIGNUP
export const signup = createAsyncThunk('auth/signup', async ({ email, password, name }: userAuth) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error("Could not complete signup")
        }

        await updateProfile(res.user, {
            displayName: name
        })
        return res.user

    } catch (err) {
        console.log(err);
    }
})
//LOGIN
export const login = createAsyncThunk('auth/login', async ({ email, password }: userAuth) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error("Could not complete login")
        }
        return res.user

    } catch (err) {
        console.log(err);
    }
})
//LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await signOut(auth)

    } catch (err) {
        console.log(err);
    }
})



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
        // login2: (state, { payload }: { type: string, payload: userAuth }) => {
        //     state.user = null
        //     state.loading = true
        //     state.error = null
        //     createUserWithEmailAndPassword(auth, payload.email, payload.password).then((res) => {
        //         state.user = res.user
        //         state.loading = false
        //         state.error = null
        //     }).catch((err) => {
        //         state.user = null
        //         state.loading = true
        //         state.error = err
        //     })
        // }
    },
    extraReducers: (builder) => {
        builder
            //SIGNUP
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = null
                state.loading = false
                state.error = { name: 'UnknownError', message: "UnknownError", ...action.error }
            })
            //LOGIN
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null
                state.loading = false
                state.error = { name: 'UnknownError', message: "UnknownError", ...action.error }
            })
            //LOGOUT
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.loading = false
                state.error = null
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.user = null
                state.loading = false
                state.error = { name: 'UnknownError', message: "UnknownError", ...action.error }
            })
    }
})


//getting the actions separately
export const { authState } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth


export default authSlice.reducer