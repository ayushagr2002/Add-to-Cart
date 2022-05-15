import { useState } from "react";

import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    let navigate = useNavigate();
    const [userType, setuserType] = useState("");
    const [emailAdd, setemailAdd] = useState("");
    const [pw, setpw] = useState("");
    const [loginsuccess, setloginsuccess] = useState("");

    const handleChange = (event) => {
        setuserType(event.target.value);
    }

    const onChangeemailAdd = (event) => {
        setemailAdd(event.target.value);
    }

    const onLogin = () => {
        if (userType == "Vendor") {
            const emailobj = {
                vemailAdd: emailAdd,
                password : pw,
            }
            axios
                .post("http://localhost:4000/user/login/Vendor", emailobj)
                .then((response) => {
                    if (response.data.error == undefined) {
                        alert("Vendor\t" + response.data.vname + "\t Logged Successfully");
                        setloginsuccess("Vendor");
                        localStorage.setItem("Vendor",response.data.vemailAdd);
                        localStorage.setItem("VPassword", response.data.password);
                        navigate("/VendorDashboard");
                    }
                    else {
                        alert("Vendor is Not Registered");
                    }
                }); 
        }
        else {
            const emailobj = {
                bemailAdd: emailAdd,
                password: pw,
            }
            axios
                .post("http://localhost:4000/user/login/Buyer", emailobj)
                .then((response) => {
                    if (response.data.error == undefined) {
                        alert("Buyer\t" + response.data.bname + "\t Logged Successfully");
                        setloginsuccess("Buyer");
                        localStorage.setItem("Buyer", response.data.bemailAdd);
                        localStorage.setItem("BPassword", response.data.password);
                        navigate("/BuyerDashboard");
                    }
                    else {
                        alert("Buyer is Not Registered");
                    }
                });
        }
    }

    return (
        <Container maxWidth="sm">
            <Grid container direction="row" justifyContent="center" alignItems="left">
                <h1>LOGIN HERE</h1>
            </Grid>
            <FormControl fullWidth>
                <FormLabel component="legend">Login As:</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="userType"
                    value={userType}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                    <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                </RadioGroup>
                <Grid container direction="row" justifyContent="left">
                    <Grid item xs={3} justifyContent="center"><h3>Email: </h3></Grid>
                    <Grid item xs={9}> <TextField variant="outlined" label="Email" fullWidth value={emailAdd} onChange={onChangeemailAdd}></TextField></Grid>
                    <Grid item xs={3} justifyContent="center"><h3>Password: </h3></Grid>
                    <Grid item xs={9}> <TextField variant="outlined" label="Password" type="password" fullWidth value={pw} onChange={(event) => {setpw(event.target.value)}}></TextField></Grid>
                </Grid>

            </FormControl>
            <Box textAlign="center">
                <Button variant='contained' sx={{ mt: 2, textAlign: "center" }} onClick={onLogin}>Login</Button>
            </Box>
        </Container>
    )
}

export default Login