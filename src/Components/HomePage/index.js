import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import UsersListView from "../UsersListView";
import UsersData from "../../data/celebrities.json";

const HomePage = () => {
  const [usersData, setUsersData] = useState(UsersData);
  const [searchInputVal, setSearchInputVal] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchInputVal(event.target.value);
  };

  const handleEditUserData = (userDetail, operation) => {
    let copyUsersData;
    switch (operation) {
      case "edit":
        copyUsersData = [...usersData].map((userData) => {
          if (userData.id === userDetail.id) {
            userData = { ...userDetail };
          }
          return userData;
        });
        break;
      case "delete":
        copyUsersData = [...usersData].filter(
          (userData) => userData.id !== userDetail.id
        );
        break;
      default:
        console.log("NOT CLEAR: Operation to perform whether edit or delete");
        break;
    }

    setUsersData([...copyUsersData]);
  };

  return (
    <>
      <p>Users view</p>
      <TextField
        fullWidth
        label="Search User"
        id="searchInput"
        onChange={handleSearchInputChange}
      />
      <UsersListView
        handleEditUserData={handleEditUserData}
        userList={usersData.filter(
          (userDetail) =>
            userDetail.first.toUpperCase() === searchInputVal.toUpperCase() ||
            userDetail.last.toUpperCase() === searchInputVal.toUpperCase() ||
            searchInputVal.length === 0
        )}
      />
    </>
  );
};

export default HomePage;
