"use client";

import { IeltsSection } from "@/app/models/IeltsTest";
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
  testType: IeltsSection;
}

export function EmailSuccessDialog({
  open,
  onClose,
  onGoToList,
  testType,
}: EmailSuccessDialogProps) {
  const buttonText =
    testType === "reading"
      ? "Reading"
      : testType === "writing"
        ? "Writing"
        : testType === "speaking"
          ? "Speaking"
          : "Listening";

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
          Go to {buttonText} Tests List
        </Button>
      </DialogActions>
    </Dialog>
  );
}
