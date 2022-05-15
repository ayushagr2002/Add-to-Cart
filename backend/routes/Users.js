var express = require("express");
var router = express.Router();

// Load User model
const { Vendor, Buyer, Food, Order, Wallet, Favorite } = require("../models/Users");

// GET request 
// Getting all the users
router.get("/getAllVendors", function (req, res) {
    Vendor.find({})
        .then(vendors => {
            res.json(vendors);
        })
});

router.get("/getAllBuyers", (req, res) => {
    Buyer.find({})
        .then(buyer => {
            res.json(buyer);
        })
})

router.post("/getFoodItem", (req, res) => {
    Food.find({ vemailAdd: req.body.vemailAdd })
        .then(fooditem => {
            res.status(200).json(fooditem);
        })
        .catch(err => {
            res.status(400).json(fooditem);
        })
})

router.post("/getSpecificFoodItem", (req, res) => {
    Food.findOne({ vemailAdd: req.body.vemailAdd, fname: req.body.fname })
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.get("/deleteallFoodItem", function (req, res) {
    Food.deleteMany({})
        .then(() => {
            res.send("Deleted");
        })
})

router.get("/deleteallVendors", (req, res) => {
    Vendor.deleteMany({})
        .then(() => {
            res.send("Deleted");
        })
})

router.get("/getallfooditems", (req, res) => {
    Food.find({})
        .then(fooditems => {
            res.json(fooditems);
        })
})

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register/vendor", (req, res) => {
    const newVendor = new Vendor({
        vname: req.body.vname,
        shopName: req.body.shopName,
        vemailAdd: req.body.vemailAdd,
        vcontactNo: req.body.vcontactNo,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        password : req.body.password,
    });

    Vendor.create(newVendor)
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});

