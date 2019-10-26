const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Float = require('mongoose-float').loadType(mongoose, 4);

const slug = require('mongoose-slug-generator');
const options = require('../config.json').productSlugOptions;

mongoose.plugin(slug,options);

const schema = new Schema({
    title:String,
    slug:{ type: String, slug: ["title"], slug_padding_size: 2, unique: true },
    desc: String,
    type: String,
    SKU: Float, //Stock Keeping Unit    
    categories:[{
        id: Schema.Types.ObjectId,
        name: String
    }],
    image:{
        id: Schema.Types.ObjectId,       
        url: Schema.Types.Mixed
    },
    gallery:[{
        id: Schema.Types.ObjectId,           
        url: Schema.Types.Mixed       
    }],      
    simple:{
        regularPrice: Float,
        salesPrice: Float,           
        salesPriceDate:{
            start:{ type: Date},
            end:{ type: Date}       
        }
    },
    attributes:[{
        name:String,
        value:Schema.Types.Array
    }],
    variation: [{
        id: Schema.Types.ObjectId,
        variations: Schema.Types.Array,
        SKU: Float,
        status: Schema.Types.Mixed,//instock|OutofStock|Unavailable
        regularPrice: Float,
        salesPrice: Float,       
        salesPriceDate:{
            start:{ type: Date},
            end:{ type: Date}       
        },
        desc: String,
        gallery:[{
           id: Schema.Types.ObjectId,                            
           url: Schema.Types.Mixed
        }]
    }],
    external:{
        url:String,
        buttonText:String,
    },      
    tags:Schema.Types.Array,
    comments:{
      active:{ type: Boolean, default: true},  
      user: Schema.Types.Array,
      rating: Number,
      review: Schema.Types.String
    },
    created:{
        at:{ type: Date, default: Date.now },
        by: Schema.Types.ObjectId
    },   
    modified:[{
        at:{ type: Date, default: Date.now },
        by: Schema.Types.ObjectId
    }],
    metadata:{}
},{collection:"products"});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('products', schema);