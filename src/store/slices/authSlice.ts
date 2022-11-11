import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  loading: true,
  dataEditUser: null,
};

export const getAuth = createAsyncThunk('auth/getAuth', async () => {
  try {
  } catch (error) {
    console.log({error});
    return false;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  try {
    await AsyncStorage.removeItem('accessToken');
    dispatch(setUser(null));
  } catch (error) {
    console.log('log out error', error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setDataEditUser(state, action) {
      state.dataEditUser = action.payload;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAuth.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload) {
        state.user = action.payload;
        state.loading = false;
      } else {
        state.loading = false;
      }
    });
  },
});

export const {setUser, setDataEditUser} = authSlice.actions;
export default authSlice.reducer;
