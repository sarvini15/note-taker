import { nanoid } from "nanoid";
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


export default function AddNoteDialog({ open, onClose, refresh}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];

    const maxChars = 90;

    const maxChar = 20;

    const handleSubmit = (event) => {
        event.preventDefault();
        let stringNotes = localStorage.getItem("notes");
        let notes = JSON.parse(stringNotes)

        

        if (!notes) notes = []


        const noteTitle = title.trim() === "" ? "Untitled" : title;

        notes.push({
            id: nanoid(),
            name: noteTitle,
            content: content,
            category: category,
        })

        let convertedNotes = JSON.stringify(notes)
        localStorage.setItem("notes", convertedNotes)

        onClose()
        refresh("Add note Successfully")

        setTitle("");
        setContent("");
        setCategory("");

        

    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: '8px' }}>Add New Note</DialogTitle>
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
                    inputProps={{ maxLength : 20 }}
                    InputProps={{
                            endAdornment: isFocus && (
                              <Typography variant="text" color="gray" style={{ whiteSpace: 'nowrap' }}>
                                {title.length}/20
                              </Typography>
                            )
                          }}
                    error={title.length === maxChar}
                    helperText={title.length === maxChar ? "Reached character limit" : ""}
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
                    inputProps={{ maxLength : 90 }}
                    InputProps={{
                            endAdornment: isFocused && (
                              <Typography variant="text" color="gray" style={{ whiteSpace: 'nowrap' }}>
                                {content.length}/90
                              </Typography>
                            )
                          }}
                    error={content.length === maxChars}
                    helperText={content.length === maxChars ? "Reached character limit" : ""}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.length === 0 && ( // Check if categories array is empty
                    <MenuItem disabled>No categories available</MenuItem>
                    )}
                        {categories.map((category) => (
                      <MenuItem value={category.id}>{category.label}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions style={{marginBottom:"10px", marginRight:"15px"}}>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" disabled={content.length === 0 || content.length > 100}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}