import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDto } from "interfaces/API";
export type IAuthStore = {
    user: IUserDto | undefined
    token: string

}
const initialState: IAuthStore = {
    user: undefined,
    token: "",
}
const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        login: (state: IAuthStore, action: PayloadAction<IAuthStore>) => {
            state.user = action.payload.user ?? initialState.user
            state.token = action.payload.token ?? initialState.token
        },
        logout: (state) => {
            state.user = initialState.user
            state.token = initialState.token
        },
        updateUserInfo: (state, action: PayloadAction<IUserDto>) => {
            state.user = action.payload
        }
    }
})

export const { login, logout, updateUserInfo } = authReducer.actions
export default authReducer.reducer