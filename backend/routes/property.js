
const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  createProperty,
  getProperties,
  getProperty,
  getMyProperty,
  updateProperty,
  deleteProperty,
  sendInfoToSeller
} = require('../controllers/propertyController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// @route    POST api/properties
// @desc     Create a property
// @access   Private
router.get('/my-property',requireAuth,getMyProperty)

router.post('/:propertyId/interest',requireAuth,sendInfoToSeller)

router.put(
  '/update/:id',
  requireAuth,
  [
    check('place', 'Place is required').not().isEmpty(),
    check('area', 'Area is required').isNumeric(),
    check('bedrooms', 'Number of bedrooms is required').isNumeric(),
    check('bathrooms', 'Number of bathrooms is required').isNumeric(),
    check('imageUrl', 'Image URL is required').not().isEmpty(),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateProperty(req, res);
  }
);

router.post(
  '/',
  [
    requireAuth,
    [
      check('place', 'Place is required').not().isEmpty(),
      check('area', 'Area is required').isNumeric(),
      check('bedrooms', 'Number of bedrooms is required').isNumeric(),
      check('bathrooms', 'Number of bathrooms is required').isNumeric(),
      check('imageUrl', 'Image URL is required').not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createProperty(req, res);
  }
);

// @route    GET api/properties
// @desc     Get all properties
// @access   Public
router.get('/', getProperties);

// @route    GET api/properties/:id
// @desc     Get property by ID
// @access   Public
router.get('/:id', getProperty);

// @route    PUT api/properties/:id
// @desc     Update property
// @access   Private




// @route    DELETE api/properties/:id
// @desc     Delete property
// @access   Private
router.delete('/delete/:id', requireAuth, deleteProperty);

module.exports = router;
