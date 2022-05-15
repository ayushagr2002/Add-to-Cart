import React from "react";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Logout = () => {

    return(
        <div>
            <h1 align="center" sx={{mt : 10}}>Thank You for Using the App</h1>
            <h1 align="center"><Link to="/login">Login</Link></h1>
            <h1 align="center"><Link to="/register">Register</Link></h1>
        </div>
        
    )
}

export default Logout;