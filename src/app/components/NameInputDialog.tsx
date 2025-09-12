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
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
  }) => void | Promise<void>;
}

export function NameInputDialog({
  open,
  onClose,
  onSubmit,
}: NameInputDialogProps) {
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    let hasError = false;
    if (!userName.trim()) {
      setNameError("Please enter your name");
      hasError = true;
    }
    const emailValue = email.trim();
    const phoneValue = phone.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }
    const phoneRegex = /^[0-9+()\-\s]{7,}$/;
    if (!phoneValue || !phoneRegex.test(phoneValue)) {
      setPhoneError("Please enter a valid phone number");
      hasError = true;
    }
    if (hasError) return;

    try {
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setSubmitting(true);
      await onSubmit({
        name: userName.trim(),
        email: emailValue,
        phone: phoneValue,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setUserName("");
    setNameError("");
    setEmail("");
    setEmailError("");
    setPhone("");
    setPhoneError("");
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
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!phoneError}
          helperText={phoneError}
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
