import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const EmployeeDetail = props => {
	return (
		<Popover>
			<Card 
				variant="outlined"
				sx={{
					p: 1,
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
				}}
			>
				<CardMedia
					component="img"
					width="124"
					height="124"
					alt="Beside Myself album cover"
					src="/static/images/cards/basement-beside-myself.jpeg"
					sx={{
						borderRadius: 0.5,
						width: 'clamp(124px, (304px - 100%) * 999 , 100%)',
					}}
				/>
				<Box sx={{ alignSelf: 'center', px: { xs: 0, sm: 2 } }}>
					<Typography
						variant="body1"
						color="text.primary"
						fontWeight={600}
						sx={{
							textAlign: { xs: 'center', sm: 'start' },
							mt: { xs: 1.5, sm: 0 },
						}}
					>
        Ultraviolet
					</Typography>
					<Typography
						component="div"
						variant="caption"
						color="text.secondary"
						fontWeight={500}
						sx={{ textAlign: { xm: 'center', sm: 'start' } }}
					>
        Basement • Beside Myself
					</Typography>
					<Stack
						direction="row"
						spacing={1}
						sx={{
							mt: 2,
							justifyContent: { xs: 'space-between', sm: 'flex-start' },
						}}
					>
						<Button onClick={props.toggleViewDetail} variant='contained'>
              Close
						</Button>
					</Stack>
				</Box>
			</Card>
		</Popover>
	);
};

export default EmployeeDetail;

EmployeeDetail.propTypes = {
	toggleViewDetail: PropTypes.func.isRequired
};