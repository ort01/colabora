import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


// -----------type for slice STATE---------
interface firestoreState {
    document: object | undefined,
    loading: boolean,
    error?: Error | undefined,
    success: boolean | undefined
}

// -----------Defining initial state-------
const initialState: firestoreState = {
    document: undefined,
    loading: false,
    error: undefined,
    success: undefined
}

//--------------SLICE------------------
export const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,

    reducers: {
        firestoreLoading: (state) => {
            state.document = undefined
            state.loading = true
            state.error = undefined
            state.success = undefined
        },
        firestoreError: (state, action: PayloadAction<Error>) => {
            state.document = undefined
            state.loading = false
            state.error = action.payload
            state.success = false
        },
        firestoreAddDoc: (state, action: PayloadAction<object>) => {
            state.document = action.payload
            state.loading = false
            state.error = undefined
            state.success = true
        },
        firestoreDeleteDoc: (state) => {
            state.document = undefined
            state.loading = false
            state.error = undefined
            state.success = true
        }

    },
})


//getting the actions separately
export const { firestoreLoading, firestoreError, firestoreAddDoc, firestoreDeleteDoc } = firestoreSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.firestore.loading
export const selectDocument = (state: RootState) => state.firestore.document
export const selectError = (state: RootState) => state.firestore.error

export default firestoreSlice.reducer