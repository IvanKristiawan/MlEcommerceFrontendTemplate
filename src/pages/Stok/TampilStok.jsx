import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import {
  ShowTableStok,
  ShowTableRecommendation
} from "../../components/ShowTable";
import { SearchBar, Loader, usePagination } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";

const TampilStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product_id, setProductId] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.product_id.toString().includes(searchTerm) ||
      val.category_id.toString().includes(searchTerm) ||
      val.price.toString().includes(searchTerm)
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUsers();
    id && getUserById();
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/stoks/${id}`);
      setProductId(response.data[1].product.product_id);
      setCategoryId(response.data[1].product.category_id);
      setPrice(response.data[1].product.price);
      setRecomendation(response.data[0].recommendation);
      // alert(Object.keys(response.data[0].recommendation))
      // alert(response.data[0].recommendation[0].Correlation);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575" sx={{ textAlign: "center" }}>
        Master
      </Typography>
      <Typography variant="h4" sx={subTitleText}>
        Stok
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Product Id"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={product_id}
          />
          <TextField
            id="outlined-basic"
            label="Categori Id"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={category_id}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={price}
          />
        </Box>
      </Box>
      <Box sx={tableContainer}>
        <ShowTableRecommendation
          currentPosts={recomendation}
          stoks={currentPosts}
          productId={product_id}
        />
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableStok currentPosts={currentPosts} searchTerm={searchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
          size={"large"}
        />
      </Box>
    </Box>
  );
};

export default TampilStok;

const container = {
  pt: 10,
  backgroundColor: "white"
};

const subTitleText = {
  fontWeight: "900",
  textAlign: "center"
};

const dividerStyle = {
  pt: 4
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const textFieldStyle = {
  display: "flex",
  mt: 4
};

const searchBarContainer = {
  pt: 6,
  display: "flex",
  justifyContent: "center"
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
};
