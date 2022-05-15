import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Alert, AlertTitle, Table, TableBody, TableRow, TableCell, TableHead, Rating, Dialog, DialogContent, Checkbox, FormControlLabel, Slider, RadioGroup, Radio, IconButton, InputAdornment, Tabs, Tab } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from "@mui/icons-material/Search";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

const BuyerProfile = () => {

    let emailAdd = localStorage.getItem("Buyer");
    let password = localStorage.getItem("BPassword");
    const [bpassword, setbpassword] = useState(password);

    const [bname, setbname] = useState("");
    const [bemailAdd, setbemailAdd] = useState(emailAdd);
    const [bcontactNo, setbcontactNo] = useState("");
    const [age, setage] = useState("");
    const [batch, setbatch] = useState("");
    const [openprofiledialog, setopenprofiledialog] = useState(false);

    // Get Profile Details from DB on page load
    useEffect(() => {

        axios
            .post("http://localhost:4000/user/login/Buyer", { bemailAdd: bemailAdd, password : bpassword })
            .then((response) => {
                setbname(response.data.bname);
                setbemailAdd(response.data.bemailAdd);
                setbcontactNo(response.data.bcontactNo);
                setbatch(response.data.batch);
                setage(response.data.age);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const handleBuyerUpdate = () => {
        const newBuyer = {
            bname: bname,
            bemailAdd: bemailAdd,
            bcontactNo: bcontactNo,
            age: age,
            batch: batch,
            oldbemailAdd: bemailAdd
        }

        axios
            .post("http://localhost:4000/user/update/Buyer", newBuyer)
            .then((response) => {
                alert("Successfully Updated");
            })
            .catch(err => {
                alert("Could Not Update Buyer");
            })
        setopenprofiledialog(false);
    }
    // Profile Details Form
    const ProfDetails = () => {
        return (
            <div>
                <h1>Profile Details</h1>
                <Box border={1} borderColor="black">
                    <Grid container justifyContent="center" alignItems="center" fontSize={24}>

                        <Grid item xs={12} m={1}>
                            Name: {bname}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Contact Number: {bcontactNo}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Email-ID: {bemailAdd}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Age: {age}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Batch: {batch}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }

    // Change Details Form
    const ChangeDetails = () => {
        return (
            <div>
                <h1 align="center">Change Profile Details</h1>
                <Box border={1} borderColor="black">
                    <Grid container justifyContent="center" alignItems="center" fontSize={24}>

                        <Grid item xs={12} m={1}>
                            Name: <TextField variant="outlined" value={bname} onChange={(event) => { setbname(event.target.value) }}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Contact Number:  <TextField variant="outlined" value={bcontactNo} onChange={(event) => { setbcontactNo(event.target.value) }}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Email-ID: <TextField variant="outlined" value={bemailAdd} onChange={(event) => { setbemailAdd(event.target.value) }}></TextField>
                        </Grid>


                        <Grid item xs={12} m={1}>
                            Age: <TextField variant="outlined" value={age} onChange={(event) => { setage(event.target.value) }}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Batch Name:
                            <FormControl sx={{ width: "40%", mt: 1 }}>
                                <InputLabel>Batch Name</InputLabel>
                                <Select value={batch} label="Batch" onChange={(event) => { setbatch(event.target.value) }}>
                                    <MenuItem value="UG1">UG1</MenuItem>
                                    <MenuItem value="UG2">UG2</MenuItem>
                                    <MenuItem value="UG3">UG3</MenuItem>
                                    <MenuItem value="UG4">UG4</MenuItem>
                                    <MenuItem value="UG5">UG5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Box>
                <Box justifyContent="center" m={1} alignItems="center" >
                    <Button variant="contained" m={1} onClick={handleBuyerUpdate}>Submit</Button>
                </Box>
                <Box justifyContent="right" m={1} alignItems="right" >
                    <Button variant="contained" m={1} onClick={() => { setopenprofiledialog(false) }}>Cancel</Button>
                </Box>
            </div>
        )
    }

    const handleEdit = () => {
        setopenprofiledialog(true);
    }

    return (
        <div>
            <Container component="main">
                {ProfDetails()}
                <Dialog open={openprofiledialog} onClose={() => { setopenprofiledialog(false) }}>
                    <DialogContent>
                        {ChangeDetails()}
                    </DialogContent>
                </Dialog>
                <Button variant="contained" onClick={handleEdit} sx={{ mt: 2 }}>Edit</Button>
            </Container>
        </div>
    )
}

export default BuyerProfile;