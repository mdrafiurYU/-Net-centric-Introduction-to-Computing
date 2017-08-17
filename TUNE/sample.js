function albums(json) {
  var o = document.getElementById("output");
  for(var e=0;e<json.length;e++) {
    o.innerHTML += json[e].album + "<br>";
  }
}

function buildYearPullDown(json) {
  var s = document.createElement("select");
  s.setAttribute("id", "year");
  var h = document.createElement("option");
  h.innerHTML = "<b>Year</b>";
  s.appendChild(h);
  for(var i=0;i<json.length;i++) {
    var v = json[i].year;
    var q = document.createElement("option");
    q.innerHTML = v;
    s.appendChild(q);
  }
  return s;
}

function buildArtistPullDown(json) {
  var s = document.createElement("select");
  s.setAttribute("id", "artist");
  var h = document.createElement("option");
  h.innerHTML = "<b>Artists</b>";
  s.appendChild(h);
  for(var i=0;i<json.length;i++) {
    var v = json[i].artist;
    var q = document.createElement("option");
    q.innerHTML = v;
    s.appendChild(q);
  }
  return s;
}

function numUpdateCallback() {
  alert("Inventory Updated!");
}

function purchaseCallback(json) {
    var num = JSON.stringify(json[0].number);
    var price = JSON.stringify(json[0].price);

    if(num < 1)
      alert("Sorry! The album is out of stock.");
    else {
      alert("You are going to be charged for the purchase of this album at " + price);
      access("update collection set number=" + (num-1) + " where id=" + json[0].id, numUpdateCallback)
    }

}

function purchase(id) {
  access("select price,album,number,id from collection where id=" + id, purchaseCallback);
}

function selectCalback(json) {
  var res = document.getElementById("results");
  while(res.hasChildNodes())
    res.removeChild(res.firstChild);

  var div = document.createElement("div");
  div.style.backgroundColor = "grey";

  for(var i = 0; i < json.length; i++)
  {
    var img = document.createElement("img");
    var br = document.createElement("br");
    var hr = document.createElement("hr");
    div.appendChild(hr);
    img.width = 100;
    img.height = 100;
    img.src = json[i].cover;
    div.appendChild(img);
    div.appendChild(br);

    var span = document.createElement("span");
    var br = document.createElement("br");
    span.innerHTML = "<b>"+json[i].album+"</b>" + " $" + "<b>"+json[i].price+"</b>";
    div.appendChild(br);
    div.appendChild(span);

    var button = document.createElement("button");
    var purchaseFunc = "purchase(" + json[i].id + ")";
    button.setAttribute("onclick", purchaseFunc);
    button.innerHTML = "Purchase";
    div.appendChild(button);
    div.appendChild(br);
  }
  results.appendChild(div);
}

function find() {
  var query;

  var artist = document.getElementById(("artist"));
  var year = document.getElementById(("year"));

  var selectedArtist = artist.selectedIndex;
  var selectedYear = year.selectedIndex;

  if(selectedArtist == 0 && selectedYear == 0)
    query = "select * from collection";
  else if(selectedArtist == 0 && selectedYear != 0)
    query = "select * from collection where year=" + year[selectedYear].text;
  else if(selectedArtist != 0 && selectedYear == 0)
    query = "select * from collection where artist=\"" + artist[selectedArtist].text + "\"";
  else
    query = "select * from collection where artist=\"" + artist[selectedArtist].text + "\" and year=" + year[selectedYear].text;

  access(query, selectCalback);
}

function yearCallback(json) {
  var selection = document.getElementById("selection")
  selection.appendChild(buildYearPullDown(json));

  var button = document.createElement("button");
  button.setAttribute("onclick", "find()");
  button.innerHTML = "Find";
  selection.appendChild(button);
}

function artistCallback(json) {
  //alert(JSON.stringify(json));
  var selection = document.getElementById("selection")
  selection.appendChild(buildArtistPullDown(json));
  access("select distinct year from collection order by year", yearCallback);
}

function go() {
  access("select album from collection order by album", albums);
  access("select distinct artist from collection order by artist", artistCallback);
}


var ajax;
var acallback=null;
function access(query, callback)
{
  acallback = callback;
  ajax = new XMLHttpRequest();
  ajax.onreadystatechange = ajaxProcess;
  ajax.open("GET", "http://192.168.2.10:8000/sql?query=" + query);
  ajax.send(null);
}

function ajaxProcess() {
  if((ajax.readyState == 4)&&(ajax.status == 200)){
    ajaxCompleted(ajax.responseText)
  }
}

function ajaxCompleted(text) {
  var output = document.getElementById("output");
  if(acallback != null) {
    var data = JSON.parse(text);
    acallback(data);
  }
}

onload=go;
