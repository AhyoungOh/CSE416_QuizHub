// Platform Profile in Platform Page: detail (creator platform, consumer platform)
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';

function Platform({
  platformName,
  platformImage,
  platformDescription,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <Avatar 
        // sx={{ m: 1, bgcolor: 'secondary.main' }}
        sx={{ width: 110, height: 110, m: 2 }}
        alt={platformName} 
        src={platformImage}>
      </Avatar>
      <Typography color="primary" variant="h5" sx={{ fontWeight: 'bold' }}>
        {platformName}
      </Typography>
      <Typography variant="subtitle1" sx={{ m: 1 }}>
        {platformDescription}
      </Typography>
    </Box>
  );
}

export default Platform;
