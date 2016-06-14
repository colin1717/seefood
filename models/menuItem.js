var mongoose = require('mongoose');

var menuItemSchema = {
  name: String,
  photos: [{ photoID: String, path: String }]
}

var MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
