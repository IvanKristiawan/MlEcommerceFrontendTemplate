import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function ShowTableStok({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Product Id</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category Id</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.product_id.toString().includes(searchTerm) ||
                val.category_id.toString().includes(searchTerm) ||
                val.price.toString().includes(searchTerm)
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/stok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.product_id}
                </TableCell>
                <TableCell>{user.category_id}</TableCell>
                <TableCell>{user.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableRecommendation({ currentPosts, stoks }) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Correlation</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Product Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(currentPosts).map(function (user, index) {
            return (
              <TableRow
                key={currentPosts[index].product_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
              >
                <TableCell component="th" scope="row">
                  {currentPosts[index].Correlation}
                </TableCell>
                <TableCell>{currentPosts[index].product_id}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
