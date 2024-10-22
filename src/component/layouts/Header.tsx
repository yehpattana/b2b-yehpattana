import i18n from "../../config/i18n/i18n";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={
                i18n.resolvedLanguage === "en"
                  ? "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
                  : "https://img.freepik.com/premium-vector/flag-thailand-design-shape-thai-flag_1091279-977.jpg"
              }></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => changeLanguage("th")}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src="https://img.freepik.com/premium-vector/flag-thailand-design-shape-thai-flag_1091279-977.jpg"
          />{" "}
          TH
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
          />{" "}
          EN
        </MenuItem>
      </Menu>
    </Container>
  );
}
