import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "../DeleteNote";

export default function EditNoteDialog({ open, onClose, id, refresh }) {
  let notes = JSON.parse(localStorage.getItem("notes"));

  const selectedNote = notes.find((p) => p.id === id);
  const maxChars = 90;

  const maxChar = 20;

  const [title, setTitle] = useState(selectedNote ? selectedNote.name : "");
  const [content, setContent] = useState(
    selectedNote ? selectedNote.content : ""
  );
  const [category, setCategory] = useState(
    selectedNote ? selectedNote.category : ""
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  let categories = JSON.parse(localStorage.getItem("category"));
  if (!categories) categories = [];

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = (e) => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    onClose();
    setOpenDialog(false);
    notes = updatedNotes;
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSnackbarOpen(true);
    refresh("Deleted Note Successfully");
  };

  const updateNote = () => {
    const updatedNote = {
      id: selectedNote.id,
      name: title,
      content: content,
      category: category,
    };

    const updatedNotes = notes.map((note) =>
      note.id === id ? updatedNote : note
    );

    // Update local storage with the modified notes array
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    onClose(); // Close the dialog
    refresh("Updated Note Successfully");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid black",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle style={{ fontWeight: "bold" }}>Edit Note</DialogTitle>
          <IconButton
            aria-label="delete"
            style={{
              marginBottom: "3px",
              marginRight: "15px",
              color: "#D04848",
            }}
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: isFocus && (
                <Typography
                  variant="text"
                  color="gray"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {title.length}/20
                </Typography>
              ),
            }}
            error={title.length === maxChar}
            helperText={
              title.length === maxChar ? "Reached character limit" : ""
            }
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            inputProps={{ maxLength: 90 }}
            InputProps={{
              endAdornment: isFocused && (
                <Typography
                  variant="text"
                  color="gray"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {content.length}/90
                </Typography>
              ),
            }}
            error={content.length === maxChars}
            helperText={
              content.length === maxChars ? "Reached character limit" : ""
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.length === 0 && ( // Check if categories array is empty
                <MenuItem disabled>No categories available</MenuItem>
              )}
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ marginBottom: "10px", marginRight: "15px" }}>
          <Button onClick={onClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={updateNote} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Snackbar will auto hide after 6 seconds
        onClose={handleSnackbarClose}
        message="Note deleted successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
