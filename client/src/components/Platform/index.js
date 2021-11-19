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
        marginTop: 8,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar 
        // sx={{ m: 1, bgcolor: 'secondary.main' }}
        sx={{ width: 120, height: 120, m: 2 }}
        alt={platformName} 
        src={platformImage}>
      </Avatar>
      <Typography color="primary" variant="h4" sx={{ fontWeight: 'bold' }}>
        {platformName}
      </Typography>
      <Typography variant="subtitle1" sx={{ m: 1 }}>
        {platformDescription}
      </Typography>
    </Box>
  );
}

export default Platform;
