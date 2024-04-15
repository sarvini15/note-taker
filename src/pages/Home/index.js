import { useEffect, useState } from "react";
import Note from '../Note';
import AppBars from '../../components/AppBar';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Snackbar } from "@mui/material";

export default function Home() {
    const stringNotes = localStorage.getItem("notes");
    const [notes, setNotes] = useState(JSON.parse(stringNotes) || []);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('cat');
    const [searchKeyword, setSearchKeyword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const filterNotes = (notes, categoryId, keyword) => {
        let filtered = notes;
        if (categoryId) {
            filtered = filtered.filter(note => note.category === categoryId);
        }
        if (keyword) {
            filtered = filtered.filter(note =>
                (note.name && note.name.toLowerCase().includes(keyword.toLowerCase())) ||
                (note.content && note.content.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
        return filtered;
    };

    const handleSearchKeywordChange = (keyword) => {
        setSearchKeyword(keyword);
    };

    let filteredNotes = filterNotes(notes, categoryId, searchKeyword);



    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Close snackbar
    };

    const refresh = (message) => {
        setNotes(JSON.parse(localStorage.getItem("notes")))
        setSnackbarMessage(message);
        setSnackbarOpen(true)
    }

    useEffect(() => {
        filteredNotes = filterNotes(notes, categoryId, searchKeyword);
    }, [notes])

    return (
        <div style={{height:"100vh",backgroundColor: "#EEF5FF"}}>
            <AppBars setKeyword={handleSearchKeywordChange} refresh={refresh} />
            <Container>
                <div style={{ marginTop: '16px', padding: '0 16px' }}>
                    {filteredNotes.map((note, index) => (
                        <Note key={index} note={note} refresh={refresh} />
                    ))}
                </div>
                {filteredNotes.length === 0 && (
                    <Card style={{ textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h6">No Note added yet.</Typography>
                        </CardContent>
                    </Card>
                )}
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000} // Snackbar will auto hide after 6 seconds
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>
    );
}