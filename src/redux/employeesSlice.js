import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		employees: []
	},
	reducers: {
		getEmployees: (state, action) => {
			state.employees = action.payload; 
		}
	}
});

export const { getEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;