/* jslint browser:true */

var id = null;
var firstTime = -1;

var gps1 = {lat : , lon : , u : , v : , desc : };
var gps2 = {lat : , lon : , u : , v : , desc : };

var loc1 = {lat : , lon : , desc : };
var loc2 = {lat : , lon : , desc : };
var loc3 = {lat : , lon : , desc : };

var caches = new Array();
caches[0] = loc1;
caches[1] = loc2;
caches[2] = loc3;

var currentCache = 0;

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}

function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");
    var debug = document.getElementById("debug");
    var me = document.getElementById("me")

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

    var u_me = interpolate(gps1.lat, gps2.lat, gps1.u, gps2.u, position.coords.latitude);
    var v_me = interpolate(gps1.lon, gps2.lon, gps1.v, gps2.v, position.coords.longitude);

    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;
    debug.innerHTML = "u: " + u_me + "v: " + v_me;

    me.style.top = v_me;
    me.style.left = u_me;
}

function interpolate(gps1, gps2, u1, u2, gps)
{
  return u1+(u2-u1)*(gps-gps1)/(gps2-gps1);
}

function updateCache()
{
  currentCache %= caches.length;
  currentCache++;
  showCache();
}

function showCache()
{
  var target = document.getElementById("target");

  var u_target = interpolate(gps1.lon, gps2.lon, gps1.u, gps2.u, caches[currentCache].lon);
  var v_target = interpolate(gps1.lat, gps2.lat, gps1.v, gps2.v, caches[currentCache].lat);

  target.style.top = v_target;
  target.style.left = u_target;
}
