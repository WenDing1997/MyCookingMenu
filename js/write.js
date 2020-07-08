$(document).ready(function(){
  let CANVAS = $("#txt");
  let WIDTH = 500;
  let HEIGHT = 1500;
  let COLOR = "blue";
  CANVAS.attr('color', COLOR);
  CANVAS.attr('width', WIDTH);
  CANVAS.attr('height', HEIGHT);

  function getText() {
    var getTextArea = document.getElementById("txt");
    var value = getTextArea.value;
    return value;
  }

  function getImg() {
    var getImage = document.getElementById("txt");
    var value = getTextArea.value;
    return value;
  }

  window.save = function(x, y) {
    // console.log("save fcn");
    var data = {};
    var data_value = {};
    var txtValue = getText();
    data_value['txtValue'] = txtValue;
    data_value['x'] = x;
    data_value['y'] = y;
    data['data'] = data_value;
    console.log(data);
    $.post('write.php?submit=1', data, function(rsp) {
      $('body').append(rsp);
    });
  }

  window.readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(400)
                .height(400);
        };

        reader.readAsDataURL(input.files[0]);
    }
  }
  

});
