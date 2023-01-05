import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
} from 'firebase/firestore'

import { db, } from '../firebase.config'

export const saveItem = async (data) => {
    await setDoc(doc(db, 'foodItems', `${Date.now()}`), data, { merge: true })
}



// getall food items
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(db, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};