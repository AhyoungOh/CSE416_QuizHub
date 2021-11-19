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
        sx={{ m: 1, bgcolor: 'secondary.main' }}
        alt={platformName} 
        src={platformImage}>
      </Avatar>
      <Typography component="h1" variant="h5">
        {platformName}
      </Typography>
      <Typography component="h2">
        {platformDescription}
      </Typography>
    </Box>
  );
}

export default Platform;
