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

const BuyerFavorites = () => {

    let emailAdd = localStorage.getItem("Buyer");
    let password = localStorage.getItem("BPassword");
    const [bpassword, setbpassword] = useState(password);
    const [bemailAdd, setbemailAdd] = useState(emailAdd);
    const [bname, setbname] = useState("");
    const [vendors, setvendors] = useState([]);

    const [fav, setfav] = useState([]);

    useEffect(() => {
        const req = { bemailAdd: bemailAdd, password: bpassword}
        axios
            .post("http://localhost:4000/user/login/Buyer", req)
            .then((response) => {
                setbemailAdd(response.data.bemailAdd);
                setbname(response.data.bname);
                localStorage.setItem("Buyer", response.data.bemailAdd);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Get All Favorites of Buyer on page load
    useEffect(() => {
        axios
            .post("http://localhost:4000/user/GetFavorite", { bemailAdd: bemailAdd })
            .then((response) => {
                setfav(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/user/getallVendors")
            .then((response) => {
                setvendors(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const removeFavorite = (fooditem, i) => {

        const req = {
            bemailAdd: bemailAdd,
            bname: bname,
            fname: fooditem.fname,
            price: fooditem.price,
            vegetarianism: fooditem.vegetarianism,
            tags: fooditem.tags,
            addons: fooditem.addons,
        }

        axios
            .post("http://localhost:4000/user/DeleteFavorite", req)
            .then((response) => {
                alert(fooditem.fname + " removed from favorites");
                fav.splice(i, 1);
                setfav([...fav]);
            })
            .catch(err => {
                alert("Could Not Delete " + fooditem.fname);
                console.log(err);
            })

    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={1}>

                </Grid>

                <Grid item xs={10}>
                    <h2>Favorites:</h2>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Price</TableCell>
                               
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
                            {fav.map((fooditem, i) => (
                                <TableRow>
                                    <TableCell>{fooditem.fname}</TableCell>
                                    <TableCell>{fooditem.price}</TableCell>
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
                                        <Button variant="contained" onClick={() => { removeFavorite(fooditem, i) }}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={1}>

                </Grid>
            </Grid>

        </div>
    )
}

export default BuyerFavorites;