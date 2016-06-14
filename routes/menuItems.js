var express = require('express');
var router = express.Router();
var MenuItem = require('../models/menuItem');

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

/* POST /menuitems */
router.post('/', function(req, res, next){
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
