import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// https://jsonplaceholder.typicode.com/posts

const initialState = {
  posts: [],
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectedWithValue, dispatch }) => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch(setPosts(res.data));
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: () => console.log("fullfilled"),
    [getPosts.pending]: () => console.log("pending"),
    [getPosts.rejected]: () => console.log("rejected"),
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
