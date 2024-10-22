"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CardProduct from "../../../products/component/Card";
import { Product } from "../../../products/type";
import { apiService } from "../../../../../config/axios/axios-interceptor";
import ProductList from "../../../products/component/List";
import { useRecoilState } from "recoil";
import { typePriceState } from "../../../../../recoil/atoms/recoilState";

export default function ProductsByName() {
  const [sideBar, setSideBar] = useState([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [displayPrice, setDisplayPrice] = useState(false);
  const [sideMenu, setSideMenu] = useState<string>("");
  const [type, setType] = useState("WSP");
  const [, setTypePrice] = useRecoilState(typePriceState);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [paginatedData, setPaginatedData] = useState<Product[]>(
    productList?.slice(startIndex, endIndex)
  );

  const getConfigMenu = async () => {
    const companyId = localStorage.getItem("company_id");
    const response = await apiService.get(`config-menu/${companyId}`);
    const data = response.data?.filter((d) => d.sideBar === true);
    setSideBar(data);
  };

  const getProducts = async () => {
    const companyId = localStorage.getItem("company_id");
    const { data: response } = await apiService.get(
      `products/admin/get-all-products-by-conmpany-id/${companyId}`
    );
    const selectedMenu = localStorage.getItem("menu");
    if (selectedMenu === "home") {
      setProductList(response?.products);
    } else {
      const filterByMenu = response?.products?.filter(
        (p) => p.collection.toLowerCase() === selectedMenu.toLowerCase()
      );
      setProductList(filterByMenu);
      const arr = [];
      for (let index = 0; index < filterByMenu?.length; index++) {
        arr.push(filterByMenu[index].category);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getConfigMenu();
    getProducts();
    setType("WSP");
    setTypePrice("WSP");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery === "" && sideMenu === "") {
      setPaginatedData(productList?.slice(startIndex, endIndex)); // Reset to full list if search query is empty
    } else {
      if (sideMenu === "") {
        const search = productList?.filter(
          (product) =>
            product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.remark.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPaginatedData(search?.slice(startIndex, endIndex));
      } else {
        const filtered = productList?.filter(
          (product) =>
            product?.category?.toLowerCase() === sideMenu?.toLowerCase() ||
            product?.product_group.toLowerCase() === sideMenu?.toLowerCase()
        );
        const search = filtered?.filter(
          (product) =>
            product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.remark.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPaginatedData(search?.slice(startIndex, endIndex));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, productList, sideMenu]);
  return (
    <>
      {paginatedData.length <= 0 && searchQuery == "" && sideMenu === "" ? (
        <div className="flex items-center justify-center w-full p-20 min-h-screen">
          <h1 className=" text-gray text-5xl">Coming Soon</h1>
        </div>
      ) : (
        <div className="bg-white min-h-screen pb-20 px-4 md:px-10 lg:px-20 flex">
          {/* <div className="w-1/6 h-2/6 sticky left-0 top-[154px]">
            <div className="w-full">
              <TextField
                className="mt-1"
                size="small"
                variant="outlined"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <hr className="my-5" />
            </div>
            {sideBar &&
              sideBar.map((s, i) => {
                return (
                  <div key={i}>
                    <h1 className="font-bold p-1 border rounded border-white mt-5">
                      {s.name}
                    </h1>
                    <hr className="my-5" />
                    <h1
                      key={i}
                      className="font-light mb-1 cursor-pointer"
                      onClick={() => setSideMenu("")}
                    >
                      All Category
                    </h1>
                    {s?.subMenus?.map((m, i) => {
                      return (
                        <>
                          {productList.find(
                            (d) =>
                              d.category.toLowerCase() ===
                                m.name.toLowerCase() ||
                              d.product_group.toLowerCase() ===
                                m.name.toLowerCase()
                          ) && (
                            <h1
                              key={i}
                              className={`font-light mb-1 cursor-pointer ${
                                sideMenu === m.name ? "underline" : ""
                              }`}
                              onClick={() => setSideMenu(m.name)}
                            >
                              {m.name}
                            </h1>
                          )}
                        </>
                      );
                    })}
                  </div>
                );
              })}
          </div> */}
          <div className="w-full md:w-1/4 lg:w-1/6 h-auto lg:h-2/6 sticky left-0 top-[154px]">
            <div className="w-full">
              <TextField
                className="mt-1"
                size="small"
                variant="outlined"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <hr className="my-5" />
            </div>
            {sideBar &&
              sideBar.map((s, i) => (
                <div key={i}>
                  <h1 className="font-bold p-1 border rounded border-white mt-5">
                    {s.name}
                  </h1>
                  <hr className="my-5" />
                  <h1
                    key={i}
                    className="font-light mb-1 cursor-pointer"
                    onClick={() => setSideMenu("")}
                  >
                    All Category
                  </h1>
                  {s?.subMenus?.map((m, i) => {
                    return (
                      productList.find(
                        (d) =>
                          d.category.toLowerCase() === m.name.toLowerCase() ||
                          d.product_group.toLowerCase() === m.name.toLowerCase()
                      ) && (
                        <h1
                          key={i}
                          className={`font-light mb-1 cursor-pointer ${
                            sideMenu === m.name ? "underline" : ""
                          }`}
                          onClick={() => setSideMenu(m.name)}
                        >
                          {m.name}
                        </h1>
                      )
                    );
                  })}
                </div>
              ))}
          </div>

          <div className="w-5/6 px-5">
            {/* <div className="bg-white pt-10 w-full sticky right-0 top-[134px]">
              <Box className="flex w-full justify-between items-center">
                <Box className="flex">
                  <Typography className="text-primary font-medium cursor-pointer mr-2">
                    View:
                  </Typography>
                  <Typography
                    className={`text-primary font-medium cursor-pointer ${
                      view === "Grid" ? "underline" : ""
                    }`}
                    onClick={() => setView("Grid")}
                  >
                    Grid{" "}
                  </Typography>
                  <Typography className="mx-2 text-primary font-medium">
                    /
                  </Typography>
                  <Typography
                    className={`text-primary font-medium cursor-pointer ${
                      view === "List" ? "underline" : ""
                    }`}
                    onClick={() => setView("List")}
                  >
                    List
                  </Typography>
                </Box>
                <Box className="flex items-center justify-end w-full">
                  <Typography>not display price</Typography>
                  <Switch
                    size="small"
                    defaultChecked={displayPrice}
                    onChange={(e) => setDisplayPrice(!displayPrice)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>display price</Typography>
                </Box>
                {displayPrice && (
                  <FormControl className="w-56 ml-8" size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setTypePrice(e.target.value);
                      }}
                    >
                      <MenuItem value="WSP">WSP</MenuItem>
                      <MenuItem value="RRP">RRP</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>
              <hr className="my-5" />
            </div> */}
            <div className="bg-white pt-10 w-full sticky right-0 top-[134px]">
              <Box className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                <Box className="flex items-center mb-4 md:mb-0">
                  <Typography className="text-primary font-medium cursor-pointer mr-2">
                    View:
                  </Typography>
                  <Typography
                    className={`text-primary font-medium cursor-pointer ${
                      view === "Grid" ? "underline" : ""
                    }`}
                    onClick={() => setView("Grid")}
                  >
                    Grid{" "}
                  </Typography>
                  <Typography className="mx-2 text-primary font-medium">
                    /
                  </Typography>
                  <Typography
                    className={`text-primary font-medium cursor-pointer ${
                      view === "List" ? "underline" : ""
                    }`}
                    onClick={() => setView("List")}
                  >
                    List
                  </Typography>
                </Box>

                <Box className="flex items-center justify-start md:justify-end w-full mb-4 md:mb-0">
                  <Typography className="mr-2">not display price</Typography>
                  <Switch
                    size="small"
                    defaultChecked={displayPrice}
                    onChange={(e) => setDisplayPrice(!displayPrice)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography className="ml-2">display price</Typography>
                </Box>

                {displayPrice && (
                  <FormControl
                    className="w-full md:w-56 ml-0 md:ml-8"
                    size="small"
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setTypePrice(e.target.value);
                      }}
                    >
                      <MenuItem value="WSP">WSP</MenuItem>
                      <MenuItem value="RRP">RRP</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Box>
              <hr className="my-5" />
            </div>

            <div className="p-1">
              {paginatedData.length === 0 && (
                <div className="flex items-center justify-center w-full p-20 ">
                  <h1 className=" text-gray text-5xl">Coming Soon</h1>
                </div>
              )}
              {view === "Grid" && (
                <Grid container spacing={3}>
                  {paginatedData &&
                    paginatedData.map((data: Product) => (
                      <Grid item xs={12} sm={6} md={3} key={data?.id}>
                        <CardProduct
                          data={data}
                          showPrice={displayPrice}
                          type={type}
                        />
                      </Grid>
                    ))}
                </Grid>
              )}

              {view === "List" && (
                <>
                  {paginatedData &&
                    paginatedData.map((data: Product, i) => (
                      <>
                        <h1 key={i} className="text-gray text-xl font-bold">
                          {data.name}
                        </h1>
                        {data.variant.map((v, i) => {
                          return (
                            <ProductList
                              key={i}
                              product={{ ...data, product_varaints: v }}
                              type={data.remark}
                              displayPrice={displayPrice}
                              typePrice={type}
                            />
                          );
                        })}
                      </>
                    ))}
                </>
              )}

              <Pagination
                count={Math.ceil(productList?.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChange}
                color="primary"
                sx={{ mt: 4, display: "flex", justifyContent: "center" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
