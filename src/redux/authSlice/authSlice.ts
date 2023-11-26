//redux
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
//firebase
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase/config';



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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thumbnail?: any
}

// -----------Defining initial state-------
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    authReady: false
}

// export const getUserState = (user: User): UserState => {
//     return {
//         uid: user.uid,
//         displayName: user.displayName || 'Unknown Name',
//         email: user.email || 'no-email',
//     }
// }


//-----------------Async thunk for firebase signup, login, signout-----------------
//--- SIGNUP ---
export const signup = createAsyncThunk('auth/signup', async ({ email, password, name, thumbnail }: userAuth) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error("Could not complete signup")
        }

        const user = res.user

        //upload user thumbnail
        const uploadPath = `thumbnails/${user.uid}/${thumbnail?.name}`
        const storageRef = ref(storage, uploadPath)

        const img = await uploadBytes(storageRef, thumbnail);
        console.log('File uploaded successfully:', img);

        const imgRef = img.ref;
        const imgUrl = await getDownloadURL(imgRef);
        console.log('Download URL:', imgUrl);


        // add display name to user
        await updateProfile(user, {
            displayName: name,
            photoURL: imgUrl,
        })

        //create user document
        const userDocRef = doc(db, "users", user.uid); // creates a doc in colection "users" with the ID we pass in
        await setDoc(userDocRef, { //setting the document with properties
            online: true,
            displayName: name,
            photoURL: imgUrl,
        })

        return user

    } catch (err) {
        console.log(err);
        throw Error("Oops, something went wrong, check the console")
    }
})

//--- LOGIN ---
export const login = createAsyncThunk('auth/login', async ({ email, password }: userAuth) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (!res) {
            throw new Error("Could not complete login")
        }

        const user = res.user // current user object

        if (user) {
            const userDocRef = doc(db, "users", user.uid) // getting a reference to a document
            await updateDoc(userDocRef, { // updating the doc
                online: true
            })
        }

        return user

    } catch (err) {
        console.log(err);
        throw Error("Oops, something went wrong, check the console")
        // return err
    }
})

//--- LOGOUT ---
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        //update online status
        const user = auth.currentUser //getting the current user object
        if (user) {
            const userDocRef = doc(db, "users", user.uid) // getting a reference to a document
            await updateDoc(userDocRef, { // updating the doc
                online: false
            })
        }

        await signOut(auth) // logging out

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
        }
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