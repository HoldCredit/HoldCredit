import { configureStore } from '@reduxjs/toolkit';
import DashboardMenu from "./DashboardMenuStore";
import CustomerName from "./CustomerNameStore";

function saveToSessionStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    sessionStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serialisedState = sessionStorage.getItem('persistantState');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = configureStore({
  preloadedState: loadFromSessionStorage(),
  reducer: {
    'selectMenu' : DashboardMenu.reducer,
    'customerName' : CustomerName.reducer,
  }
});

store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;
