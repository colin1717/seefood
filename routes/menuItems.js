var express = require('express');
var router = express.Router();
var MenuItem = require('../models/menuItem');
var multer = require('multer');
var s3 = require('multer-storage-s3')



/* GET /menuItems  */
router.get('/', function(req, res,next){
  console.log('its hitting the get');
  MenuItem.find({}, function(err, menuItems){
    if (err) {
      res.status(500).send();
    } else {
      res.json(menuItems);
    }
  });
});

/* multer setup */
var storage = s3({
    destination : function( req, file, cb ) {
        cb( null, 'photos' );
    },
    filename    : function( req, file, cb ) {
        cb( null, file.fieldname + '-' + Date.now() );
    },

    bucket      : 'seefood',
    region      : 'us-west-2'
});

var uploadMiddleware = multer({
   storage: storage,
   limits: {fileSize: 500000, files:1}
  });

//middleware to check if user is logged in
function checkIfUserIsLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/login');
  }
}

/* POST /menuitems */
router.post('/',checkIfUserIsLoggedIn, function(req, res, next){
  var menuItem = new MenuItem(req.body);
  menuItem.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.json(menuItem);
    }
  });
});

//middleware
router.use('/:menuItemId', function(req, res, next){
  MenuItem.findOne({'_id': req.params.menuItemId }, function(err, menuItem){
    if (err) {
      res.status(500).send();
    } else {
      if (menuItem) {
        res.menuItem = menuItem;
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

/* Multer upload to S3 */
router.post('/:menuItemId/upload',checkIfUserIsLoggedIn, uploadMiddleware.any(), function(req, res, next) {
  //res.send(req.files);
  const menuItem = res.menuItem;
  const photos = menuItem.photos;
  photos.push({ "path": req.files[0].s3.Location })
  $set: { photos: photos }
  menuItem.save(function(err){
    if (err) {
      res.status(500).send();
    } else {
      res.redirect('/');
    }
  })
});

/* Get /menuItems/:menuItemId */
router.get('/:menuItemId', function(req, res, next) {
  res.json(res.menuItem);
})

/* PUT /menuItems/:menuItemId */
router.put('/:menuItemId', function(req, res, next) {
  MenuItem.findByIdAndUpdate(req.params.menuItemId, { $set: req.body }, function(err, menuItem){
    if (err) {
      res.status(500).send();
    } else {
      MenuItem.findOne({'_id': req.params.menuItemId }, function(err, menuItem){
        if (err) {
          res.status(500).send();
        } else {
          if (menuItem){
            res.menuItem = menuItem;
            res.json(res.menuItem);
          } else {
            res.status(404).send();
          }
        }
      });
    }
  });
});

/* Delete /menuItem */
router.delete('/:menuItemId', function(req, res, next){
  MenuItem.remove({'_id': res.menuItem._id}, function(err){
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  })
});

module.exports = router;
