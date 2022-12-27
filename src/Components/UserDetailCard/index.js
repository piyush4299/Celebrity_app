import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import calculateAge from "../../utils/calculateAge";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import isUserAdult from "../../utils/isUserAdult";
import "./style.css";

function UserDetailCard({ userDetail, handleEditUserData }) {
  const { gender, dob, country, description, first, last } = userDetail;

  const [editMode, setEditMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorState, setErrorState] = React.useState({
    errorStat: false,
    message: ""
  });
  const [editableFieldData, setEditableFieldData] = React.useState({
    first,
    last,
    gender,
    country,
    description
  });

  const performEditAction = () => {
    if (
      editableFieldData.gender === gender &&
      editableFieldData.country === country &&
      editableFieldData.description === description &&
      editableFieldData.first === first &&
      editableFieldData.last === last
    ) {
      setErrorState({ errorStat: true, message: "Change something" });
    } else if (
      editableFieldData.country === "" ||
      editableFieldData.description === "" ||
      (editableFieldData.first === "" && editableFieldData.last === "")
    ) {
      setErrorState({ errorStat: true, message: "Required field" });
    } else {
      let editUserData = {
        ...userDetail,
        first: editableFieldData.first,
        last: editableFieldData.last,
        gender: editableFieldData.gender,
        country: editableFieldData.country,
        description: editableFieldData.description
      };
      handleEditUserData(editUserData, "edit");
      setEditMode(false);
    }
  };

  const performDeleteAction = (userDetail) => {
    handleEditUserData(userDetail, "delete");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="UserDetailCard">
        {editMode ? (
          <TextField
            id="User"
            defaultValue={`${userDetail.first} ${userDetail.last}`}
            InputProps={{
              readOnly: !isUserAdult(calculateAge(dob))
            }}
            onChange={(event) => {
              setEditableFieldData({
                ...editableFieldData,
                first: event.target.value.split(" ")[0],
                last: event.target.value.split(" ")[1]
              });
            }}
          />
        ) : (
          <></>
        )}
        <div className="UserDetailCard__trivialDetails">
          <div>
            <p className="UserDetailCard__detailheading">Age</p>
            {editMode ? (
              <TextField
                id="age-read-only-input"
                defaultValue={`${calculateAge(dob)} Years`}
                InputProps={{
                  readOnly: true
                }}
              />
            ) : (
              <p>{calculateAge(dob)} Years</p>
            )}
          </div>

          <div>
            <p className="UserDetailCard__detailheading">Gender</p>
            {editMode ? (
              <Select
                error={errorState.errorStat}
                labelId="gender-select-label"
                id="gender-select"
                value={editableFieldData.gender}
                label="gender"
                onChange={(event) => {
                  setErrorState({
                    errorStat: false,
                    message: ""
                  });
                  setEditableFieldData({
                    ...editableFieldData,
                    gender: event.target.value
                  });
                }}
              >
                {[
                  "male",
                  "female",
                  "Transgender",
                  "Rather not say",
                  "Other"
                ].map((genderText, idx) => (
                  <MenuItem key={idx} value={genderText}>
                    {genderText}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <p>{gender}</p>
            )}
          </div>

          <div>
            <p className="UserDetailCard__detailheading">Country</p>
            {editMode ? (
              <TextField
                id="country-input"
                error={errorState.errorStat}
                defaultValue={editableFieldData.country}
                onChange={(event) => {
                  setErrorState({
                    errorStat: false,
                    message: ""
                  });
                  setEditableFieldData({
                    ...editableFieldData,
                    country: event.target.value
                  });
                }}
                helperText={errorState.message}
              />
            ) : (
              <p>{country}</p>
            )}
          </div>
        </div>
        <div className="UserDetailCard__userDescription">
          <div>
            <p className="UserDetailCard__detailheading">Description</p>
            {editMode ? (
              <TextField
                error={errorState.errorStat}
                id="description-input"
                defaultValue={editableFieldData.description}
                multiline
                maxRows={6}
                onChange={(event) => {
                  setErrorState({
                    errorStat: false,
                    message: ""
                  });
                  setEditableFieldData({
                    ...editableFieldData,
                    description: event.target.value
                  });
                }}
                helperText={errorState.message}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>
        <div className="UserDetailCard__cardActions">
          {editMode ? (
            <>
              <span>
                <DoneIcon
                  onClick={() => {
                    performEditAction();
                  }}
                />
              </span>
              <span>
                <HighlightOffIcon
                  onClick={() => {
                    setErrorState({ errorStat: false, message: "" });
                    setEditMode(false);
                  }}
                />
              </span>
            </>
          ) : (
            <>
              <span>
                <EditIcon onClick={() => setEditMode(true)} />
              </span>
              <span>
                <DeleteIcon onClick={() => setOpen(true)} />
              </span>
            </>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => performDeleteAction(userDetail)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserDetailCard;
