//react
import { useEffect, useRef, useState } from "react"
//firebase
import { OrderByDirection, Query, WhereFilterOp, collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
//ts



//--------------------- subscribing to a real time data from a firestore collection --------------------



export const useCollection = <T>(
    colName: string,
    _query?: [string, WhereFilterOp, unknown?],
    _orderBy?: [string, OrderByDirection]): { documents: T[] | undefined, error: string | undefined } => {

    const [documents, setDocuments] = useState<T[] | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const queryRef = useRef(_query).current //if we dont use a ref -> infitine loop in useEffect; _query is an array and is "different" on every function call
    const orderByRef = useRef(_orderBy).current

    useEffect(() => {
        let colRef: Query = collection(db, colName)

        if (queryRef) {
            colRef = query(colRef, where(...queryRef))
        }

        if (orderByRef) {
            colRef = query(colRef, orderBy(...orderByRef))
            console.log(colRef);

        }

        const unsub = onSnapshot(colRef, (snapshot) => {

            if (!snapshot.empty) {
                const results: T[] = []

                const res = snapshot.docs // storing data from the snapshot; getting array of documents that are on the snapshot of collection

                res.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() } as T)
                })
                setDocuments(results)
                setError(undefined)

            } else {
                setError("Could not fetch data, no data to be shown")
            }

        }, (err) => {
            console.log(err);
            setError("Could not fetch data")
        })

        return () => unsub() //cleanup function - stops listening for snapshots events and stop updating the state

    }, [colName, queryRef, orderByRef])

    return { documents, error }
}