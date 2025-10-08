import {configureStore} from '@reduxjs/toolkit'

//import slice
import { authSlice } from '../features/auth/authSlice'
import { chatSlice } from '../features/auth/chatSlice'
import { matchesSlice } from '../features/auth/matchesSlice'
import { playersSlice } from '../features/auth/playersSlice'
import { productsSlice } from '../features/auth/shopSlice'
import { cartSlice } from '../features/auth/shopSlice'




export const store = configureStore({

    reducer: {
        
        auth : authSlice

    },
})