import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "../../config/constants";

export const fetchPosts = createAsyncThunk(
    "posts/getPosts",
    async (token, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseURL}/api/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const fetchUserPosts = createAsyncThunk(
    "posts/getUserPosts",
    async ({userId,token}, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseURL}/api/users/posts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const createPost = createAsyncThunk(
    "posts/createPost",
    async ({formData, token}, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseURL}/api/posts`, 
        formData,
        {
          headers: {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}` 
            },
        });
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({postId, liked, token}, {rejectWithValue}) =>{
        try{
            const response = await axios.put(`${baseURL}/api/posts/like`, {postId, liked},
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
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

  export const deleteUserPost = createAsyncThunk(
    "posts/deleteUserPost",
    async ({postId,token},{rejectWithValue})=>{
        try{
            const response = await axios.delete(`${baseURL}/api/users/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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

export const editUserPost = createAsyncThunk(
"posts/updateUserPost",
async({postId, editedContent, token}, {rejectWithValue}) => {
    try{
        const response = await axios.put(`${baseURL}/api/users/${postId}`,
            {editedContent},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
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

export const postSlice = createSlice({
    name: "posts",
    initialState: {
      posts: [],
      userPosts: [],
      postSliceStatus: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        //  for fetchPosts
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.postSliceStatus = "loading..";
        //   state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.postSliceStatus = "success";
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.postSliceStatus = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  for fetchUserPosts
        builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.postSliceStatus = "loading..";
        //   state.error = null;
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          state.postSliceStatus = "success";
          state.userPosts = action.payload;
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
          state.postSliceStatus = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  for createPosts
        builder
        .addCase(createPost.pending, (state) => {
          state.postSliceStatus = "posting...";
        //   state.error = null;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.postSliceStatus = "success";
          state.posts.unshift(action.payload);
        })
        .addCase(createPost.rejected, (state, action) => {
          state.postSliceStatus = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        // for post likes
        builder
        .addCase(likePost.pending, (state) => {
          state.postSliceStatus = "loading..";
        })
        .addCase(likePost.fulfilled, (state, action) => {
          state.postSliceStatus = "success";
          const updatedPost = action.payload;
          const index = state.posts.findIndex((post)=> post.id === updatedPost.id)
          if(index !== -1){
            state.posts[index] = updatedPost;
          }
        })
        .addCase(likePost.rejected, (state, action) => {
          state.postSliceStatus = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  for deleting user post
        builder
        .addCase(deleteUserPost.pending, (state) => {
          state.postSliceStatus = "loading..";
        })
        .addCase(deleteUserPost.fulfilled, (state, action) => {
          state.postSliceStatus = "success";
          const deletedPost = action.payload;
          state.userPosts = state.userPosts.filter((post)=> post.id !== deletedPost.id)
          toast.success("Post deleted successfully.")
        })
        .addCase(deleteUserPost.rejected, (state, action) => {
          state.postSliceStatus = "error";
          state.error = action.payload || "Failed to delete post";
        });

          // for user post update
          builder
          .addCase(editUserPost.pending, (state) => {
            state.postSliceStatus = "loading..";
          })
          .addCase(editUserPost.fulfilled, (state, action) => {
            state.postSliceStatus = "success";
            const updatedPost = action.payload;
            const index = state.userPosts.findIndex((post)=> post.id === updatedPost.id)
            if(index !== -1){
              state.userPosts[index] = updatedPost;
            }
            toast.success("Post edited successfully.")
          })
          .addCase(editUserPost.rejected, (state, action) => {
            state.postSliceStatus = "error";
            state.error = action.payload || "Failed to update user post";
          });
    },
  });
  
  export default postSlice.reducer;