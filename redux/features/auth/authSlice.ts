import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null;
}

interface CustomJwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('accessToken');
    },
    getCurrentUser: (state) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken: CustomJwtPayload = jwtDecode(accessToken);
        state.isAuthenticated = true;
        state.user = {
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        };
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
});

export const { logout, getCurrentUser } = authSlice.actions;
export default authSlice.reducer;
