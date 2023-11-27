//redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
//firebase
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
//ts
import { ProjectDocument } from '../../interfaces/Collections'


// -----------type for slice STATE---------
interface firestoreState {
    document: object | null,
    loading: boolean,
    fireStoreSliceError?: Error | null,
    success: boolean | null
}

interface firestoreAdd {
    colName: string,
    doc: ProjectDocument
}
interface firestoreDelete {
    colName: string,
    docId: string
}



// -----------Defining initial state-------
const initialState: firestoreState = {
    document: null,
    loading: false,
    fireStoreSliceError: null,
    success: null
}

//-----------------Async thunk for firebase signup, login, signout-----------------
// ADD
export const addDocument = createAsyncThunk('firestore/add', async ({ colName, doc }: firestoreAdd) => {
    const colRef = collection(db, colName)

    try {
        const createdAt = serverTimestamp() //creating a timestamp

        const addedDoc = await addDoc(colRef, { ...doc, createdAt })

        return addedDoc

    } catch (err) {
        console.log(err);
        throw Error("Oops, something went wrong with adding the document")
    }

})
//DELETE
export const deleteDocument = createAsyncThunk('firestore/delete', async ({ colName, docId }: firestoreDelete) => {

    try {
        const docRef = doc(db, colName, docId)
        await deleteDoc(docRef)

    } catch (err) {
        console.log(err);
        throw Error("Oops, something went wrong with deleting the document")
    }
})



//--------------SLICE------------------
export const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,

    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //ADD
            .addCase(addDocument.fulfilled, (state, action) => {
                state.document = action.payload
                state.loading = false
                state.fireStoreSliceError = null
                state.success = true
            })
            .addCase(addDocument.pending, (state) => {
                state.loading = true
            })
            .addCase(addDocument.rejected, (state, action) => {
                state.document = null
                state.loading = false
                state.fireStoreSliceError = { name: 'UnknownError', message: "UnknownError", ...action.error }
                state.success = false
            })
            //DELETE
            .addCase(deleteDocument.fulfilled, (state) => {
                state.document = null
                state.loading = false
                state.fireStoreSliceError = null
                state.success = true
            })
            .addCase(deleteDocument.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.loading = false
                state.fireStoreSliceError = { name: 'UnknownError', message: "UnknownError", ...action.error }
                state.success = false
            })
    }
})


//getting the actions separately
// export const { } = firestoreSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFirestore = (state: RootState) => state.firestore

export default firestoreSlice.reducer