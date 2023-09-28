const express = require('express')
const router = express.Router();

const {
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getMyProducts,
    getAvailableCities

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/list-properties').get(getProducts);
router.route('/property/:id').get(getSingleProduct);

router.route('/property')
                .post( isAuthenticatedUser, authorizeRoles('owner'), newProduct)
                .get( isAuthenticatedUser, authorizeRoles('owner'), getMyProducts);

router.route('/property/:id')
                .put( isAuthenticatedUser, authorizeRoles('owner'), updateProduct)
                .delete( isAuthenticatedUser, authorizeRoles('owner'), deleteProduct);

router.route('/allCities').get(getAvailableCities);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;