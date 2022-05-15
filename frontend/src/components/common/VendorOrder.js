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

const VendorOrder = () => {

    if (localStorage.getItem("ordercount") == null)
        localStorage.setItem("ordercount", 0);


    let emailAdd = localStorage.getItem("Vendor");
    let password = localStorage.getItem("VPassword");
    const [vpassword, setvpassword] = useState(password);
    const [vemailAdd, setvemailAdd] = useState(emailAdd);
    const [vendorders, setvendorders] = useState([]);

    let maxorders = localStorage.getItem("ordercount") != null ? localStorage.getItem("ordercount") : 0;

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

    // poll the database every 5 seconds for any order
    useEffect(() => {

        let interval = setInterval(() => {
            const req = { vemailAdd: vemailAdd };
            axios.
                post("http://localhost:4000/user/GetVendorOrders", req)
                .then((response) => {
                    setvendorders(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 5000);

        return () => clearInterval(interval);

    }, [])

    useEffect(() => {
        const req = { vemailAdd: vemailAdd };
        axios.
            post("http://localhost:4000/user/GetVendorOrders", req)
            .then((response) => {
                setvendorders(response.data);
                let curorders = 0;
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].status == "ACCEPTED" || response.data[i].status == "COOKING") {
                        curorders++;
                    }
                    localStorage.setItem("ordercount", curorders);
                    maxorders = curorders;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const handleNextStage = (order, i) => {
        let req = { _id: order._id, status: "" };
        let temporder = vendorders;

        if (maxorders == 10 && order.status == "PLACED") {
            alert("You cannot accept more than 10 orders");
            return;
        }
        if (order.status == "PLACED") {
            req.status = "ACCEPTED";
            maxorders++;
            localStorage.setItem("ordercount", maxorders);

            temporder[i].status = "ACCEPTED";
            setvendorders([...temporder]);
        }
        else if (order.status == "ACCEPTED") {
            req.status = "COOKING";
            temporder[i].status = "COOKING";
            setvendorders([...temporder]);
        }
        else if (order.status == "COOKING") {
            req.status = "READY FOR PICKUP";
            maxorders--
            localStorage.setItem("ordercount", maxorders);
            temporder[i].status = "READY FOR PICKUP";
            setvendorders([...temporder]);
        }

        axios
            .post("http://localhost:4000/user/UpdateOrder", req)
            .then((response) => {

            })

        console.log(maxorders);
    }

    const handleReject = (order) => {
        let req = { _id: order._id, status: "REJECTED" };
        axios
            .post("http://localhost:4000/user/UpdateOrder", req)
            .then((response) => {
                console.log(response);
            })
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={10}>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Placed Time</TableCell>
                            <TableCell>Food Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="center" >Add-Ons
                                <Table>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </Table>
                            </TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendorders.map((order, i) => (
                            <TableRow>
                                <TableCell>{order.placedtime}</TableCell>
                                <TableCell>{order.itemname}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>
                                    <Table>
                                        <TableRow>
                                            <TableCell>
                                                {order.addons.map((addon) => (
                                                    <li>{addon.addonname}</li>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                {order.addons.map((addon) => (
                                                    <li>{addon.addonprice}</li>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.status != "COMPLETED" && order.status != "REJECTED" && order.status != "READY FOR PICKUP" ? <Button variant="contained" onClick={() => { handleNextStage(order, i) }}>Move to Next Stage</Button> : <Button disabled variant="contained">Move to Next Stage</Button>}</TableCell>
                                <TableCell>{order.status == "PLACED" ? <Button variant="contained" onClick={() => { handleReject(order) }}>Reject</Button> : <Button disabled variant="contained">Reject</Button>}</TableCell>
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

export default VendorOrder;