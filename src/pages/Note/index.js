import { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from '../DeleteNote';
import { useParams } from "react-router-dom";
import EditNoteDialog from '../EditNote';
import EditIcon from "@mui/icons-material/Edit";

export default function Note({ note }) {
  // const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // const [deleteClicked, setDeleteClicked] = useState(false);

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setDeleteClicked(false);
  // };
  

  // const handleDeleteClick = (e) => {
  //   e.stopPropagation();
  //   setOpenDialog(true);
  //   setDeleteClicked(true);
  // };

  // const handleConfirmDelete = () => {
  //   onDelete(note.id);
  //   setOpenDialog(false);
  // };

  const handleOpenEditDialog = () => {
      setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditNote = (editedNote) => {
    // Handle edited note
    console.log("Edited note:", editedNote);
  };

  const getCategoryLabel = (Id) => {
    // Retrieve the category label based on the category ID
    // Here you should implement your logic to fetch the label from your data source
    // For example, you could fetch it from local storage
    let categories = JSON.parse(localStorage.getItem("category"));
    if (categories) {
      const category = categories.find(cat => cat.id === Id);
      return category ? category.label : 'None'; // Return the category label or an empty string if not found
    }
    return 'None';
  };

  return (
    <Box component="span" sx={{ display: 'inline-block', margin: '10px'}}>
      <Card sx={{ width: 350, height: '200px', borderRadius: 3, backgroundColor: 'white', boxShadow: '3' }} onClick={handleOpenEditDialog}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Box sx={{ backgroundColor: '#6698FF', borderRadius: 5, display: 'inline-block', padding: '2px 8px', marginRight: '8px' }}>
                <Typography variant="subtitle2" color="white">
                  {note.category === "None" ? "None" : getCategoryLabel(note.category)}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <IconButton onClick={handleOpenEditDialog}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            {note.name}
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
            {note.content}
          </Typography>
        </CardContent>
      </Card>
      <EditNoteDialog open={openEditDialog} onClose={handleCloseEditDialog} id={note.id} onSave={handleEditNote} />
    </Box>
  );
}
