import {createSlice} from "@reduxjs/toolkit";

const DashboardMenu = createSlice({
  name: 'menu',
  initialState: { name: '공지사항', menuName: '공지사항'},
  reducers: {
    handleMenu(state, action) {
      state.name = action.payload;
      if (state.name === '공지사항') {
        state.menuName = 'Notice';
      } else if (state.name === 'Q & A') {
        state.menuName = 'Qna';
      } else if (state.name === '자주 묻는 질문') {
        state.menuName = 'Faq';
      }
    },

  },
});

export const {handleMenu} = DashboardMenu.actions

export default DashboardMenu;