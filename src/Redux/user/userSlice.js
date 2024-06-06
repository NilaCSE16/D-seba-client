import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import API from "../../Services/API";
import { auth } from "../../../firebase.config";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const createUserWithGoogle = createAsyncThunk(
  "/user/register-with-google",
  async () => {
    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);
      // console.log(user._tokenResponse);
      if (user) {
        const { displayName, email } = user._tokenResponse;
        const { data } = await API.post("/user/google-sign-in", {
          name: displayName,
          email,
        });
        if (data?.success) {
          localStorage.setItem("token", data.token);
          alert(`${data.message}`);
          window.location.replace("/");
          return data.user;
        }
      }
      // return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "/user/register",
  async ({ name, email, password, isAdmin }) => {
    try {
      // console.log(name);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user);
      if (user) {
        const { data } = await API.post("/user/register", {
          name,
          email,
          password,
          isAdmin,
        });
        if (data?.success) {
          alert(`${data.message}`);
          window.location.replace("/login");
          return user;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "/user/login",
  async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
      if (user) {
        const { data } = await API.post("/user/login", { email, password });
        // window.location.reload();
        if (data?.success) {
          localStorage.setItem("token", data.token);
          alert(`${data.message}`);
          window.location.replace("/");
          return data.user;
        }
      }
      // return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk("/user/logout", async () => {
  try {
    await signOut(auth);
    // console.log(user);
    // if (!user) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    // }
  } catch (error) {
    console.log(error);
  }
});

// export const getUserData = createAsyncThunk('/user/getUserData', async () => {
//   try {
//     const user = await API.post('/user/getUserData')
//   } catch (error) {
//     console.log(error)
//   }
// })

const userSlice = createSlice({
  name: "user",
  initialState,
  //   reducers: {
  //     setUser: (state, action) => {
  //       state.currentUser = action.payload;
  //     },
  //     setLoading: (state, action) => {
  //       state.loading = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(createUserWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(createUserWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.error = "Error occur";
      });
  },
});

export default userSlice.reducer;
