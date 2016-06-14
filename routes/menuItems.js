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

module.exports = router;
