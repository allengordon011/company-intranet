import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

const store = configureStore({
	reducer: employeeReducer
});

export default store;