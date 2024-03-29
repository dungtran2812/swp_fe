import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        className="pro-inner-item"
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = () => {
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
          color: "black",
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
          height: "100%",
        }}
      >
        <Menu
          iconShape="square"
          style={{
            // backgroundColor: `#00e5ff`,
            backgroundImage: `linear-gradient(to right top, #ffab91, #ffb085, #ffb678, #ffbe6b, #ffc75f, #f1d360, #e0df66, #cdea72, #aaf498, #8dfbbf, #7efee3, #84ffff)`,
            height: `100vh`,
            minHeight: "100%",
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
              color: "#455a64",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="4px"
              >
                <Typography variant="h6">TRANG NHÂN VIÊN</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{
                      color: `#0091F2`,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={"#fff"}
                  fontWeight="bold"
                  sx={{ m: "30px 0 0 0" }}
                >

                </Typography>
                <Typography variant="p" color={colors.grey[900]}>

                </Typography>
              </Box>
            </Box>
          )} */}

          <Box>
            {/* <Item
              title="Dashboard"
              to="/staff-dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={"#eee"}
              sx={{ m: "15px 0 5px 20px" }}
            >
            </Typography> */}
            <Item
              title="Danh sách dự án"
              to="/staff-dashboard/viewRegisterList"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tạo dự án mẫu"
              to="/staff-dashboard/createsample"
              icon={<AddCircleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thông tin cá nhân"
              to="/staff/Profile"
              icon={<AccountBoxOutlinedIcon />}
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
