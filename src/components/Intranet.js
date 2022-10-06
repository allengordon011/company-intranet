// import { useState } from 'react';
import Container from '@mui/material/Container';

import EmployeeList from './EmployeeList';
// import EmployeeDetail from './EmployeeDetail';

const Intranet = () => {
	// const [detailVisible, toggleDetail] = useState(false);

	// const handleToggleDetail = () => toggleDetail(prev => !prev);

	return (
		<Container sx={{minHeight:'100vh', minWidth:'100vw'}} p={12}>
			<EmployeeList />
			{/* {
          detailVisible &&
              <EmployeeDetail />
        } */}
		</Container>
	);
};

export default Intranet;