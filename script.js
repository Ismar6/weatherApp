$(document).ready(function() {
  var city = [];
  $(".main").hide();
  $(".forecast").hide();
  $('#send').click(function(e) {
      e.preventDefault();
      var town = $('#grad3').val();
      if (town !== '') {
          $.ajax({
              type: 'GET',
              url: 'https://api.openweathermap.org/data/2.5/weather?q=' + town + '&appid=b84eb6849b7e4ffcedf0f3c8d23be47a&units=metric',
              dataType: 'jsonp',
              success: function(data1) {
                  $(".main").show();
                  city.push(town);
                  $('#weather').empty().text(data1.weather[0].description);
                  $("#town").empty().text(data1.name);
                  $('#temperatura').empty().text(Math.round(data1.main.temp) + "°C");
                  $('#pressure').empty().append("Pressure: " + data1.main.pressure + " hPa");
                  $('#humidity').empty().append("Humidity: " + data1.main.humidity + " %");
                  $('#minTemp').empty().append("Min: " + Math.round(data1.main.temp_min) + "°C");
                  $('#maxTemp').empty().append("Max: " + Math.round(data1.main.temp_max) + "°C");
                  $('#windSpeed').empty().append("Wind Speed: " + Math.round(data1.wind.speed) + " m/s");
                  $('#ikon').attr('src', 'http://openweathermap.org/img/w/' + data1.weather[0].icon + '.png');
              }
          })
      } else $("#grad3").attr("placeholder", "Please enter field")
  });


  $('#send1').click(function(e) {
      e.preventDefault();
      var grad1 = $('#grad4').val();
      if (grad1 !== '') {
          $.ajax({
              type: 'GET',
              url: 'https://api.openweathermap.org/data/2.5/weather?q=' + grad1 + '&appid=b84eb6849b7e4ffcedf0f3c8d23be47a&units=metric',
              dataType: 'jsonp',
              success: function(data1) {
                  city.push(grad1);
                  $(".forecast").hide();
                  $('#weather').empty().text(data1.weather[0].description);
                  $("#town").empty().text(data1.name);
                  $('#temperatura').empty().text(data1.main.temp + "°C");
                  $('#pressure').empty().append("Pressure: " + data1.main.pressure + " hPa");
                  $('#humidity').empty().append("Humidity: " + data1.main.humidity + " %");

                  $('#windSpeed').empty().append("Wind Speed: " + Math.round(data1.wind.speed) + " m/s");
                  console.log(data1);
                  $('#ikon').attr('src', 'https://openweathermap.org/img/w/' + data1.weather[0].icon + '.png');
              }
          })
      } else $("#grad4").attr("placeholder", "Please enter field");
  });


  $('#gumb').click(function(e) {
      e.preventDefault();
      var grad2 = city.slice(-1)[0];
      $.ajax({
          type: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + grad2 + '&appid=b84eb6849b7e4ffcedf0f3c8d23be47a&units=metric',
          dataType: 'jsonp',
          success: function(data1) {
              $("#forecastWeather").empty();
              $(".forecast").show();
              $(".footer").show();
              var table = '';
              for (var i = 6; i < data1.list.length; i += 8) {
                  table += "<tr>";
                  table += "<td>" + data1.list[i].dt_txt.split(' ')[0];
                  table += "<td><img src='http://openweathermap.org/img/w/" + data1.list[i].weather[0].icon + ".png'></td>";
                  table += "<td>" + Math.round(data1.list[i].main.temp) + "°C</td>";
                  table += "<td>" + data1.list[i].weather[0].description + "</td>";
                  table += "<td>" + data1.list[i].main.pressure + " hPa</td>";
                  table += "<td>" + data1.list[i].main.humidity + "%</td>";
                  table += "<td>" + Math.round(data1.list[i].wind.speed) + " m/s</td>";
                  table += "</tr>";
              }
              $('#forecastWeather').append('<thead><tr><td>Date</td><td>Weather</td><td>Temperature</td><td>Description</td><td>Pressure</td><td>Humidity</td><td>Wind Speed</td></tr></thead>');
              $("#forecastWeather").append(table);
              $("#next5Days").empty().append("5 Day Forecast for " + data1.city.name);
              $('html, body').animate({
                  scrollTop: $(".forecast").offset().top
              }, 1500);
          }
      })
  });
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('#scroll').fadeIn();
      } else {
          $('#scroll').fadeOut();
      }
  });
  $('#scroll').click(function() {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      $(".forecast").hide(2000);
      return false;
  });
});