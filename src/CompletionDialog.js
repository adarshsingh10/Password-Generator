import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const CompletionDialog = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Copied
            </DialogTitle>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    Thank You!
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CompletionDialog;