var express = require('express');
var router = express.Router();
var ProductService  = require('../service/product.service');
const db = require('../model');
const Product = db.Product;
//var GraphQLObjectType = require('graphql').GraphQLObjectType;
//var GraphQLNonNull = require('graphql').GraphQLNonNull;
//var GraphQLID = require('graphql').GraphQLID;
//var GraphQLString = require('graphql').GraphQLString;
const {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql');
const { GraphQLSchema } = require('graphql');
var GraphQLList = require('graphql').GraphQLList;
//router.get();
//router.post();
//router.get();
//router.post();
//module.exports= router;
//module.exports = BooksSchema;

const productType = new GraphQLObjectType({
  name: 'product',
  fields:  () =>{
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)},      
        title: {  type: GraphQLString   },     
       desc: {  type: GraphQLString   }    
      }  
    }}
);

// Query
const productQuery = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      products: {
        type: new GraphQLList(productType),
        resolve:  async ()=> {
          const products = await Product.find()
          if (!products) {
            throw new Error('error while fetching data')
          }
          return products
        }
      }
    }
  }
});
module.exports.productSchema = new GraphQLSchema({
    query: productQuery
});


function getProduct(req, res, next){
    
}

function getProductByID(req, res, next){
    
}