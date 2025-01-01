import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "../../config/constants";

export const fetchSecondaryUser = createAsyncThunk(
    "user/getSecondaryUser",
    async ({userId,token}, {rejectWithValue})=>{
        try{
            const response = await axios.get(`${baseURL}/api/users/user/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred");
        }
    }
)

export const fetchAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async ({token}, {rejectWithValue})=>{
        try{
            const response = await axios.get(`${baseURL}/api/users/allusers`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred");
        }
    }
)

export const fetchBookmarkedPost = createAsyncThunk(
    "users/fetchBookmarkedPosts", 
    async ({token}, {rejectWithValue} )=>{
        try{
            const response = await axios.get(`${baseURL}/api/users/posts/bookmark`,
                {
                headers:{
                    Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred"); 
        }
    }
)


export const updateBookmarkedPost = createAsyncThunk(
    "users/updateBookmarkedPosts", 
    async ({postId, isBookmarked, token}, {rejectWithValue} )=>{
        try{
            const response = await axios.put(`${baseURL}/api/users/posts/bookmark`,
                {
                    postId,isBookmarked
                },
                {
                headers:{
                    Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(error){
            if (error instanceof Error){
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred"); 
        }
    }
)


//  to update user profile

export const updateUserProfile = createAsyncThunk(
    "users/updateUserProfile",
    async ({profileImage, bio, token}, {rejectWithValue})=>{
        try{
            const response = await axios.put(`${baseURL}/api/users/profile/userprofile`,
                {profileImage,bio},
                {headers: { Authorization: `Bearer ${token}`}}
            )
            return response.data;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred");
        }
    }
)

export const updateUserFollower = createAsyncThunk(
    "users/updateFollowes",
    async({from,to,follow,token},{rejectWithValue})=>{
        try{
            const response = await axios.put(`${baseURL}/api/users/profile/follows`,
                {from,to,follow},
                {headers:{Authorization: `Bearer ${token}`}});
                return response.data
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred");
        }
       
    }
)


export const userSlice = createSlice({
    name:"user",
    initialState: {
        user: {},
        allUsers: [],
        secondaryUser:{},
        bookmarkPosts: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {

        // to update user bookmark posts
        builder
        .addCase(updateBookmarkedPost.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(updateBookmarkedPost.fulfilled, (state, action) => {
          state.status = "success";
          state.bookmarkPosts = action.payload.bookmarkedPosts;
          toast.success(`bookmark updated successfully`)
        })
        .addCase(updateBookmarkedPost.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  to fetch user bookmarked posts
        builder
        .addCase(fetchBookmarkedPost.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(fetchBookmarkedPost.fulfilled, (state, action) => {
          state.status = "success";
        //    this state update should not be like this, it should be like add when bookmarked and filter when removed bookmark
          state.bookmarkPosts = action.payload.bookmarkedPosts;
        })
        .addCase(fetchBookmarkedPost.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        // fetch all users
        builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.status = "success";
        //    this state update should not be like this, it should be like add when bookmarked and filter when removed bookmark
          state.allUsers = action.payload;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch all users";
        });

        builder
        .addCase(updateUserProfile.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.status = "success";
          state.user = action.payload;
          toast.success("User profile updated successfully.")
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        builder
        .addCase(fetchSecondaryUser.pending, (state) => {
            state.status = "loading..";
        })
        .addCase(fetchSecondaryUser.fulfilled, (state, action) => {
            state.status = "success";
            state.secondaryUser = action.payload;
        })
        .addCase(fetchSecondaryUser.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload || "Failed to fetch posts";
        });
        //  to update user followers
        builder
        .addCase(updateUserFollower.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(updateUserFollower.fulfilled, (state) => {
          state.status = "success";   
        //    not using this action anywhere.
        // console.log(action.payload)
        })
        .addCase(updateUserFollower.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

    }

})

export default userSlice.reducer;