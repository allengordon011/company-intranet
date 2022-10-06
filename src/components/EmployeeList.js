import { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import EmployeeDetail from './EmployeeDetail';
import CreateEmployee from './CreateEmployee';

const EmployeeList = props => {
	const [detailVisible, toggleDetail] = useState(false);
	const [search, handleSearch] = useState('');
	const [addVisible, toggleAdd] = useState(false);

	const toggleViewDetail = () => toggleDetail(prev => !prev);
	const toggleAddEmployee = () => toggleAdd(prev => !prev);
  
	const handleChange = e => {
		const search = e.target.value;
		console.log(search);
		handleSearch(search);
	};

	return ( 
		<Container sx={{minHeight:'100vh', minWidth:'100vw'}} p={12} disableGutters>
			<Box bgcolor='#616161' color='white' height={200} p={5}>
				<Typography variant='h3'>
          Company Intranet
				</Typography>
				<TextField
					helperText='Search by name, gender'
					id="search"
					label="Search"
					value={search}
					onChange={handleChange}
					variant="filled"
				/>
				<Button onClick={toggleAddEmployee} aria-label="add employee" variant='contained'>
          Add an Employee
				</Button>
			</Box>
			<Box height='calc(100vh - 200px)' p={5}>
				<Typography variant='h5'>
          Current Employees
				</Typography>
				<Grid>
					{
						props.employees?.map(employee => {
							<Card
								variant="outlined"
								sx={{
									p: 1,
									display: 'flex',
									flexDirection: { xs: 'column', sm: 'row' },
								}}
							>
								{ employee.fname }
								<Button onClick={toggleViewDetail} variant='contained'>
                  View Detail
								</Button>
							</Card>;
						})
					}
				</Grid>
			</Box>
			{
				detailVisible &&
          <EmployeeDetail toggleViewDetail={toggleViewDetail} />
			}
			{
				addVisible &&
          <CreateEmployee viewDetail={toggleAddEmployee} />
			}
		</Container>
	);
};

export default EmployeeList;

EmployeeList.propTypes = {
	employees: PropTypes.array
};