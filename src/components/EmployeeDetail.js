import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const EmployeeDetail = props => {
	// New employee addresses don't yet conform to the API
	const address = props.employee?.location ?
		`${ props.employee?.location?.street?.number } ${ props.employee?.location?.street?.name } ${ props.employee?.location?.city } ${ props.employee?.location?.state } ${ props.employee?.location?.postcode }, ${ props.employee?.location?.country }`
		:
		props.employee.address;

	return (
		<Popover
			anchorEl={props.detailAnchor}
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
			<Card 
				variant="outlined"
				sx={{
					p: 1,
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					minWidth: '600px'
				}}
			>{
					!props.employee?.picture?.large ?
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
							src={props.employee?.picture?.large}
							sx={{
								borderRadius: 0.5,
								width: '200px',
								marginRight: '1em'
							}}
						/>
				}
				<Stack
					py={2}
					pr={3}
					spacing={1}
					divider={<Divider flexItem />}
					borderRight='1px solid lightgrey'
					sx={{ width: '100% '}}
				>
					<Typography sx={{ fontSize: '14px' }}>
						Name: { props.employee?.name?.first } { props.employee?.name?.last }
					</Typography>
					{/* <Divider flexItem /> */}
					<Typography sx={{ fontSize: '14px' }}>
						Phone: { props.employee?.phone }
					</Typography>
					<Typography sx={{ fontSize: '14px' }}>
						Email: { props.employee?.email }
					</Typography>
					<Typography sx={{ fontSize: '14px' }} display='flex' flexDirection='column'>
						Address: { address }
					</Typography>
					<Typography sx={{ fontSize: '14px' }}>
						Time Zone: { props.employee?.location?.timezone?.offset } { props.employee?.location?.timezone?.description }
					</Typography>
					<Typography sx={{ fontSize: '14px' }}>
						Gender: { props.employee?.gender?.slice(0,1).toUpperCase().concat(props.employee?.gender?.slice(1)) }
					</Typography>
				</Stack>
				<Box sx={{ alignSelf: 'flex-end', pl:'2em' }}>
					<Button onClick={props.toggleViewDetail}>
            Close
					</Button>
				</Box>
			</Card>
		</Popover>
	);
};

export default EmployeeDetail;

EmployeeDetail.propTypes = {
	detailAnchor: PropTypes.object.isRequired,
	employee: PropTypes.object.isRequired,
	toggleViewDetail: PropTypes.func.isRequired
};