import {createSlice} from "@reduxjs/toolkit";

const CustomerName = createSlice({
  name: 'customerName',
  initialState: '',
  reducers: {
    setName(state,action) {
      return state = action.payload;
    },
    handleLogout(state,action) {
      sessionStorage.clear();
      return state = action.payload
    }
  },
});

export const {setName, handleLogout} = CustomerName.actions
export default CustomerName;