router.post("/register/buyer", (req, res) => {
    const newBuyer = new Buyer({
        bname: req.body.bname,
        bemailAdd: req.body.bemailAdd,
        bcontactNo: req.body.bcontactNo,
        age: req.body.age,
        batch: req.body.batch,
        password : req.body.password,
    });

    Buyer.create(newBuyer)
        .then(buyer => {
            res.status(200).json(buyer);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


// POST request 
// Login
router.post("/login/Vendor", (req, res) => {
    // Find user by email
    Vendor.findOne({ vemailAdd: req.body.vemailAdd , password : req.body.password}).then(user => {
        // Check if user email exists
        if (!user) {
            res.json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
        }
    });
});

router.post("/login/Buyer", (req, res) => {
    // Find user by email
    Buyer.findOne({ bemailAdd: req.body.bemailAdd , password : req.body.password }).then(user => {
        // Check if user email exists
        if (!user) {
            res.json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
        }
    });
});

router.post("/update/Vendor", (req, res) => {

    Vendor.updateOne({ vemailAdd: req.body.vemailAdd }, {
        $set:
        {
            vname: req.body.vname,
            vemailAdd: req.body.vemailAdd,
            vcontactNo: req.body.vcontactNo,
            shopName: req.body.shopName,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime
        }
    }).then(user => {
        res.status(200).json(user);
    })
        .catch(err => {
            res.status(400).send(err);
        })

});

router.post("/update/Buyer", (req, res) => {
    Buyer.updateOne({ bemailAdd: req.body.oldbemailAdd }, {
        $set:
        {
            bname: req.body.bname,
            bemailAdd: req.body.bemailAdd,
            vcontactNo: req.body.bcontactNo,
            age: req.body.age,
            batch: req.body.batch
        }
    }).then(buyer => {
        if (!buyer) {
            res.status(400).json({
                error: "Buyer Not Found",
            })
        }
        else {
            res.status(200).json(buyer);
        }
    })
});

router.post("/findvendor", (req, res) => {
    console.log(req.body);
    Vendor.findOne({ vemailAdd: req.body.vemailAdd }).then(user => {
        if (!user) {
            res.json({
                error: "Email Not Found",
            })
        }
        else {
            res.status(200).json(user);
        }
    });
});

router.post("/addFoodItem", (req, res) => {

    const newFoodItem = new Food({
        vemailAdd: req.body.vemailAdd,
        fname: req.body.fname,
        price: req.body.price,
        vegetarianism: req.body.vegetarianism,
        tags: req.body.tags,
        addons: req.body.addons,
    })

    Food.create(newFoodItem)
        .then(fooditem => {
            res.status(200).json(fooditem);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

router.post("/editFoodItem", (req, res) => {
    Food.updateOne({ vemailAdd: req.body.vemailAdd, fname: req.body.fname }, {
        $set: {
            fname: req.body.fname,
            price: req.body.price,
            vegetarianism: req.body.vegetarianism,
            addons: req.body.addons,
            tags: req.body.tags
        }
    }).then(user => {
        res.status(200).json(user);
    })
        .catch(err => {
            req.status(400).send(err);
        })
})

router.post("/deleteFoodItem", (req, res) => {
    Food.deleteOne({ vemailAdd: req.body.vemailAdd, fname: req.body.fname })
        .then(() => {
            res.status(200).send("Deleted");
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/AddOrder", (req, res) => {
    const newOrder = new Order({
        placedtime: req.body.placedtime,
        vname: req.body.vname,
        vemailAdd: req.body.vemailAdd,
        bemailAdd: req.body.bemailAdd,
        itemname: req.body.itemname,
        quantity: req.body.quantity,
        addons: req.body.addons,
        status: req.body.status,
        cost : req.body.cost,
    })

    Order.create(newOrder)
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/UpdateOrder", (req, res) => {
    Order.findByIdAndUpdate(req.body._id, {
        $set: {
            status: req.body.status
        }
    }).then(order => {
        res.status(200).json(order);
    })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.post("/DeleteAllOrders", (req, res) => {
    Order.deleteMany({})
        .then(() => {
            res.status(200).send("Deleted");
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/ShowAllOrders", (req, res) => {
    Order.find({})
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/getBuyerOrders", (req, res) => {
    Order.find({ bemailAdd: req.body.bemailAdd })
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/AddWallet", (req, res) => {
    const newWallet = new Wallet({
        bemailAdd: req.body.bemailAdd,
    })

    Wallet.create(newWallet)
        .then(wallet => {
            res.status(200).json(wallet);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/UpdateWallet", (req, res) => {

    Wallet.updateOne({ bemailAdd: req.body.bemailAdd }, {
        $set: {
            amount: req.body.amount,
        }
    }).then(wallet => {
        res.status(200).json(wallet);
    })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/GetWallet", (req, res) => {
    Wallet.findOne({ bemailAdd: req.body.bemailAdd }).then(wallet => {
        if (!wallet) {
            res.status(400).send("No wallet exists");
        }
        else {
            res.status(200).json(wallet);
        }
    });
});

router.post("/GetVendorOrders", (req, res) => {
    Order.find({ vemailAdd: req.body.vemailAdd })
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/GetCompletedOrders", (req, res) => {
    Order.find({ vemailAdd: req.body.vemailAdd, status: "COMPLETED" })
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/GiveRating", (req, res) => {
    Order.findByIdAndUpdate(req.body._id, {
        $set: {
            ratinggiven: req.body.ratinggiven,
        }
    }).then(order => {
        res.status(200).json(order);
    })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.post("/UpdateAverageRating", (req, res) => {

    Food.updateOne({ vemailAdd: req.body.vemailAdd, fname: req.body.fname }, {
        $set: {
            rating: req.body.rating,
            ordercount: req.body.ordercount,
        }
    }).then(item => {
        res.status(200).json(item);
    })
        .catch(err => {
            res.status(400).send(err);
        })

})

router.post("/AddFavorite", (req, res) => {

    const newFavorite = {
        bemailAdd: req.body.bemailAdd,
        bname: req.body.bname,
        fname: req.body.fname,
        price: req.body.price,
        vegetarianism: req.body.vegetarianism,
        tags: req.body.tags,
        addons: req.body.addons,
    }

    Favorite.create(newFavorite)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/GetFavorite", (req, res) => {

    Favorite.find({ bemailAdd: req.body.bemailAdd })
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(400).send(err);
        })

})

router.post("/FindFavorite", (req, res) => {

    Favorite.findOne({
        bemailAdd: req.body.bemailAdd,
        bname: req.body.bname,
        fname: req.body.fname,
        price: req.body.price,
        vegetarianism: req.body.vegetarianism,
        tags: req.body.tags,
        addons: req.body.addons,
    })
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        })

})

router.post("/DeleteFavorite", (req, res) => {

    Favorite.deleteOne({
        bemailAdd: req.body.bemailAdd,
        bname: req.body.bname,
        fname: req.body.fname,
        price: req.body.price,
        vegetarianism: req.body.vegetarianism,
        tags: req.body.tags,
        addons: req.body.addons,
    }).then(item => {
        res.status(200).json(item);
    })
        .catch(err => {
            res.status(400).send(err);
        })

})

router.post("/DeleteAllBuyers", (req, res) => {
    Buyer.deleteMany({})
        .then(() => {
            res.status(200).send("Deleted");
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

router.post("/DeleteAllFav", (req, res) => {
    Favorite.deleteMany({})
    .then(() => {
        res.status(200).send("Deleted");
    })
    .catch(err => {
        res.status(400).send(err);
    })
})

/* router.post("/GetPendingOrders", (req, res) => {
    Order.find()
}) */

module.exports = router;

