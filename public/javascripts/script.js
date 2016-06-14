$('#test').click(function(){
  getMenuItems();
  $('#test').hide();
})

$('#phototest').click(function(){
  addPhoto();
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
  $('#sidebar-menu').append('<div id="'+ foodItem._id +'" class="menubox"><h3>'+ foodItem.name +'</h3></div>');
  $('#'+ foodItem._id +'').click(function(){
    showPhotoBox();
  })
}

function loopThroughMenuItems(data) {
  for (var i = 0; i < data.length; i++){
    addMenuBox(data[i]);
  }
}

function showPhotoBox() {
  $('.photobox').removeClass('hidden');
}

function addPhoto(foodItem) {
  $('#photostrip').prepend('<div class="photoframe col-md-3"><div class="image"><img src="/images/seefood_images/addnew.jpg"></div></div>');
}

//add to ajax call so that images populate at beginning and the div is revealed when the specific menu item is clicked on
