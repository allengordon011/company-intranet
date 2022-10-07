import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('fetchEmployees', async () => {
	const res = await fetch('https://randomuser.me/api/')
		.then(data => data.json())
		.catch(e => console.error(e));

	return res.results;
});

const employeeSlice = createSlice({
	name: 'employee',
	initialState: {
		employees: [],
		status: 'idle'
	},
	reducers: {
		addEmployee: (state, action) => {
			state.employees.push(action.payload); 
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEmployees.fulfilled, (state, action) => {
			state.employees.push(...action.payload);
		});
	}
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;