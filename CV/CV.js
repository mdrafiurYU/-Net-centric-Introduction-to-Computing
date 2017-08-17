function start()
{
  var now = document.getElementById("now");
  now.innerHTML = "Last updated: " + new Date();
}

// Toggle between two pictures by clicking on the picture
function swap()
{
  var picture = document.getElementById("picture");

  /* First determine which picture is currently displayed. If it is the first,
   * replace it with the second, and if it is the second then replace it with
   * the first.
   */
  if(picture.src.indexOf("pic1") != -1) {
    picture.src = "pic2.jpg";
  }
  else {
    picture.src = "pic1.jpg";
  }
}
