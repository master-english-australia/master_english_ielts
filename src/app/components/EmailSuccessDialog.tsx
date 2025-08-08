"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface EmailSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  onGoToList: () => void;
}

export function EmailSuccessDialog({
  open,
  onClose,
  onGoToList,
}: EmailSuccessDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Submission Sent
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Your submission has been successfully sent. You can go back to the
          tests list.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={onGoToList} variant="contained" color="success">
          Go to Tests List
        </Button>
      </DialogActions>
    </Dialog>
  );
}
