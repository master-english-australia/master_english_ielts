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
  onSubmit: (name: string) => void | Promise<void>;
}

export function NameInputDialog({
  open,
  onClose,
  onSubmit,
}: NameInputDialogProps) {
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    if (!userName.trim()) {
      setNameError("Please enter your name");
      return;
    }

    try {
      setNameError("");
      setSubmitting(true);
      await onSubmit(userName.trim());
    } finally {
      setSubmitting(false);
    }
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
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
          component="div"
        >
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
        <Button onClick={handleClose} color="secondary" disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          disabled={submitting}
        >
          Submit Essay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
