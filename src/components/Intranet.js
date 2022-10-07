import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {fetchEmployees} from '../redux/employeeSlice';

import EmployeeList from './EmployeeList';
import EmployeeDetail from './EmployeeDetail';
import AddEmployee from './AddEmployee';

const Intranet = () => {
	const [detailAnchor, setAnchorEl] = useState(null);
	const [employee, handleDetail] = useState(null);
	const [addAnchor, toggleAdd] = useState(null);

	/**
   * 
   * @param {Object} e event
   * @param {Object} employee the employee clicked
   */
	const toggleViewDetail = (e, employee) => {
		// Set the Popper anchor and employee
		setAnchorEl(prevAncor => {
			handleDetail(prevEmployee => {
				if (prevEmployee) {
					return null;
				}

				return employee;
			});

			if (prevAncor) {
				return null;
			}

			return e.currentTarget;
		});
	};

	const toggleAddEmployee = e => toggleAdd(prevAnchor => prevAnchor ? null : e.currentTarget);

	/**
   * Fetch all employees on mount
   */
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	const employees = useSelector(state => state.employees);

	return (
		<Container sx={{ minHeight:'100vh' }} disableGutters>
			<Box bgcolor='#616161' color='white' p={5}>
				<Typography variant='h3' pb={2}>
          Company Intranet
				</Typography>
				<Button
					onClick={toggleAddEmployee}
					aria-label="add employee"
					variant='contained'
					size='large'
				>
          Add an Employee
				</Button>
			</Box>
			<EmployeeList employees={employees} toggleViewDetail={toggleViewDetail} />
			{
				detailAnchor &&
          <EmployeeDetail detailAnchor={detailAnchor} employee={employee} toggleViewDetail={toggleViewDetail} />
			}
			{
				addAnchor &&
          <AddEmployee addAnchor={addAnchor} toggleAddEmployee={toggleAddEmployee} />
			}
		</Container>
	);
};

export default Intranet;