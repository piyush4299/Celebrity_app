import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserDetailCard from "../UserDetailCard";

function UsersListView({ userList, handleEditUserData }) {
  const [accordianStates, setAccordianStates] = React.useState(
    new Array(userList.length).fill(false)
  );

  const handleAccordianChange = (idx) => {
    setAccordianStates((prevState) => {
      let newArrState = [...prevState];
      if (!accordianStates[idx]) {
        newArrState.fill(false);
      }
      newArrState[idx] = !newArrState[idx];
      return newArrState;
    });
  };

  return (
    <div>
      {userList.map((userDetail, idx) => (
        <Accordion
          key={userDetail.id}
          onChange={() => handleAccordianChange(idx)}
          expanded={accordianStates[idx]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`${userDetail.first} ${userDetail.last}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <UserDetailCard
                userDetail={userDetail}
                handleEditUserData={handleEditUserData}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default UsersListView;
