const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');

//Create new product => /api/property
exports.newProduct = catchAsyncErrors( async (req, res, next) => {
    
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/list-properties
exports.getProducts = catchAsyncErrors( async (req, res, next) => {

    const productCount = await Product.countDocuments();
    const resPerPage = productCount;
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)

    
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        productCount,
        resPerPage,  
        products
    })
})

// Get single product details => /api/product/:id

exports.getSingleProduct = catchAsyncErrors( async (req, res ,next) => {

    const product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler('Property not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Get all properties uploaded by the user => /api/property

exports.getMyProducts = catchAsyncErrors( async (req, res ,next) => {

    const product = await Product.find({ user : req.user.id });
    
    if(!product){
        return next(new ErrorHandler('Property not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//Update Product =>  /api/property/:id
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Property not found', 404));
    }
    
    if(product.user._id.toString() !== req.user.id.toString()){
        return next(new ErrorHandler('You can only update properties entered by you',401))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        iserFinfAndModify: false
    });

     res.status(200).json({
        success: true,
        product
     })
})

// Delete Product => /api/property/:id
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Property not found', 404));
    }

    if(product.user._id.toString() !== req.user.id.toString()){
        return next(new ErrorHandler('You can only delete properties entered by you',401))
    }

    
    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Property is deleted.'
    });
})

// Create new review  =>  /api/v1/review
exports.createProductReview = catchAsyncErrors( async(req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})


// Get Product Reviews  =>  /api/v1/reviews?id=_id
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review  =>  /api/v1/reviews?id=_id
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    
    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }), {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }

    res.status(200).json({
        success: true
    })
})

// Get available Cities  =>  api/allCities
exports.getAvailableCities = catchAsyncErrors(async (req, res, next) => {
    const distinctCities = await Product.aggregate([
        { $group: { _id: '$city' } },
        { $project: { city: '$_id', _id: 0 } },
      ]);

      
    const cityArray = distinctCities.map((item) => item.city);
    
      res.status(200).json({
        success: true,
        distinctCities,
        cityArray
      })
})