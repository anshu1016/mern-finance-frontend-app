import { Box, useTheme, Typography} from '@mui/material'
import React, { useState } from 'react'
import { FlexBetween } from '../../components/FlexBetween';
import PixIcon from '@mui/icons-material/Pix';
import { Link } from 'react-router-dom';
type Props = {}

const Navbar = (props: Props) => {
    const [selected,setSelected] = useState("dashboard")
    const {palette } = useTheme();
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
<FlexBetween gap="0.75rem">
    <PixIcon sx={{fontSize:"28px"}}/>
    <Typography variant='h4' fontSize={"16px"}>Finanseer</Typography>
</FlexBetween>
{/**RIGHT SIDE */}
<FlexBetween gap="2rem">
    <Box sx={{"&:hover":{color:palette.primary[100]}}}>
        <Link to="/" onClick={()=>setSelected("dashboard") } style={{ color:selected==="dashboard"?"inherit" : palette.grey[700] , textDecoration:"inherit"}} >Dashboard</Link>
    </Box>
    <Box sx={{"&:hover":{color:palette.primary[100]}}}>
        <Link to="/predictions" onClick={()=>setSelected("predictions") } style={{ color:selected==="predictions"?"inherit" : palette.grey[700] , textDecoration:"inherit"}} >Prediction</Link>
    </Box>
</FlexBetween>
    </FlexBetween>
  )
}

export default Navbar