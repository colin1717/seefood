$('#test').click(function(){
  getMenuItems();
  $('#test').hide();
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
