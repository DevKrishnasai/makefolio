import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Intropage from "../pages/Intropage";

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

export default function DialogComp({ user, setUser }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you want to change the /{user["portfolioId"]} to other?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={(e) => {
                  handleClose();
                }}
              >
                No
              </Button>
              <Button
                onClick={(e) => {
                  handleClose();
                  setUser({ ...user, portfolioId: "" });
                }}
              >
                yes
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      ) : (
        <Intropage setUser={setUser} user={user} />
      )}
    </>
  );
}
