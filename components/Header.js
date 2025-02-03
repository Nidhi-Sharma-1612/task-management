"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" className="bg-blue-600 shadow-lg">
      <Toolbar className="flex justify-between items-center p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Typography
            variant={isMobile ? "h6" : "h5"}
            className="text-white font-semibold"
          >
            📝 Task Manager
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
