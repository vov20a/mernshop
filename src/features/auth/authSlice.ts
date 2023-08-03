import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../../app/store"

interface AuthSliceState {
    token: string
}
const initialState: AuthSliceState = {
    token: ''
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state) => {
            state.token = ''
        },

    }
})
export const { setCredentials, logOut } = authSlice.actions
export const selectCurrentToken = (state: RootState) => state.auth.token

export default authSlice.reducer