import {configureStore} from '@reduxjs/toolkit'

//import slice
import { authSlice } from '../features/auth/authSlice'
import { chatSlice } from '../features/chat/chatSlice'
import { matchesSlice } from '../features/matches/matchesSlice'
import { playersSlice } from '../features/player/playersSlice'
import { productsSlice } from '../features/shop/productsSlice'
import { cartSlice } from '../features/shop/cartSlice'
import { uiSlice } from '../features/ui/uiSlice'




export const store = configureStore({

    reducer: {
        ui : uiSlice,
        products : productsSlice,
        cart : cartSlice,
        players : playersSlice,
        matches : matchesSlice,
        chat : chatSlice,
        auth : authSlice

    },
})