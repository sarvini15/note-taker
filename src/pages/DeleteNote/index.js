import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import { useState } from 'react';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {

  const handleConfirm = () => {
    onConfirm(); // Call onDelete function
    onClose(); // Close the dialog
};
  // const handleConfirm = () => {
  //   // 1. Get the note id from the note prop
  //   const noteId = note.id;

  //   // 2. Retrieve notes from local storage
  //   const notes = JSON.parse(localStorage.getItem("notes"));

  //   // 3. Filter out the note with the given id
  //   const newNotes = notes.filter(item => item.id !== noteId);

  //   // 4. Update the data back to local storage
  //   localStorage.setItem("notes", JSON.stringify(newNotes));

  //   // 5. Close the dialog
  //   onClose();

  //   // 6. Call the onDelete function passed from Note component with updated notes
  //   onConfirm(newNotes);

    
  // };


  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this note?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="error">Delete</Button>
      </DialogActions>
      </Dialog>
    </>
  );
}

