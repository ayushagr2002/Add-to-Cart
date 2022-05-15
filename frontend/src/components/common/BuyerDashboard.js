import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid, FormControl, Select, InputLabel, MenuItem, TextField, Chip, Stack, Box, Alert, AlertTitle, Table, TableBody, TableRow, TableCell, TableHead, Rating, Dialog, DialogContent, Checkbox, FormControlLabel, Slider, RadioGroup, Radio, IconButton, InputAdornment } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import SearchIcon from "@mui/icons-material/Search";



const BuyerDashboard = () => {

    let emailAdd = localStorage.getItem("Buyer");
    let password = localStorage.getItem("BPassword");
    const [bpassword, setbpassword] = useState(password);

    const [bname, setbname] = useState("");
    const [bemailAdd, setbemailAdd] = useState(emailAdd);
    
    const [rows, setrows] = useState([]);

    const [vendors, setvendors] = useState([]);
    const [pricerange, setpricerange] = useState([0, 100]);
    const [sort, setsort] = useState(0);
    const [shopslist, setshopslist] = useState([]);
    const [tagslist, settagslist] = useState([]);
    const [veg, setveg] = useState(false);
    const [nonveg, setnonveg] = useState(false);
    const [orderdialog, setorderdialog] = useState(false);
    const [curfooditem, setcurfooditem] = useState([]);
    const [qty, setqty] = useState(1);
    const [searchquery, setsearchquery] = useState("");
    const [addons, setaddons] = useState([]);
    const [amt, setamt] = useState([]);
    const [tabval, settabval] = useState(0);
    const [custorders, setcustorders] = useState([]);
    const [wallet, setwallet] = useState(500);
    const [walletdialog, setwalletdialog] = useState(false);
    const [wallettf, setwallettf] = useState("");
    const [openprofiledialog, setopenprofiledialog] = useState(false);

    const [comprating, setcomprating] = useState([]);

    const [originalrows, setoriginalrows] = useState([]);
    let uniquetags = [];


    // Get Profile Details from DB on page load
    useEffect(() => {

        axios
            .post("http://localhost:4000/user/login/Buyer", { bemailAdd: bemailAdd, password: bpassword })
            .then((response) => {
                setbemailAdd(response.data.bemailAdd);
                setbname(response.data.bname);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    // Get Wallet Details From DB on page load
    useEffect(() => {
        const emailobj = { bemailAdd: bemailAdd };
        axios
            .post("http://localhost:4000/user/GetWallet", emailobj)
            .then((response) => {
                setwallet(response.data.amount);
            })
            .catch(err => {
                console.log(err);
            })
    }, [wallet])


    // Get All Food items from DB on page load
    useEffect(() => {

        axios
            .get("http://localhost:4000/user/getallfooditems")
            .then((response) => {
                setrows(response.data);
                setoriginalrows(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // Get All Vendors on page load
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


    /*

        Filters
        
    */

    // Filter for Shops
    useEffect(() => {
        if (shopslist.length == 0) {
            setrows([...originalrows]);
            return;
        }
        let fooditemstemp = [];
        let shopname = "";
        rows.map((item) => {
            shopname = "";
            for (var i = 0; i < vendors.length; i++) {
                if (vendors[i].vemailAdd == item.vemailAdd) {
                    shopname = vendors[i].shopName;
                    break;
                }
            }
            if (shopslist.indexOf(shopname) != -1) {
                fooditemstemp.push(item);
            }

        });
        setrows([...fooditemstemp]);
    }, [shopslist]);



    // Filter for tags
    const handleTagsFilter = (tag) => {
        console.log(tag);
        let index = tagslist.indexOf(tag);

        if (index == -1) {

            settagslist(tagslist.concat(tag));
            console.log(tagslist);
        }
        else {
            tagslist.splice(index, 1);
            settagslist([...tagslist]);
        }
    }

    useEffect(() => {

        if (tagslist.length == 0) {
            setrows([...originalrows]);
            return;
        }

        console.log(tagslist);
        let fooditemstemp = [];
        rows.map((item) => {

            for (var i = 0; i < item.tags.length; i++) {

                if (tagslist.indexOf(item.tags[i]) != -1) {

                    fooditemstemp.push(item);
                    break;

                }

            }

        });

        console.log(fooditemstemp);
        setrows([...fooditemstemp]);

    }, [tagslist]);


    // Filter for Price Range
    useEffect(() => {
        let fooditemstemp = [];

        for (var i = 0; i < rows.length; i++) {

            if (rows[i].price >= pricerange[0] && rows[i].price <= pricerange[1]) {
                fooditemstemp.push(originalrows[i]);
            }

        }

        setrows([...fooditemstemp]);
    }, [pricerange]);

    const handleSlider = (event, newValue) => {
        setpricerange(newValue);
    }


    // Filter for Sort
    useEffect(() => {

        if (sort == 0) {
            setrows([...originalrows]);
        }

        else if (sort == 1) {
            let fooditemtemp = rows.slice();
            fooditemtemp.sort(function (a, b) { return a.price - b.price });
            setrows([...fooditemtemp]);
        }

        else if (sort == 2) {
            let fooditemtemp = rows.slice();
            fooditemtemp.sort(function (a, b) { return b.price - a.price });
            setrows([...fooditemtemp]);
        }

        else if (sort == 3) {
            let fooditemtemp = rows.slice();
            fooditemtemp.sort(function (a, b) { return a.rating - b.rating });
            setrows([...fooditemtemp]);
        }

        else if (sort == 4) {
            let fooditemtemp = rows.slice();
            fooditemtemp.sort(function (a, b) { return b.rating - a.rating });
            setrows([...fooditemtemp]);
        }

    }, [sort])

    const handleClearSort = () => {
        setsort(0);
    }


    // Filter for Veg/Non-Veg
    const handleVegNonVegFilter = (event, vegetarianism) => {
        if (vegetarianism == "Veg") {
            setveg(true);
            setnonveg(false);
        }
        else {
            setveg(false);
            setnonveg(true);
        }
        let newrows = rows.filter(item => {
            return item.vegetarianism == vegetarianism;
        })
        setrows([...newrows]);
    }


    // Search Bar
    useEffect(() => {
        if (searchquery == "") {
            setrows([...originalrows]);
        }
        else {
            //console.log("Maggi".toLowerCase().includes(searchquery.toLowerCase()));
            const newrows = originalrows.filter((elem) => { const lowercasename = elem.fname.toLowerCase(); return lowercasename.includes(searchquery.toLowerCase()) });
            setrows([...newrows]);
        }
    }, [searchquery])



    // Clear All Filters
    const handleClearFilter = () => {
        setsort(0);
        setshopslist([]);
        settagslist([]);
        setpricerange([0, 100]);
        setveg(false);
        setnonveg(false);
        setsearchquery("");
        setrows([...originalrows]);
    }


    // Add A Favorite Item
    const handleFavorite = (fooditem) => {

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
            .post("http://localhost:4000/user/FindFavorite", req)
            .then((response) => {
                if (response.data == null) {
                    axios
                        .post("http://localhost:4000/user/AddFavorite", req)
                        .then((response) => {
                            alert(req.fname + " successfully Added to Favorites");
                        })
                        .catch(err => {
                            alert("Could Not Add to Favorites");
                            console.log(err);
                        })
                }
                else {
                    alert(req.fname + " is already in favorites");
                }
            })
            .catch(err => {
                alert("Could Not Add to Favorites");
                console.log(err);
            })
    }




    // Total Amount
    useEffect(() => {
        let curamt = qty * (curfooditem.price);
        addons.map((selectedaddon) => {
            curamt = curamt + qty * selectedaddon.addonprice;
        })
        setamt(curamt);
    }, [qty, addons, curfooditem])



    const handleRadioChange = (event) => {
        setsort(event.target.value);
    }

    const handleShopsFilter = (event) => {

        let index = shopslist.findIndex(elem => elem == event.target.name);

        if (index == -1) {
            setshopslist(shopslist.concat(event.target.name));
        }
        else {
            shopslist.splice(index, 1);
            setshopslist([...shopslist]);
        }
    }













    const handleOrder = (fooditem) => {
        setorderdialog(true);
        setcurfooditem(fooditem);
    }

    const handleorderdialogclose = () => {
        setorderdialog(false);
        setqty(1);
        setaddons([]);
    }

    const handleQtyChange = (event) => {
        setqty(event.target.value);
    }

    const handleAddonsorder = (addon) => {
        let index = addons.indexOf(addon);

        if (index == -1) {
            setaddons(addons.concat(addon));
        }
        else {
            addons.splice(index, 1);
            setaddons([...addons]);
        }
    }


    // Place an Order
    const handlePlaceOrder = () => {

        if (+wallet < +amt) {
            alert("Insufficient Wallet Balance");
            handleorderdialogclose();
            return;
        }

        let vname;
        for (var i = 0; i < vendors.length; i++) {
            if (curfooditem.vemailAdd == vendors[i].vemailAdd) {
                vname = vendors[i].vname;
                break;
            }
        }
        const Orderdetails = {
            placedtime: Date.now(),
            vname: vname,
            vemailAdd: curfooditem.vemailAdd,
            bemailAdd: bemailAdd,
            itemname: curfooditem.fname,
            quantity: qty,
            addons: addons,
            status: "PLACED",
            cost: amt,
        }

        axios
            .post("http://localhost:4000/user/AddOrder", Orderdetails)
            .then((response) => {
                alert("Order Placed Successfully");
                console.log(response);
            })
            .catch(err => {
                alert("Could Not Place Order");
                console.log(err);
            })

        let newamount = +wallet - +amt;
        const req = {
            bemailAdd: bemailAdd,
            amount: newamount,
        }

        axios
            .post("http://localhost:4000/user/UpdateWallet", req)
            .then((response) => {
                console.log(response);
            })

        setwallet(newamount);
        handleorderdialogclose();
    }


    // Order Form
    const orderForm = () => {
        return (
            <div>
                Name : {curfooditem.fname} <br /> <br />
                Price : {curfooditem.price} <br /> <br />
                Qty : <Select value={qty} label="qty" onChange={handleQtyChange}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select> <br /> <br />
                Add-Ons: {curfooditem.addons.map(addon => (
                    <div>
                        <FormControlLabel label={<div> {addon.addonname} (Rs. {addon.addonprice}) </div>} control={<Checkbox />} onChange={() => handleAddonsorder(addon)}></FormControlLabel>
                    </div>
                ))}
                Total Price: {amt} <br /> <br />
                <Button variant="contained" onClick={handlePlaceOrder}>Place Order</Button>
            </div>
        )
    }

    const AddMoney = () => {
        setwalletdialog(true);
    }

    const handlewalletdialogclose = () => {
        setwalletdialog(false);
    }

    const handleWallet = () => {

        const walletobj = {
            bemailAdd: bemailAdd,
            amount: +wallet + +wallettf,
        }
        axios
            .post("http://localhost:4000/user/UpdateWallet", walletobj)
            .then(response => {
                alert("Successfully Added Money");
            })
            .catch(err => {
                alert("Could Not Add Money");
            })

        setwallet(+wallet + +wallettf);
        setwallettf("");
        setwalletdialog(false);
    }






    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <h1>Wallet: Rs. {wallet}</h1> <Button variant="contained" onClick={AddMoney}>Add Money</Button>
                    <Dialog open={walletdialog} onClose={handlewalletdialogclose}>
                        <DialogContent>
                            <h3>Enter Amount to Add: </h3><TextField value={wallettf} onChange={(event) => { setwallettf(event.target.value) }}></TextField>
                            <br /><br />
                            <Button sx={{ align: "center" }} variant="contained" onClick={handleWallet}>Add</Button>
                        </DialogContent>
                    </Dialog>

                    <br />
                    <h2>Filters: </h2>
                    <ul>
                        <li><h3>Veg/Non-Veg</h3>
                            <FormControlLabel
                                label="Veg"
                                vegetarianism="Veg"
                                checked={veg}
                                onChange={(event) => { handleVegNonVegFilter(event, "Veg") }}
                                control={<Checkbox />}
                            />
                            <FormControlLabel
                                label="Non-Veg"
                                vegetarianism="Non-Veg"
                                checked={nonveg}
                                onChange={(event) => { handleVegNonVegFilter(event, "Non-Veg") }}
                                control={<Checkbox />}
                            /></li>
                        <Button onClick={() => {
                            setveg(false);
                            setnonveg(false);
                            setrows([...originalrows]);
                        }}>Clear Veg/Non-Veg Filter</Button>
                        <li><h3>Shops:</h3>
                            {vendors.map((vendor) => (
                                <FormControlLabel label={vendor.shopName} checked={shopslist.indexOf(vendor.shopName) != -1} control={<Checkbox />} name={vendor.shopName} onChange={handleShopsFilter} />
                            ))}
                            <br />
                            <Button onClick={() => { setshopslist([]) }}>Clear Shops Filter</Button>
                        </li>
                        <li><h3>Tags:</h3>
                            {originalrows.map((item) => (
                                item.tags.map(tagname => {

                                    if (uniquetags.indexOf(tagname) == -1) {
                                        uniquetags.push(tagname);
                                        return <FormControlLabel label={tagname} checked={tagslist.indexOf(tagname) != -1} onClick={() => { console.log(tagname); handleTagsFilter(tagname) }} control={<Checkbox />}></FormControlLabel>
                                    }

                                })
                            ))}
                            <br />
                            <Button onClick={() => { settagslist([]) }}>Clear Tags Filter</Button>
                        </li>
                        <li><h3>Price Range:</h3>
                            <Slider value={pricerange} valueLabelDisplay="auto" onChange={handleSlider} />
                            <br />
                            <Button onClick={() => { setpricerange([0, 100]) }}>Clear Price Range Filter</Button>
                        </li>
                        <li>
                            <h3>Sort</h3>
                            <RadioGroup value={sort} onChange={handleRadioChange}>
                                <FormControlLabel value={1} control={<Radio />} label="Price Low to High" ></FormControlLabel>
                                <FormControlLabel value={2} control={<Radio />} label="Price High to Low"></FormControlLabel>
                                <FormControlLabel value={3} control={<Radio />} label="Rating Low to High"></FormControlLabel>
                                <FormControlLabel value={4} control={<Radio />} label="Rating High to Low"></FormControlLabel>
                            </RadioGroup>
                            <Button onClick={handleClearSort}>Clear Sort</Button>
                            <br></br><br></br>
                            <Grid container justifyContent="center">
                                <Button variant="contained" onClick={handleClearFilter}>Clear All Filters</Button>
                            </Grid>

                        </li>
                    </ul>

                </Grid>
                <Grid item xs fontSize={24}>
                    



                    <h1 align="center">Food Items</h1>
                    <TextField
                        id="standard-basic"
                        label="Search"
                        fullWidth={true}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        value={searchquery}
                        onChange={(event) => setsearchquery(event.target.value)}
                    // onChange={customFunction}
                    />
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
                                <TableCell>Shop</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((fooditem) => (
                                <TableRow>
                                    <TableCell>{fooditem.fname}</TableCell>
                                    <TableCell>{fooditem.price}</TableCell>
                                    <TableCell> <Rating precision={0.1} value={fooditem.rating} readOnly ></Rating></TableCell>
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
                                        {
                                            vendors.map((vendor) => {
                                                if (vendor.vemailAdd == fooditem.vemailAdd) {
                                                    return vendor.shopName;
                                                }
                                            })
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => { handleFavorite(fooditem) }}><FavoriteBorderIcon sx={{ color: "pink" }}></FavoriteBorderIcon></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => { handleOrder(fooditem) }}>Order</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                </Grid>

            </Grid>
            <Dialog open={orderdialog} onClose={handleorderdialogclose}>
                <DialogContent sx={{ fontSize: 24, width: 500, height: 500 }}>
                    {orderdialog ? orderForm() : null}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BuyerDashboard;