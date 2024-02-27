import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "./theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      className="pro-inner-item"
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-menu-button:hover": {
          backgroundColor: `#151A2D`,
        },
        "& .pro-sidebar-inner": {
          backgroundColor: `red`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 0px !important",
          color: "white",
        },
        "& .pro-inner-item:hover": {
          color: "#000",
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        style={{
          padding: `0px`,
        }}
      >
        <Menu
          iconShape="square"
          style={{
            backgroundColor: `#1F2942`,
            height: `100vh`,
            overflowY: `auto`,
            paddingLeft: `0px`,
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon color="#fff" /> : undefined}
            style={{
              margin: "8px 0 8px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="4px"
              >
                <Typography variant="h5">ADMIN</Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  color={"#fff"}
                >
                  <MenuOutlinedIcon
                    style={{
                      color: `#fff`,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={"#fff"}
                  fontWeight="bold"
                  sx={{ m: "30px 0 0 0" }}
                >
                  interior Design
                </Typography>
                <Typography variant="p" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={"#eee"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Add Staff"
              to="/staff/add"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Staff Team"
              to="/staff"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Staff Information"
              to="/staff/information"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
