import { createContext } from "react";

const DataContext = createContext({
  user: null,
  setUser: () => {},
  userProfile: null,
  setUserProfile: () => {},
  addReminder: () => {},
  isAuthChecked: null,
  setSessionId: () => {},
  deleteReminder: () => {},
  editReminder: () => {},
  currentOffering: null,
  isDataFetched: null,
  addCard: () => {},
  deleteCard: () => {},
  editCard: () => {},
  loading: null,
  setLoading: () => {},
  addToCardCount: () => {},
});

export default DataContext;
