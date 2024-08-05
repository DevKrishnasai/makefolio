import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogComp({
  values,
  setValues,
  setUser,
  setDecline,
  decline,
  toggle,
  setToggle,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_BACKEND_URL}/deleteusers/deleteUser`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: values["email"] }),
        }
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setOpen(false);
          setValues({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setUser({
            email: "",
            name: "",
            portfolioId: "",
          });
          setToggle(!toggle);
          setDecline(false);
        });
    } catch (err) {
      setUser({
        email: "",
        name: "",
        portfolioId: "",
      });
      console.log(err);
      setDecline(!decline);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        About Terms and Conditions
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action will delete the account you created before!!
          <br />
          If you want to continue with the creation of portfolio accept the
          terms and conditions else click on Decline :(
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={(e) => {
            handleClose();
          }}
        >
          Decline
        </Button>
        <Button
          onClick={(e) => {
            setOpen(false);
            // setUser({ ...user, portfolioId: "" });
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
