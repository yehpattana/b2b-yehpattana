"use client";

import { useRecoilState } from "recoil";
import { useParams, useRouter } from "next/navigation";
import { languageDropdown } from "../recoil/atoms/recoilState";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { apiService } from "../config/axios/axios-interceptor";
import dynamic from "next/dynamic";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const IconCart = dynamic(() => import("./IconCart"), {
  ssr: false,
});
const IconLogout = dynamic(() => import("./IconLogout"), {
  ssr: false,
});

const LoginModal = dynamic(() => import("./layouts/loginModal"), {
  ssr: false,
});
const Header = dynamic(() => import("./layouts/Header"), {
  ssr: false,
});

export default function Navbar() {
  const params = useParams();
  const [isOpen, setIsOpen] = useRecoilState(languageDropdown);
  const isLanguageOpen = () => setIsOpen(!isOpen);
  const route = useRouter();
  // const { t } = useTranslation();
  const companyName = apiService.getCompanyName();
  const [menuList, setMenuList] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [logo, setLogo] = useState("");
  const [menu, setMenu] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [activeSubMenuButton, setActiveSubMenuButton] = useState(null);

  const getMenuList = async () => {
    const companyId = localStorage.getItem("company_id");
    const response = await apiService.get(`config-menu/${companyId}`);
    const navbarValues = response?.data?.filter((item) => !item.sideBar);
    setMenuList(navbarValues);
    setSubMenuList(
      navbarValues?.find((m) => m.name === params.menu)?.subMenus || []
    );
    // setSubMenuList([]);
  };

  const getSubMenuList = async (subMenus) => {
    setSubMenuList(subMenus);
  };

  const handleMenuClick = (menu, subMenus, index) => {
    route.push(`/${companyName}/${menu}/products`);
    getSubMenuList(subMenus);
    setActiveButton(index + 1);
    setActiveSubMenuButton(null);
    setMenu(menu);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLogo(localStorage.getItem("logo"));
      setMenu(params?.menu as string)
    }
    getMenuList();
  }, []);

  const router = useRouter();
  const menuRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const updateArrows = () => {
      if (menuRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
        setShowLeftArrow(scrollLeft > 0);
        // setShowRightArrow(scrollWidth > clientWidth + scrollLeft);
      }
    };

    if (menuRef.current) {
      menuRef.current.addEventListener("scroll", updateArrows);
    }
    window.addEventListener("resize", updateArrows);
    updateArrows(); // Initial check

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener("scroll", updateArrows);
      }
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollMenu = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 100; // Adjust as needed
      menuRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer object-cover"
              onClick={() => route.push("/")}
              style={{ objectFit: "cover", maxHeight: "65px" }}
            />
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
              <Button
                onClick={() => {
                  route.push(`/${companyName}`);
                  setActiveButton(0);
                  setSubMenuList([]);
                  localStorage.setItem("menu", "home");
                }}
                sx={{
                  my: 2,
                  color: "#1E40AF",
                  display: "block",
                  fontWeight: activeButton === 0 ? "bold" : "700",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: activeButton === 0 ? "3px" : "0",
                    backgroundColor:
                      activeButton === 0 ? "#1E40AF" : "transparent",
                    bottom: "-2px",
                    left: 0,
                    transition: "height 0.3s",
                  },
                }}
              >
                Home
              </Button>
              {menuList?.map((t, i) => (
                <Button
                  key={i}
                  onClick={(event) => handleMenuClick(t.name, t.subMenus, i)}
                  sx={{
                    my: 2,
                    color: "#1E40AF",
                    display: "block",
                    fontWeight:
                      activeButton === i || decodeURIComponent(params?.menu as string) === t.name
                        ? "bold"
                        : "700",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height:
                        activeButton === i + 1 || decodeURIComponent(params?.menu as string)=== t.name
                          ? "3px"
                          : "0",
                      backgroundColor:
                        activeButton === i + 1 || decodeURIComponent(params?.menu as string) === t.name
                          ? "#1E40AF"
                          : "transparent",
                      bottom: "-2px",
                      left: 0,
                      transition: "height 0.3s",
                    },
                  }}
                >
                  {t.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
            <Header />
            <LoginModal />
            <IconCart />
            <IconLogout />
          </Box>
        </Toolbar>
      </Container>
      {subMenuList?.length > 0 && (
        <Toolbar
          sx={{
            backgroundColor: "#001691",
            display: "flex",
            justifyContent: "center",
            maxHeight: "65px",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              {showLeftArrow && (
                <IconButton
                  onClick={() => scrollMenu("left")}
                  sx={{
                    position: "absolute",
                    left: 0,
                    zIndex: 1,
                    // background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              <Box
                ref={menuRef}
                sx={{
                  display: "flex",
                  overflow: "auto",
                  whiteSpace: "nowrap",
                  py: 1,
                  width: "90%",
                }}
                className="no-scrollbar"
              >
                {subMenuList?.map((t, i) => (
                  <Box key={i}>
                    <Button
                      onClick={() => {
                        if (typeof localStorage !== "undefined") {
                          localStorage.setItem("menu", t.name);
                        }
                        console.log('menu', menu)
                        router.push(
                          `/${companyName}/${menu}/products/${t.name}`
                        );
                        setActiveSubMenuButton(i);
                      }}
                      sx={{
                        my: 2,
                        fontWeight: 500,
                        mx: 1,
                        color: "white",
                        display: "block",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "100%",
                          height:
                            activeSubMenuButton === i ||
                            decodeURIComponent(params?.subMenu as string) === t.name
                              ? "3px"
                              : "0",
                          backgroundColor:
                            activeSubMenuButton === i ||
                            decodeURIComponent(params?.subMenu as string) === t.name
                              ? "#FFFFFF"
                              : "transparent",
                          bottom: "-2px",
                          left: 0,
                          transition: "height 0.3s",
                        },
                      }}
                    >
                      {t.name}
                    </Button>
                  </Box>
                ))}
              </Box>
              {showRightArrow && (
                <IconButton
                  onClick={() => scrollMenu("right")}
                  sx={{
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    // background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}
            </Box>
          </Container>
        </Toolbar>
      )}
    </AppBar>
  );
}
