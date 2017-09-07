var lat, ln, tempUnit, temperature;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert=("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    ln = position.coords.longitude;
    console.log(lat+ln);
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+ln+"&APPID=780791feddc51fd9b16e05c3cd855c5a", function(result){
   console.log(result);
  temperature =result.main.temp -273.15,
   getAddress(lat, ln);
     document.getElementById("weatherResult").innerHTML =result.weather[0].description;
     document.getElementById("tempResult").innerHTML= temperature.toPrecision(3) + " "+tempUnit;
    document.getElementById("windResult").innerHTML= "wind " + result.wind.speed+" knots ";
    $('#windDir').html(" "+ result.wind.deg+ "&deg");
    $('.glyphicon-arrow-up').css('transform','rotate(' + result.wind.deg + 'deg)');

      document.getElementById("weatherIcon").src= "http://openweathermap.org/img/w/"+result.weather[0].icon+".png";
    $('.container').css('visibility','visible');
        $('.loader').css('visibility','hidden');
    });
}


function getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0].address_components[4].long_name;
                    document.getElementById("cityName").innerHTML=address;
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

function convertTemp() {
  if (tempUnit=="F") {
    temperature =(parseFloat(document.getElementById("tempResult").innerHTML)-32)/1.8;
    tempUnit="C";
  }
  else if(tempUnit=="C") {
    temperature =(parseFloat(document.getElementById("tempResult").innerHTML)*1.8)+32;
    tempUnit="F";
  }
  document.getElementById("tempResult").innerHTML= temperature.toPrecision(3) + " "+tempUnit;
}

$(document).ready(function() {
  tempUnit="C";
  getLocation();

  });
