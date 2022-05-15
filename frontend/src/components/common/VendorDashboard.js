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


const VendorDashboard = () => {

    let emailAdd = localStorage.getItem("Vendor");
    let password = localStorage.getItem("VPassword");
    const [vpassword, setvpassword] = useState(password);
    const [rows, setrows] = useState([]);

    const [vemailAdd, setvemailAdd] = useState(emailAdd);
    const [openfooddialog, setopenfooddialog] = useState(false);
    const [editfooddialog, seteditfooddialog] = useState(false);

    const [fname, setfname] = useState("");
    const [price, setprice] = useState("");
    const [curtag, setcurtag] = useState("");
    const [curaddonname, setcuraddonname] = useState("");
    const [curaddonprice, setcuraddonprice] = useState("");

    const [curfooditem, setcurfooditem] = useState("");

    const [editfname, seteditfname] = useState("");
    const [editprice, seteditprice] = useState("");
    const [editvegetarianism, seteditvegetarianism] = useState("");
    const [edittags, setedittags] = useState([]);
    const [editaddons, seteditaddons] = useState([]);

    const [tags, settags] = useState([]);
    const [addons, setaddons] = useState([]);
    const [vegnonveg, setvegnonveg] = useState('');

    useEffect(() => {
        const req = { vemailAdd: vemailAdd, password : vpassword}
        axios
            .post("http://localhost:4000/user/login/Vendor", req)
            .then((response) => {
                setvemailAdd(response.data.vemailAdd);
                localStorage.setItem("Vendor", response.data.vemailAdd);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    // get food items of the vendor from database whenever page is refreshed
    useEffect(() => {
        const req = { vemailAdd: vemailAdd, }
        axios
            .post("http://localhost:4000/user/getFoodItem", req)
            .then((response) => {
                setrows(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const onChangecurtag = (event) => {
        setcurtag(event.target.value);
    }

    const onChangecuraddonname = (event) => {
        setcuraddonname(event.target.value);
    }

    const onChangecuraddonprice = (event) => {
        setcuraddonprice(event.target.value);
    }

    const onChangefname = (event) => {
        setfname(event.target.value);
    }

    const onChangeprice = (event) => {
        setprice(event.target.value);
    }


    // functions to add new food item

    const AddTag = () => {
        settags(tags.concat(curtag));
        setcurtag("");
    }

    const Addaddon = () => {
        let addonelem = { "addonname": curaddonname, "addonprice": curaddonprice };
        setaddons(addons.concat(addonelem));
        setcuraddonname("");
        setcuraddonprice("");
    }

    const addfooditem = () => {
        const newfooditem = {
            vemailAdd: vemailAdd,
            fname: fname,
            price: price,
            vegetarianism: vegnonveg,
            tags: tags,
            addons: addons,
        }

        axios
            .post("http://localhost:4000/user/addFoodItem", newfooditem)
            .then((response) => {
                handleClose();
                alert(response.data.fname + " Added Successfully");
                let temprows = rows;
                setrows(temprows.concat(response.data));
            })
            .catch((err) => {
                alert("Could Not Add Food Item");
            })

    }



    const foodform = () => {
        return (
            <div>

                <Grid container justifyContent="center">
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Name: </h3></Grid>
                    <Grid item xs="9" justifyContent="center"> <TextField variant="outlined" label="Item Name" sx={{ mt: 1 }} fullWidth value={fname} onChange={onChangefname}></TextField> </Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Price: </h3></Grid>
                    <Grid item xs="9" justifyContent="center"> <TextField variant="outlined" label="Item Price" sx={{ mt: 1 }} fullWidth value={price} onChange={onChangeprice}></TextField> </Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Veg/Non-Veg: </h3></Grid>
                    <Grid item xs="9" justifyContent="center">
                        <FormControl sx={{ width: "40%", mt: 1 }}>
                            <InputLabel>Veg/Non-Veg</InputLabel>
                            <Select value={vegnonveg} label="Veg/Non-Veg" onChange={(event) => { setvegnonveg(event.target.value) }}>
                                <MenuItem value="Veg">Veg</MenuItem>
                                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Tags: </h3></Grid>
                    <Grid item xs="9" justifyContent="center"> <TextField variant="outlined" label="Tags" sx={{ mt: 1 }} fullWidth value={curtag} onChange={onChangecurtag}></TextField></Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}><Button variant="contained" sx={{ mt: 1 }} onClick={AddTag}>Add Tag</Button></Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Current Tags: </h3></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}>{tags.map((tagelems) => (<div> <li>  {tagelems}  </li></div>))}</Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Add-Ons: </h3></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}> <TextField variant="outlined" label="Addon-Name" sx={{ mt: 1 }} fullWidth value={curaddonname} onChange={onChangecuraddonname}></TextField></Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}><TextField variant="outlined" label="Addon-Price" sx={{ mt: 1 }} fullWidth value={curaddonprice} onChange={onChangecuraddonprice}></TextField></Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}><Button variant="contained" sx={{ mt: 1 }} onClick={Addaddon}>Add Add-On</Button></Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Current Add-Ons:</h3></Grid>
                    <Grid item xs="9" justifyContent="center" sx={{ mt: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            {addons.map((elems) => (
                                <TableRow>
                                    <TableCell>{elems.addonname}</TableCell>
                                    <TableCell>{elems.addonprice}</TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </Grid>
                    <Grid item xs="3" sx={{ mt: 3 }}><Button variant="contained" onClick={addfooditem}>Submit</Button></Grid>
                </Grid>
            </div>
        )
    }

    // functions to edit existing food items

    const editfoodform = () => {
        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Name: </h3></Grid>
                    <Grid item xs="9" justifyContent="center"> <TextField variant="outlined" label="Item Name" sx={{ mt: 1 }} fullWidth value={editfname} onChange={(event) => { seteditfname(event.target.value) }}></TextField> </Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Price: </h3></Grid>
                    <Grid item xs="9" justifyContent="center"> <TextField variant="outlined" label="Item Price" sx={{ mt: 1 }} fullWidth value={editprice} onChange={(event) => { seteditprice(event.target.value) }}></TextField> </Grid>
                    <Grid item xs="3" justifyContent="center" sx={{ mt: 1 }}><h3>Veg/Non-Veg: </h3></Grid>
                    <Grid item xs="9" justifyContent="center">
                        <FormControl sx={{ width: "40%", mt: 1 }}>
                            <InputLabel>Veg/Non-Veg</InputLabel>
                            <Select value={editvegetarianism} label="Veg/Non-Veg" onChange={(event) => { seteditvegetarianism(event.target.value) }}>
                                <MenuItem value="Veg">Veg</MenuItem>
                                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} justifyContent="center" sx={{ mt: 1 }}><h3>Tags:</h3></Grid>
                    <Grid item xs={9} justifyContent="center" sx={{ mt: 1 }}>
                        {edittags.map((tag, i) => (
                            <div>
                                <TextField variant="outlined" sx={{ mt: 1 }} value={tag || ''} onChange={(event) => { handleedittags(i, event) }}></TextField>
                            </div>
                        ))}
                        <br />
                    </Grid>
                    <Grid item xs={3} justifyContent="center" sx={{ mt: 1 }}><h3>Add-Ons:</h3></Grid>
                    <Grid item xs={9} justifyContent="center" sx={{ mt: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Add-On Name</TableCell>
                                    <TableCell>Add-On Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {editaddons.map((addon, i) => (
                                    <TableRow>
                                        <TableCell> <TextField variant="outlined" sx={{ mt: 1 }} value={addon.addonname || ''} onChange={(event) => { handleeditaddonname(i, event) }}></TextField> </TableCell>
                                        <TableCell> <TextField variant="outlined" sx={{ mt: 1 }} value={addon.addonprice || ''} onChange={(event) => { handleeditaddonprice(i, event) }}></TextField> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Button variant="contained" sx={{ mt: 1 }} onClick={handleeditfoodsubmit}>Submit</Button>
                </Grid>
            </div>
        )
    }

    const handleedittags = (i, event) => {
        let temp = [...edittags];
        temp[i] = event.target.value;
        setedittags([...temp]);
    }

    const handleeditaddonname = (i, event) => {
        let temp = [...editaddons];
        temp[i].addonname = event.target.value;
        seteditaddons([...temp]);
    }

    const handleeditaddonprice = (i, event) => {
        let temp = [...editaddons];
        temp[i].addonprice = event.target.value;
        seteditaddons([...temp]);
    }

    const handleeditfoodsubmit = () => {
        const updatedFoodItem = {
            vemailAdd: vemailAdd,
            fname: editfname,
            price: editprice,
            vegetarianism: editvegetarianism,
            tags: edittags,
            addons: editaddons,
        }

        axios
            .post("http://localhost:4000/user/editFoodItem", updatedFoodItem)
            .then((response) => {
                alert("Updated Successfully");
            })
            .catch(err => {
                alert("Could Not update");
            })

        let index = rows.indexOf(curfooditem);
        rows[index] = updatedFoodItem;
        seteditfooddialog(false);
    }


    const AddFoodItem = () => {
        setopenfooddialog(true);
    }

    const handleClose = () => {
        setopenfooddialog(false);
        settags([]);
        setaddons([]);
        setfname("");
        setprice("");
        setvegnonveg('');
    }

    const deletefooditem = (item) => {
        const req = {
            vemailAdd: vemailAdd,
            fname: item.fname,
        }
        console.log(req);
        axios
            .post("http://localhost:4000/user/deleteFoodItem", req)
            .then(() => {
                alert("Deleted " + item.fname);
                let index = rows.indexOf(item);
                rows.splice(index, 1);
                setrows([...rows]);
            })
    }

    const handlefooditemEdit = (fooditem) => {
        setcurfooditem(fooditem);
        seteditfname(fooditem.fname);
        seteditprice(fooditem.price);
        seteditvegetarianism(fooditem.vegetarianism);
        setedittags(fooditem.tags);
        seteditaddons(fooditem.addons);
        seteditfooddialog(true);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={1}>

            </Grid>


            <Grid item xs={10}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                </Box>

                <h1 align="center">Food Items</h1>
                <h4 align="right"><Button variant="contained" onClick={AddFoodItem}>Add Item</Button></h4>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Veg/Non-Veg</TableCell>
                            <TableCell align="center" >Add-Ons
                                <Table>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </Table>
                            </TableCell>
                            <TableCell>Tags</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((fooditem) => (
                            <TableRow>
                                <TableCell>{fooditem.fname}</TableCell>
                                <TableCell>{fooditem.price}</TableCell>
                                <TableCell> <Rating value={fooditem.rating} precision={0.1} readOnly ></Rating></TableCell>
                                <TableCell>{fooditem.vegetarianism}</TableCell>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell>
                                                {fooditem.addons.map((addon) => (
                                                    <li>{addon.addonname}</li>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                {fooditem.addons.map((addon) => (
                                                    <li>{addon.addonprice}</li>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                                <TableCell>
                                    {fooditem.tags.map((tags) => (
                                        <li>{tags}</li>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => deletefooditem(fooditem)} >Delete</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => { handlefooditemEdit(fooditem) }}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </Grid>
            <Dialog open={openfooddialog} onClose={handleClose}>
                <DialogContent>
                    <h1>Add New Food Item</h1>
                    {foodform()}
                </DialogContent>
            </Dialog>
            <Dialog open={editfooddialog} onClose={() => { seteditfooddialog(false) }}>
                <DialogContent>
                    <h1>Edit Food Item</h1>

                    {editfoodform()}
                </DialogContent>
            </Dialog>
            <Grid item xs={1}>

            </Grid>
        </Grid>
    )
}

export default VendorDashboard;