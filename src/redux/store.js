import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../features/Auth/authSlice.js";
import { postSlice } from "../features/Posts/postSlice.js";
import { userSlice } from "../features/User/userSlice.js";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        posts:postSlice.reducer,
        users:userSlice.reducer
    }
})

export default store;