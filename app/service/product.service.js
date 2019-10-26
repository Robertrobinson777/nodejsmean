const config = require('../../config.json');

const db = require('../model');
const Product = db.Product;
//const Category = db.Category;

module.exports = {
    index,  //Display a listing of the resource.
    create,  //Show the api for creating a new resource.
    store,   //Store a newly created resource in storage.
    show,   //Display the specified resource.
    edit,   //Show the api for editing the specified resource.
    update,   //Update the specified resource in storage.
    delete: _delete   //Remove the specified resource from storage.    
}

async function index(){
    return await Product.find().select('-created.at');    
}

async function show(id){
    return await Product.findById(id).select('-created.at');
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}

async function create(){
    return {};
}

async function store(){
    return {};
}

async function edit(){
    return {};
}

async function update(){
    return {};
}