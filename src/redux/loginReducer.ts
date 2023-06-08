import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        menus: JSON.parse(window.localStorage.getItem('menus') || '[]')
    },
    reducers: {
        setMenus: (state, action) => {
            window.localStorage.setItem('menus', JSON.stringify(action.payload))
            state.menus = action.payload
        },
    },

});

export const { setMenus } = loginSlice.actions;

export const selectMenus = (state: any) => {
    return state.login.menus
};

export default loginSlice.reducer;
