import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Alert, AlertTitle, Table, TableBody, TableRow, TableCell, TableHead, Rating, Dialog, DialogContent, Tabs, Tab } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Plot from 'react-plotly.js';

const VendorProfile = () => {

    let emailAdd = localStorage.getItem("Vendor");
    let password = localStorage.getItem("VPassword");
    const [vpassword, setvpassword] = useState(password);
    const [vname, setvname] = useState("");
    const [vemailAdd, setvemailAdd] = useState(emailAdd);
    const [vcontactNo, setvcontactNo] = useState("");
    const [shopName, setshopName] = useState("");
    const [openingTime, setopeningTime] = useState("");
    const [closingTime, setclosingTime] = useState("");
    const [openprofiledialog, setopenprofiledialog] = useState(false);


    useEffect(() => {
        const req = { vemailAdd: vemailAdd, password : vpassword}
        axios
            .post("http://localhost:4000/user/login/Vendor", req)
            .then((response) => {
                setvname(response.data.vname);
                setvcontactNo(response.data.vcontactNo);
                setvemailAdd(response.data.vemailAdd);
                setshopName(response.data.shopName);
                setopeningTime(response.data.openingTime);
                setclosingTime(response.data.closingTime);
                localStorage.setItem("Vendor", response.data.vemailAdd);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const ProfDetails = () => {
        return (
            <div>
                <h1>Profile Details</h1>
                <Box border={1} borderColor="black">
                    <Grid container justifyContent="center" alignItems="center" fontSize={24}>

                        <Grid item xs={12} m={1}>
                            Name: {vname}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Shop Name: {shopName}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Contact Number: {vcontactNo}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Email-ID: {vemailAdd}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Opening Time: {openingTime}
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Closing Time: {closingTime}
                        </Grid>
                    </Grid>

                </Box>

            </div>
        )
    }

    const ChangeDetails = () => {
        return (
            <div>
                <h1 align="center">Change Profile Details</h1>
                <Box border={1} borderColor="black">
                    <Grid container direction="coloumn" justifyContent="center" alignItems="center" fontSize={24}>

                        <Grid item xs={12} m={1}>
                            Name: <TextField variant="outlined" value={vname} onChange={(event) => {setvname(event.target.value)}}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Shop Name:  <TextField variant="outlined" value={shopName} onChange={(event) => {setshopName(event.target.value)}}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Contact Number:  <TextField variant="outlined" value={vcontactNo} onChange={(event) => {setvcontactNo(event.target.value)}}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Email-ID: <TextField variant="outlined" value={vemailAdd} onChange={(event) => {setvemailAdd(event.target.value)}}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Opening Time:  <TextField variant="outlined" value={openingTime} onChange={(event) => {setopeningTime(event.target.value)}}></TextField>
                        </Grid>

                        <Grid item xs={12} m={1}>
                            Closing Time: <TextField variant="outlined" value={closingTime} onChange={(event) => {setclosingTime(event.target.value)}}></TextField>
                        </Grid>

                    </Grid>
                </Box>
                <Box justifyContent="center" m={1} alignItems="center" >
                    <Button variant="contained" m={1} onClick={handleSubmit}>Submit</Button>
                </Box>
                <Box justifyContent="right" m={1} alignItems="right" >
                    <Button variant="contained" m={1} onClick={handleProfileDialogClose}>Cancel</Button>
                </Box>
            </div>
        )
    }

    const handleEdit = () => {
        setopenprofiledialog(true);
    }

    const handleProfileDialogClose = () => {
        setopenprofiledialog(false);
    }

    const handleSubmit = () => {
        const newVendor = {
            vname: vname,
            shopName: shopName,
            vemailAdd: vemailAdd,
            vcontactNo: vcontactNo,
            openingTime: openingTime,
            closingTime: closingTime,
        };
        axios
            .post("http://localhost:4000/user/update/Vendor", newVendor)
            .then((response) => {
                alert("Updated Successfully");
            })
            .catch(err => {
                alert("Could Not Update Profile");
                console.log(err);
            })
        handleProfileDialogClose();
    }

    return (
        <div>
            <Container component="main" maxWidth="lg">
                {ProfDetails()}
                <Button variant="contained" onClick={handleEdit} sx={{ mt: 2 }}>Edit</Button>
            </Container>
            <Dialog open={openprofiledialog} onClose={handleProfileDialogClose}>
                <DialogContent>
                    {ChangeDetails()}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default VendorProfile;