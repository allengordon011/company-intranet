import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { fetchEmployees } from '../redux/employeeSlice';

const EmployeeList = props => {
	const dispatch = useDispatch();
	const refresh = () => {
		dispatch(fetchEmployees());
	};
  
	const [search, handleSearch] = useState('');
	const handleChange = e => {
		const search = e.target.value;
		handleSearch(search);
	};

	return ( 
		<Box sx={{ padding: '2rem 2rem 5rem' }}>
			<Typography
				variant='h5'
				sx={{
					display: 'flex',
					alignItems:'center'
				}}
			>
        Current Employees
				<RefreshIcon onClick={refresh} sx={{ marginLeft: '10px', cursor: 'pointer' }}/>
			</Typography>
			<TextField
				helperText='Search by place (city, state, or country), gender, or year/month of birth'
				id="search"
				value={search}
				onChange={handleChange}
				variant="standard"
				size='small'
				sx={{ pt: '1rem' }}
			/>
			<Grid container spacing={3} pt={4}>
				{
					props.employees?.filter(employee => {
						if (!search) {
							return true;
						}

						// Employee content to be searched
						const data = [
							employee?.location?.state,
							employee?.location?.city,
							employee?.location?.country,
							employee?.gender,
							new Date(employee?.dob?.date)?.getFullYear()?.toString(),
							new Date(employee?.dob?.date)?.toLocaleString('default', { month: 'long' })
						];

						/**
             * Filter employee data values for matches to the search string
             */
						const matches = data.filter(value => {
							for (const string in search) {
								if (search?.[string]?.toLowerCase() != value?.[string]?.toLowerCase()) {
									return false;
								}
							}

							return true;
						});

						return !!matches.length;
					}).map((employee,index) =>
						<Grid key={employee?.login?.uuid ?? index} item>
							<Card
								variant="outlined"
								sx={{
									p: 3,
									display: 'flex',
									flexDirection: 'column',
									width: '200px',
								}}
							>
								{
									!employee?.picture?.large ?
										<AccountBoxIcon
											sx={{
												borderRadius: 0.5,
												width: '150px',
												height: '150px',
											}}
										/>
										: 
										<CardMedia
											component="img"
											alt="headshot"
											src={employee?.picture?.large}
											sx={{
												borderRadius: 0.5,
												width: '150px',
												height: '150px'
											}}
										/>
								}
								<Stack
									pt={1}
									spacing={1}
								>
									<Typography sx={{
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										width: '145px',
										flexShrink: 0,
										fontSize: '14px'
									}}>
										{ employee?.name?.first } { employee?.name?.last }
									</Typography>
									<Divider flexItem />
									<Typography sx={{ fontSize: '14px' }}>
										{ employee?.gender?.slice(0,1).toUpperCase().concat(employee?.gender?.slice(1)) }
									</Typography>
									<Button
										onClick={(e) => props.toggleViewDetail(e, employee)}
										variant='contained'
									>
                    View Detail
									</Button>
								</Stack>
							</Card>
						</Grid>
					)
				}
			</Grid>
		</Box>
	);
};

export default EmployeeList;

EmployeeList.propTypes = {
	employees: PropTypes.array,
	toggleViewDetail: PropTypes.func.isRequired
};