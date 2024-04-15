import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { nanoid } from "nanoid";
import AppBars from "../../components/AppBar";

export default function AddCategory() {

  // Retrieve categories from local storage or initialize as empty array
  let categories = JSON.parse(localStorage.getItem("category"));
  if (!categories) categories = [];

  // State for new category input
  const [newItem, setNewItem] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const maxChars = 20;

  // Function to handle adding a new category
  const handleAddNewItem = () => {
    // Clone existing categories array
    const newCategories = [...categories];

    // Add new category object to array
    newCategories.push({
      id: nanoid(),
      label: newItem,
    });

    // Save updated categories to local storage
    localStorage.setItem("category", JSON.stringify(newCategories));

    // Reset the text field
    setNewItem("");
  };

  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryToDelete
    );
    categories = updatedCategories; // Update categories directly without state
    localStorage.setItem("category", JSON.stringify(updatedCategories));
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (categoryId) => {
    setEditItemId(categoryId);
    const itemToEdit = categories.find(category => category.id === categoryId);
    setEditedItem(itemToEdit.label);
  };

  const handleEditChange = (event) => {
    setEditedItem(event.target.value);
  };

  const handleSaveEdit = () => {
    const updatedCategories = categories.map(category => {
      if (category.id === editItemId) {
        return {
          ...category,
          label: editedItem
        };
      }
      return category;
    });
    categories = updatedCategories; // Update categories directly without state
    localStorage.setItem("category", JSON.stringify(updatedCategories));
    setEditItemId(null);
  };

  return (
    <div style={{height:"100vh",backgroundColor: "#EEF5FF"}}>
      <AppBars />
      <Container maxWidth="md">
        <Card variant="outlined" sx={{ marginTop: '50px', borderRadius:3, padding:'10px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Categories
            </Typography>
            <List>
            {categories.map((category) => (
                <ListItem key={category.id} sx={{
                  borderBottom: '1px solid #ccc', // Adding bottom border
                  '&:last-child': {
                    borderBottom: 'none' // Removing bottom border for the last item
                  }
                }}>
                  {editItemId === category.id ? (
                    <TextField
                    fullWidth
                    autoFocus
                      value={editedItem}
                    onChange={handleEditChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSaveEdit();
                      }
                    }}
                    onBlur={handleSaveEdit}
                    inputProps={{ maxLength : 20 }}
                    InputProps={{
                      endAdornment: (
                        <Typography variant="text" color="gray" style={{ whiteSpace: 'nowrap' }}>
                          {editedItem.length}/20
                        </Typography>
                      )
                    }}
                    error={editedItem.length === maxChars}
                    helperText={editedItem.length === maxChars ? "Reached character limit" : ""}
                    />
                  ) : (
                    <ListItemText primary={category.label} />
                  )}
                  <IconButton 
                    edge="start" 
                    aria-label="edit" 
                    style={{ backgroundColor: '#C68E17' , borderRadius: '10px',marginLeft:'5px', marginRight: '4px', color: 'white' }}
                    onClick={() => handleEditClick(category.id)}
                >
                  <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" style={{ backgroundColor: '#9F000F' , borderRadius: '10px', color: 'white'}} onClick={() => handleDeleteClick(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            {categories.length === 0 && (
              <Typography variant="h6">No categories added yet.</Typography>
            )}
            <Box mt={3}>
              <TextField
                label="Add new category"
                fullWidth
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                inputProps={{ maxLength : 20 }}
                    InputProps={{
                      endAdornment: isFocused && (
                        <Typography variant="body2" color="gray" style={{ whiteSpace: 'nowrap' }}>
                          {newItem.length}/20
                        </Typography>
                      )
                    }}
                error={newItem.length === maxChars}
                helperText={newItem.length === maxChars ? "Reached character limit" : ""}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                    />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                onClick={handleAddNewItem}
                sx={{ mt: 2 }}
                style={{ backgroundColor: newItem.length > 0 && newItem.length <= 20 ? '#6698FF' : '#CCCCCC', // Blue if length > 0, Gray otherwise
                color: '#FFFFFF' }}
                disabled={newItem.length === 0 || newItem.length > 20}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}