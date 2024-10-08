import { Box, Link, Stack, Typography } from '@mui/material'
import Iconify from 'components/iconify'
import { RouterLink } from 'routes/components'

const Step3 = ({reset}:{reset:()=>void}) => {
  return (
    <Box sx={{minHeight:"300px",display:'flex',justifyContent:'center',alignItems:'center',mt:5}}>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',mb:5}}>
            {/* <Box sx={{borderRadius:100,
                bgcolor:(theme)=>theme.palette.success.light,
                height:"25vh",
                width:"25vh",
                display:'flex',justifyContent:'center',alignItems:'center'
            }}
            >
                <Iconify icon="mdi:sucess-outline" width="10vh"/>
            </Box> */}
            <Iconify icon="flat-color-icons:approval" width="25vh"/>
            <Box>
                <Typography variant="h4" align='center' sx={{mt:2}}>
                    Question Saved Successfully!
                </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
                    <Link
                    variant="subtitle2"
                    component={RouterLink}
                    href="/questions"
                    >
                    Go back to Question management
                    </Link>
                    <Typography variant='subtitle1'>Or</Typography>
                    <Link
                    variant="subtitle2"
                    onClick={reset}
                    >
                    Create another question
                    </Link>
            </Stack>
        </Box>
    </Box>
  )
}

export default Step3