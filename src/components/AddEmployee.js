import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {addEmployee} from '../redux/employeeSlice';

const EmployeeInitialState = {
	fname: '',
	lname: '',
	phone: '',
	email: '',
	address: '',
	gender: '',
	timezone: ''
};

const AddEmployee = props => {
	const [employee, setEmployee] = useState(EmployeeInitialState);

	const handleChange = e => {
		const newEmployee = { ...employee };

		const {id, name, value} = e.target;

		// id isn't passed for <Select>. use name.
		const key = id ?? name;
		newEmployee[key] = value;

		setEmployee(newEmployee);
	};

	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();

		const newEmployee = { ...employee };

		// Match the API object
		newEmployee.name = {
			first: newEmployee.fname,
			last: newEmployee.lname,
		};

		delete newEmployee.fname;
		delete newEmployee.lname;

  	dispatch(addEmployee(newEmployee));

		// Close the Popover
		props.toggleAddEmployee();
	};
  
	const inputFields = Object.keys(employee);

	// Disable Submit unless every input is filled
	// TODO: validate phone, email, etc
	let submitDisabled = true;
	const values = Object.values(employee);
	if (values.every(val => val)) {
		submitDisabled = false;
	}

	return (
		<Popover
			anchorEl={props.addAnchor}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			open={true}
		>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ width: '400px' }}
				px={4}
				py={3}
				autoComplete="off"
			>
				<Stack spacing={1}>
					{
						inputFields.map(input => {
							let label =
              input === 'fname' ? 'First Name' :
              	input === 'lname' ? 'Last Name' :
              		input.slice(0,1).toUpperCase().concat(input.slice(1));

							if (input !== 'gender') {
								return (
									<TextField
										key={input}
										id={input}
										label={label}
										required
										value={employee[input]}
										onChange={handleChange}
									/>
								);
							}

							return (
								<FormControl key={input} required>
									<InputLabel>
										{ label }
									</InputLabel>
									<Select
										labelId={input}
										name={input}
										label={input}
										value={employee[input]}
										onChange={handleChange}
									>
										<MenuItem value='Male'>
                      Male
										</MenuItem>
										<MenuItem value='Female'>
                      Female
										</MenuItem>
									</Select>
								</FormControl>
							);
						})
					}
					<Button
						disabled={submitDisabled}
						type='submit'
						onClick={handleSubmit}
						size='large'
						variant='contained'
					>
            Submit
					</Button>
					<Button
						onClick={props.toggleAddEmployee}
						size='large'
						variant='outlined'
					>
            Close
					</Button>
				</Stack>
			</Box>
		</Popover>
	);
};

export default AddEmployee;

AddEmployee.propTypes = {
	addAnchor: PropTypes.object.isRequired,
	toggleAddEmployee: PropTypes.func.isRequired
};