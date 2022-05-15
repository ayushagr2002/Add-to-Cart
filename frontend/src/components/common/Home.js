import { useState, useEffect } from "react";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = (props) => {

  return (
    <div>
      <Container maxwidth="sm">
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ mt: 10 , border : 10}}><h1 align="center">Welcome to Canteen Portal</h1></Grid>
          <Grid item xs={12} justifyContent="center" sx={{ mt: 10}}> <h1 align="center"><Link to="/Register">Register</Link></h1></Grid>
          <Grid item xs={12} justifyContent="center" sx={{ mt: 10}}><h1 align="center"><Link to="Login">Login</Link></h1></Grid>
        </Grid>
      </Container>
    </div>
  )
  
};

export default Home;
