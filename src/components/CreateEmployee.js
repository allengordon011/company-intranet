import { useState } from 'react';
import PropTypes from 'prop-types';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

const CreateEmployee = props => {
	const [employee, setEmployee] = useState({
		fname: '',
		lname: '',
		phone: '',
		email: '',
		address: '',
		gender: '',
		timezone: ''
	});

	const handleChange = (e) => {
		const newEmployee = { ...employee };

		console.log(newEmployee);
		const {id, value} = e.target;
		console.log(id, value);

		setEmployee[id] = value;
		setEmployee(setEmployee);
	};

	const inputFields = Object.keys(employee);
	console.log(inputFields);

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
			}}
			autoComplete="off"
		>
			{
				inputFields.map(input => {
					let label = input.slice(0,1).toUpperCase().concat(input.slice(1));
					return (
						<TextField
							key={input}
							id={input}
							label={label}
							value={employee[input]}
							onChange={handleChange}
						/>
					);
				})
			}
			{/* <TextField
        id="lname"
        label="Last Name"
        defaultValue="foo"
      />
      <TextField
        id="phone"
        label="Phone"
        value={name}
        onChange={handleChange}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
      />
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChange}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
      /> */}
			<Button onClick={props.toggleAddEmployee} variant='contained'>
        Close
			</Button>
		</Box>
	);
};

export default CreateEmployee;
CreateEmployee.propTypes = {

	toggleAddEmployee: PropTypes.func.isRequired
};