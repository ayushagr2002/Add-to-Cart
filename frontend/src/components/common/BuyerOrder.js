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

const BuyerOrder = () => {

    let emailAdd = localStorage.getItem("Buyer");
    let password = localStorage.getItem("BPassword");
    const [bpassword, setbpassword] = useState(password);
    const [bemailAdd, setbemailAdd] = useState(emailAdd);

    const [custorders, setcustorders] = useState([]);
    const [comprating, setcomprating] = useState([]);

    // Get Orders from DB every 5s to dynamically set the status
    useEffect(() => {

        let interval = setInterval(() => {
            const emailobj = { bemailAdd: bemailAdd , password : bpassword};
            axios
                .post("http://localhost:4000/user/getBuyerOrders", emailobj)
                .then((response) => {
                    setcustorders(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        const emailobj = { bemailAdd: bemailAdd };
        axios
            .post("http://localhost:4000/user/getBuyerOrders", emailobj)
            .then((response) => {
                setcustorders(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const handlePickup = (order, i) => {

        axios
            .post("http://localhost:4000/user/UpdateOrder", { _id: order._id, status: "COMPLETED" })
            .then((response) => {
                let temp = custorders;
                temp[i].status = "COMPLETED";
                setcustorders([...temp]);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div>
            <Grid container>
                <Grid item xs={1}>

                </Grid>

                <Grid item xs={10}>
                    <h1>Orders: </h1>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Placed Time</TableCell>
                                <TableCell>Vendor Name</TableCell>
                                <TableCell>Food Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Add-Ons</TableCell>
                                <TableCell>Total Cost</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Pickup</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {custorders.map((order, i) => (
                                <TableRow>
                                    <TableCell>{order.placedtime}</TableCell>
                                    <TableCell>{order.vname}</TableCell>
                                    <TableCell>{order.itemname}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{
                                        order.addons.map((addon) => (
                                            <div>{addon.addonname} (Rs {addon.addonprice})</div>
                                        ))
                                    }
                                    </TableCell>
                                    <TableCell>Rs. {order.cost}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        {
                                            order.status == "READY FOR PICKUP" ?
                                                <Button variant="contained" onClick={() => { handlePickup(order, i) }}>PICKUP</Button> :
                                                <Button variant="contained" disabled>PICKUP</Button>
                                        }
                                    </TableCell>
                                    <TableCell>{order.status == "COMPLETED" ? <div>
                                        <Rating
                                            value={comprating[i] || order.ratinggiven}
                                            onChange={(event, newValue, i) => {
                                                let temp = [...comprating];
                                                temp[i] = newValue;
                                                setcomprating([...temp]);
                                                axios.post("http://localhost:4000/user/giverating", { _id: order._id, ratinggiven: newValue })
                                                    .then((response) => {
                                                        alert("Rating Successfully Submitted");
                                                    })
                                                    .catch(err => {
                                                        alert("Could Not Submit Rating");
                                                    })

                                                let tbuitem = {};
                                                let avgrtg;
                                                axios.post("http://localhost:4000/user/getSpecificFoodItem", { vemailAdd: order.vemailAdd, fname: order.itemname })
                                                    .then((response) => {
                                                        tbuitem = response.data;
                                                        if (tbuitem.rating == 0) {
                                                            avgrtg = +newValue;
                                                        }
                                                        else {
                                                            avgrtg = parseFloat((parseFloat((+tbuitem.rating + +newValue)) / 2));
                                                        }
                                                        console.log(response.data);
                                                        let newcount = +tbuitem.ordercount + 1;
                                                        axios.post("http://localhost:4000/user/UpdateAverageRating", { vemailAdd: order.vemailAdd, fname: order.itemname, rating: avgrtg, ordercount: newcount })
                                                            .then((response) => {
                                                                console.log(response.data);
                                                            })
                                                            .catch(err => {
                                                                alert("Could not update avg rating");
                                                            })
                                                    })
                                                    .catch(err => {
                                                        alert("Could Not update average rating");
                                                    })
                                            }}
                                        />
                                    </div> : null}</TableCell>

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

export default BuyerOrder;