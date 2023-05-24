import {configureStore, createSlice} from "@reduxjs/toolkit";
import {BoardData} from "./BoardData";

const DashboardMenu = createSlice({
  name: 'menu',
  initialState: { name: 'Reports Summary', menuName: 'Reports Summary', currentPage:0},
  reducers: {
    handleMenu(state, action) {
      state.name = action.payload;
      if (state.name === '공지사항') {
        state.menuName = 'Notice';
      } else if (state.name === 'Q & A') {
        state.menuName = 'Qna';
      }
    },

  },
});

export const {handleMenu} = DashboardMenu.actions

export default configureStore({
  reducer: {
    'selectMenu' : DashboardMenu.reducer,
    'getData' : BoardData.reducer
  }
})