"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface NameInputDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function NameInputDialog({
  open,
  onClose,
  onSubmit,
}: NameInputDialogProps) {
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!userName.trim()) {
      setIsSubmitting(false);
      setNameError("Please enter your name");
      return;
    }

    setNameError("");
    onSubmit(userName.trim());
    setIsSubmitting(true);
  };

  const handleClose = () => {
    setUserName("");
    setNameError("");
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Submit Your Essay
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please enter your name to submit your essay for review.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          type="text"
          fullWidth
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="contained"
          color="success"
        >
          Submit Essay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
