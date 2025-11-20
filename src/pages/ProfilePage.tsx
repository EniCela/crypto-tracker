import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        p: 3,
        pt: 8,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>E</Avatar>
        <Typography variant="h6" fontWeight="bold">
          Eni Cela
        </Typography>
        <Typography variant="body2" color="text.secondary">
          eni.cela@email.com
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payment Methods" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default ProfilePage;
