import { AppBar, Toolbar, Typography, TextField, IconButton, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddNoteDialog from '../../pages/AddNote';
import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { Link, useNavigate} from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function AppBars({ setKeyword }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [keyword, setKeywords] = useState("")
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];
    

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
              <ListItem value="add" button component={Link} to={'/add'}>Add New Category</ListItem>
            </List>
            <Divider />
            <List>
                <ListItem value="all" button component={Link} to={'/'}>All</ListItem>
                {categories.map((category) => (
                      <ListItem key={category.id} button onClick={() => handleCategoryClick(category.id)}>
                          <ListItemText primary={category.label} />
                      </ListItem>
                ))}
            </List>
        </Box>
    )


    const handleCategoryClick = (categoryId) => {
        // Redirect to the route with the category ID
        navigate(`/?cat=${categoryId}`);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        
    };

    const handleAddNote = () => {
        // Handle adding the note here
        handleCloseDialog();
    };

    const handleInputChange = (event) => {
        const query = event.target.value;
        setKeywords(query); // Update local state
        setKeyword(query); // Call the parent's function to update the search keyword
    };


    return (
        <>
        <AppBar position="static" style={{ backgroundColor: '#6698FF' }}>
                <Toolbar>
                <DensityMediumIcon onClick={toggleDrawer(true)}></DensityMediumIcon>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Box sx={{ marginLeft: 2 }}>
                        <TextField
                            placeholder='Search your note...'
                            variant="outlined"
                            size="small"
                            value={keyword}
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: '#FFFFFF',
                            }}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                }
                            }}
                            
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <IconButton color="inherit" onClick={handleOpenDialog}>
                        <AddIcon />
                    </IconButton>
                    <Typography variant="body1" color="inherit" onClick={handleOpenDialog} style={{ cursor: 'pointer' }}>
                        Add new note
                    </Typography>
                </Box>
            </Toolbar>
            </AppBar>
            <AddNoteDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleAddNote} />
        </>
    )
}