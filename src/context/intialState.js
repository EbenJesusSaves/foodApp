import { fetchCart, fetchUser } from "../utils/fetchLocalStorage"

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user: userInfo,
    foodItems: null,
    cardShow: false,
    cartItems: cartInfo
}