$('#hamburger').click(function(){
  $('.dropdown').toggleClass('hidden');
})

$('#contigo').click(function(){
  getMenuItems();
})

$('#login').click(function(){
  $(location).attr('href', './login');
})

function getMenuItems(){
  $.ajax({
    url: '/menuitems',
    method: 'GET',
    dataType: 'JSON'
  })
    .done(function(data, textStatus){
      console.log(data);
      loopThroughMenuItems(data);
    })
    .fail(function(data, textStatus){
      console.log("Error getting food items.  Status: " + textStatus);
    })
}

function addMenuBox(foodItem) {
  $('#sidebar-menu').append('<div id="'+ foodItem._id +'" class="menubox addedbox"><h3>'+ foodItem.name +'</h3></div>');
  $('#'+ foodItem._id +'').click(function(){
    //add photo of specific food item
    console.log(foodItem);
    addPhoto(foodItem);

    showPhotoBox();
  })
}

function loopThroughMenuItems(data) {
  $('.addedbox').remove();
  for (var i = 0; i < data.length; i++){
    addMenuBox(data[i]);
  }
}

function addPhoto(foodItem) {
  console.log(foodItem.photos);
  $('.addedphoto').remove();
  loopThroughFoodItemsPhotos(foodItem);
  $('#photostrip').append('<div class="photoframe col-md-3 addedphoto"><div class="image"><img src="/images/seefood_images/addnew.jpg" id="addnew"><form action="/menuitems/'+ foodItem._id +'/upload" method="POST" enctype="multipart/form-data"><input type="file" name="image" class="choosefile"><input type="submit" value="Add Photo"></form></div></div>');
  $('#photostrip').width($(window).width() - ($(window).width()/3.5) );
}

function loopThroughFoodItemsPhotos(foodItem) {
  for (var i = 0; i < foodItem.photos.length; i++) {
    $('#photostrip').prepend('<div class="photoframe col-md-3 addedphoto"><div class="image"><img src="' + foodItem.photos[i].path +'"></div></div>')
  }
}

function showPhotoBox() {
  $('.photobox').removeClass('hidden');
}


//add to ajax call so that images populate at beginning and the div is revealed when the specific menu item is clicked on
