import { useState } from "react";
import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Alert, AlertTitle } from '@mui/material';
import { Link } from "react-router-dom";

const Register = () => {
  const [content, setContent] = useState("");
  const [userType, setuserType] = useState("");
  const [error, seterror] = useState("");

  const [vname, setvname] = useState("");
  const [shopName, setshopName] = useState("");
  const [vemailAdd, setvemailAdd] = useState("");
  const [vcontactNo, setvcontactNo] = useState("");
  const [openingTime, setopeningTime] = useState("");
  const [closingTime, setclosingTime] = useState("");
  const [vpassw, setvpassw] = useState("");

  const [bname, setbname] = useState("");
  const [bemailAdd, setbemailAdd] = useState("");
  const [bcontactNo, setbcontactNo] = useState("");
  const [age, setage] = useState("");
  const [batch, setbatch] = useState("");
  const [bpassw, setbpassw] = useState("");

  const [login, setlogin] = useState(false);

  const onChangevname = (event) => {
    setvname(event.target.value);
  }

  const onChangeshopName = (event) => {
    setshopName(event.target.value);
  }

  const onChangvemailAdd = (event) => {
    setvemailAdd(event.target.value);
  }

  const onChangevcontactNo = (event) => {
    setvcontactNo(event.target.value);
  }

  const onChangeopeningTime = (event) => {
    setopeningTime(event.target.value);
  }

  const onChangeclosingTime = (event) => {
    setclosingTime(event.target.value);
  }

  const onChangebname = (event) => {
    setbname(event.target.value);
  }

  const onChangbemailAdd = (event) => {
    setbemailAdd(event.target.value);
  }

  const onChangebcontactNo = (event) => {
    setbcontactNo(event.target.value);
  }

  const onChangeage = (event) => {
    setage(event.target.value);
  }

  const onChangebatch = (event) => {
    setbatch(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (userType == "Vendor") {
      const newVendor = {
        vname: vname,
        shopName: shopName,
        vemailAdd: vemailAdd,
        vcontactNo: vcontactNo,
        openingTime: openingTime,
        closingTime: closingTime,
        password: vpassw,
      };

      axios
        .post("http://localhost:4000/user/register/vendor", newVendor)
        .then((response) => {
          seterror("Vendor " + response.data.vname + " Registered Successfully");
          setlogin(true);
          console.log(response.data);
        })
        .catch(err => {
          alert("Could Not Register");
          console.log(err);
        })

    }
    else {
      const newBuyer = {
        bname: bname,
        bemailAdd: bemailAdd,
        bcontactNo: bcontactNo,
        age: age,
        batch: batch,
        password: bpassw,
      };
      console.log(newBuyer);
      axios
        .post("http://localhost:4000/user/register/buyer", newBuyer)
        .then((response) => {
          seterror("Buyer " + response.data.bname + " Registered Successfully");
          setlogin(true);
          console.log(response.data);
        })
        .catch(err => {
          alert("Could Not register");
          console.log(err);
        })
    }
  }

  function VendorDetails() {
    return (
      <div>
        <Grid container direction="row" justifyContent="center" alignItems="left">
          <h1>Vendor Registration</h1>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Name: </h3></Grid>
          <Grid item xs={9} justifyContent="center"> <TextField variant="outlined" label="Manager Name" sx={{ mt: 2 }} fullWidth value={vname} onChange={onChangevname}></TextField> </Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Shop Name: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Shop Name" sx={{ mt: 2 }} fullWidth value={shopName} onChange={onChangeshopName}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Email Address: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Email Address" sx={{ mt: 2 }} fullWidth value={vemailAdd} onChange={onChangvemailAdd}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Password: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" type="password" label="Password" sx={{ mt: 2 }} fullWidth value={vpassw} onChange={(event) => {setvpassw(event.target.value)}}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Contact Number: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Contact Number" sx={{ mt: 2 }} fullWidth value={vcontactNo} onChange={onChangevcontactNo}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Canteen Opening Time: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Canteen Opening Time" sx={{ mt: 2 }} fullWidth value={openingTime} onChange={onChangeopeningTime}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Canteen Closing Time </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Canteen Closing Time" sx={{ mt: 2 }} fullWidth value={closingTime} onChange={onChangeclosingTime}></TextField></Grid>
        </Grid>
      </div>

    )
  }

  function BuyerDetails() {
    return (
      <Container maxWidth="sm">
        <Grid container direction="row" justifyContent="center" alignItems="left">
          <h1>Buyer Registration</h1>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={3} justifyContent="center"><h3>Name: </h3></Grid>
          <Grid item xs={9} justifyContent="center"> <TextField variant="outlined" label="Student Name" fullWidth value={bname} onChange={onChangebname}></TextField> </Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Email-ID: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Email-ID" sx={{ mt: 2 }} fullWidth value={bemailAdd} onChange={onChangbemailAdd}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Password: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Password" type="password" sx={{ mt: 2 }} fullWidth value={bpassw} onChange={(event) => {setbpassw(event.target.value)}}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Contact Number: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Contact Number" sx={{ mt: 2 }} fullWidth value={bcontactNo} onChange={onChangebcontactNo}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Age: </h3></Grid>
          <Grid item xs={9} justifyContent="center"><TextField variant="outlined" label="Age" sx={{ mt: 2 }} fullWidth value={age} onChange={onChangeage}></TextField></Grid>
          <Grid item xs={3} justifyContent="center" sx={{ mt: 2 }}><h3>Batch Name:</h3></Grid>
          <Grid item xs={9} justifyContent="center">
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
      </Container>
    )
  }

  const clickHandler = (event) => {
    if (event.target.value == "Vendor") {
      setContent(VendorDetails);
      setuserType("Vendor");
    }
    else {
      setContent(BuyerDetails);
      setuserType("Buyer");
    }
  }

  return (
    <Container maxWidth="sm">
      <Grid container direction="row" justifyContent="center" alignItems="left">
        <h1>REGISTER HERE</h1>
      </Grid>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          label="User-Type"
          value={userType}
          onChange={clickHandler}
        >
          <MenuItem value="Vendor">Vendor</MenuItem>
          <MenuItem value="Buyer">Buyer</MenuItem>
        </Select>
        <div>
          {userType == "Vendor" ? VendorDetails() : null}
          {userType == "Buyer" ? BuyerDetails() : null}
        </div>
        <Box textAlign="center">
          <Button variant='contained' sx={{ mt: 2, textAlign: "center" }} onClick={onSubmit}>Register</Button>
        </Box>
      </FormControl>
      <Grid container>
        <Grid item xs={12} mt={5}>
          <p>{error}</p>
        </Grid>
        <Grid item xs={12} mt={5}>
          { login ? <Link to="/login">Login Here</Link> : null}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
