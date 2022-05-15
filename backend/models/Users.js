const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
	vname: {
		type: String,
		required: true
	},
	shopName: {
		type: String,
		required: true
	},
	vemailAdd: {
		type: String,
		required: true
	},
	vcontactNo: {
		type: String,
		required: true
	},
	openingTime: {
		type: String,
		required: true
	},
	closingTime : {
		type: String,
		required: true
	},
	password : {
		type : String,
		required : true,
	}
})

const BuyerSchema = new Schema({
	bname: {
		type: String,
		required: true
	},
	bemailAdd: {
		type: String,
		required: true
	},
	bcontactNo: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true,
	},
	batch: {
		type: String,
		required: true,
	},
	password: {
		type : String,
		required : true,
	}
})

const FoodSchema = new Schema({
	vemailAdd : {
		type: String,
		required: true
	},
	fname : {
		type: String,
		required: true
	},
	price : {
		type: Number,
		required: true
	},
	rating : {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	vegetarianism : {
		type: String,
		required: true
	},
	addons : [{
		addonname: {
			type: String,
			required: true
		},
		addonprice: {
			type: Number,
			required: true
		}
	}],
	tags : [String],
	ordercount : {
		type: Number,
		default : 1,
	}
})

const OrderSchema = new Schema({
	placedtime : {
		type: Date,
	},
	vname : {
		type: String,
		required: true,
	},
	vemailAdd : {
		type: String,
		required: true,
	},
	bemailAdd : {
		type: String,
		required: true,
	},
	itemname : {
		type: String,
		required: true,
	},
	quantity : {
		type: Number,
		required: true,
	},
	addons : [{
		addonname : {
			type: String
		},
		addonprice : {
			type: Number
		}
	}],
	status : {
		type: String,
		required: true,
	},
	ratinggiven : {
		type : Number,
	},
	cost : {
		type : Number,
		required : true,
	}
})

const WalletSchema = new Schema({
	bemailAdd : {
		type: String,
		required : true,
	},
	amount : {
		type: Number,
		required : true,
		default: 500,
	}
})

const FavoriteSchema = new Schema({
	bemailAdd : {
		type : String,
		required : true,
	},
	bname : {
		type : String,
		required : true,
	},
	fname : {
		type: String,
		required: true
	},
	price : {
		type: Number,
		required: true
	},
	rating : {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	vegetarianism : {
		type: String,
		required: true
	},
	addons : [{
		addonname: {
			type: String,
			required: true
		},
		addonprice: {
			type: Number,
			required: true
		}
	}],
	tags : [String],
})

/* module.exports = User = mongoose.model("Users", UserSchema); */
const Vendor = mongoose.model("Vendor", VendorSchema);
const Buyer = mongoose.model("Buyer", BuyerSchema);
const Food = mongoose.model("Food", FoodSchema);
const Order = mongoose.model("Order", OrderSchema);
const Wallet = mongoose.model("Wallet", WalletSchema);
const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = {
	Vendor, Buyer, Food, Order, Wallet, Favorite
}