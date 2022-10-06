import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeesSlice';

export default configureStore({
	reducer: {
		employees: employeeReducer
	}
});