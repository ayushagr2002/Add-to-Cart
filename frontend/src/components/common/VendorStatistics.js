import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Alert, AlertTitle, Table, TableBody, TableRow, TableCell, TableHead, Rating, Dialog, DialogContent, Tabs, Tab } from '@mui/material';
import Plot from 'react-plotly.js';


const VendorStatistics = () => {

    let emailAdd = localStorage.getItem("Vendor");
    let password = localStorage.getItem("VPassword");
    const [vpassword, setvpassword] = useState(password);
    const [vemailAdd, setvemailAdd] = useState(emailAdd);

    const [sortedorders, setsortedorders] = useState([]);
    const [comporders, setcomporders] = useState('');
    const [pendorders, setpendorders] = useState('');
    const [totalorders, settotalorders] = useState('');

    const [xplot, setxplot] = useState([]);
    const [yplot, setyplot] = useState([]);

    const [agexplot, setagexplot] = useState([]);
    const [ageyplot, setageyplot] = useState([]);

    useEffect(() => {
        const req = { vemailAdd: vemailAdd, password:vpassword}
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

    // get statistics
    useEffect(() => {

        let temp = [];
        const req = { vemailAdd: vemailAdd };
        axios.
            post("http://localhost:4000/user/GetVendorOrders", req)
            .then((response) => {
                temp = response.data;
                let completedorders = 0;
                let pendingorders = 0;
                let placedorders = temp.length;
                let top5items = {};
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].status == "COMPLETED") {
                        completedorders++;
                        top5items[temp[i].itemname] = top5items[temp[i].itemname] + 1 || 1;
                    }
                    else if (temp[i].status != "REJECTED" && temp[i].status != "COMPLETED") {
                        pendingorders++;
                    }
                }

                setcomporders(completedorders);
                setpendorders(pendingorders);
                settotalorders(placedorders);

                var sortable = [];
                for (var item in top5items) {
                    sortable.push([item, top5items[item]]);

                    sortable.sort((a, b) => {
                        return b[1] - a[1];
                    })
                }

                if (sortable.length > 5) {
                    sortable.splice(5, sortable.length - 5);
                }
                setsortedorders([...sortable]);

            })
            .catch(err => {
                console.log(err);
            });

    }, [])

    // get data for graph
    useEffect(() => {

        let buyers = [];
        let plotdata = {};
        plotdata['UG1'] = 0;
        plotdata['UG2'] = 0;
        plotdata['UG3'] = 0;
        plotdata['UG4'] = 0;
        plotdata['UG5'] = 0;
        let ageplotdata = {};
        axios
            .get("http://localhost:4000/user/getAllBuyers")
            .then((response) => {
                buyers = response.data;
                axios
                    .post("http://localhost:4000/user/GetVendorOrders", { vemailAdd: vemailAdd })
                    .then((response2) => {

                        for (var i = 0; i < response2.data.length; i++) {

                            if (response2.data[i].status == "COMPLETED") {

                                for (var j = 0; j < buyers.length; j++) {

                                    if (buyers[j].bemailAdd == response2.data[i].bemailAdd) {

                                        plotdata[buyers[j].batch] = plotdata[buyers[j].batch] + 1 || 1;
                                        ageplotdata[buyers[j].age] = ageplotdata[buyers[j].age] + 1 || 1; 

                                    }
                                }
                            }
                        }

                        var xdata = [];
                        var ydata = [];
                        for (var item in plotdata) {
                            xdata.push(item);
                        }

                        for (var item in plotdata) {
                            ydata.push(plotdata[item]);
                        }

                        setxplot([...xdata]);
                        setyplot([...ydata]);

                        var agexdata = [];
                        var ageydata = [];
                        for(var item in ageplotdata) {
                            agexdata.push(item);
                        }

                        for(var item in ageplotdata) {
                            ageydata.push(ageplotdata[item]);
                        }

                        setagexplot([...agexdata]);
                        setageyplot([...ageydata]);


                    })
            })
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="lg">
                <h1 align="center">Statistics</h1>
                <h3>Top 5 items sold: </h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>No of times ordered</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortedorders.map(a => (
                                <TableRow>
                                    <TableCell>{a[0]}</TableCell>
                                    <TableCell>{a[1]}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <h3>Completed Orders: {comporders}</h3>
                <h3>Pending Orders: {pendorders}</h3>
                <h3>Placed Orders: {totalorders}</h3>
                <Plot
                    data={[
                        { type: 'bar', x: xplot, y: yplot },
                    ]}
                    layout={{ width: 800, height: 600, title: 'Batch Vs Completed Orders' }}
                />
                <Plot
                    data={[
                        {type : 'scatter', x : agexplot, y : ageyplot },
                    ]}
                    layout={{ width: 800, height: 600, title : 'Age Vs Completed Orders'}}
                />
            </Container>
        </div>
    )
}

export default VendorStatistics;