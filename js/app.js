function begingApp(){
  'use strict'; //Using strict mode on the app main funcition and not the global scope.

  //Create google map element and set its parameters.
  var map = new google.maps.Map(document.getElementById('map-canvas'),{center: { lat: 18.668407, lng: -69.811627},zoom: 10});
  
  //Used to store and access app data.
  var model = 
  {
    mapOptions:
    {
      center:{ lat: 18.45, lng: -69.94},
      zoom: 15
    },

    markersData:
    [
    {
      marker: new google.maps.Marker({
      position: { lat: 18.492394, lng: -69.951457},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Jardin Botanico',
      picUrl: "",
      Wurl:"",
      }) 
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.452031, lng: -69.607208},  
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Boca Chica',
      picUrl: "",
      Wurl:"",
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.755277, lng: -69.637012}, 
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Bayaguana',
      picUrl: "",
      Wurl:"",
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.810778, lng: -69.789840},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Monte Plata',
      picUrl: "",
      Wurl:"",
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.810778, lng: -69.72},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Monte Verde',
      picUrl: "",
      Wurl:"",
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.486187, lng: -69.910560},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Villa Juana',
      picUrl: "",
      Wurl:"",
      })
    },

    {

      marker: new google.maps.Marker({
      position: { lat: 18.425486, lng: -69.425703},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Juan Dolio',
      picUrl: "",
      Wurl:"",
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.672388, lng: -70.171802},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Villa Altagracia',
      picUrl: "",
      Wurl:"",
      })
    },
    ],

    currentInfo: "",

    currentMarker: "",

    enterKeyMarkers:[],
  };

  ko.applyBindings(model);

  var octopus =
  {
    //Looks trhough all modal markets titles and if the input search value matches it 
    //remains as the only visible marker.
    searchForMarker: function()
    {
      model.inputValue = $("#pac-input").val(); // This value is refresh each time the imput value changes.

      for(var marker in model.markersData)
      {
        if(model.markersData.length !== 0)
        {
          for(var y in model.markersData[marker]) 
          {
            model.markersData[marker][y].inf.close();// close all map marker's infoWindows.
            if(model.markersData[marker][y].title == model.inputValue)
              {
                model.currentMarker = model.markersData[marker][y];
                model.currentMarker.setMap(map);
                model.currentMarker.inf.open(map,model.markersData[marker][y]);
              }
            if(model.markersData[marker][y].title.toUpperCase().indexOf(model.inputValue.toUpperCase())!= -1)
              {
                model.enterKeyMarkers = [];
                model.currentMarker = model.markersData[marker][y];
                model.currentMarker.setMap(map);
                model.enterKeyMarkers.push(model.markersData[marker][y]);
              }
            else{model.markersData[marker][y].setMap(null);}
          }
        }
      }
    },

    // Sets an infowindow and its content for each marker on medel.
    setInfoWindow:function(marker)
    {
      var infowindow = new google.maps.InfoWindow({
        content:"<div><div style='float:left;'>" +
        "<span style='font-size:18px;font-weight:bold;'>" + marker.title +"</span><hr>" +
        ""+marker.artic[2][0]+", <br>" +
        "<a href='http://en.wikipedia.org/wiki/"+marker.title+"' "   +
        "style='text-decoration:none;color:#cccccc;font-size:10px;'> Wikipedia</a>" +
        "</div><div style='float:right; padding:5px;'><img src='" +
        marker.picUrl+"'>" + "</img></div></div>"
      });
      return infowindow;
    },

    initialize:function() {
      //Maps controls are accessible after map is loaded. Search box is added here.
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(model.input);
    }, 

    //This function start basic data to run the app.
    start:function()
    {
      //This listener shows the actual search result for markers 
      //if the enter key is pressed. The result for the input value
      // is stored as the current marker on the searchForMarker function.
      $( "#pac-input" ).keypress(function(data) 
      {
        if(data.charCode == 13 || data.keyCode == 13 && model.input !=="")
        {
          model.currentMarker.inf.close();
          model.currentMarker =model.enterKeyMarkers[0];
          model.currentMarker.inf.open(map,model.currentMarker);  
        } 
      });

      //Each time a value is type it search for a matches on markers to display only those markers.
      document.getElementById('pac-input').addEventListener('input', octopus.searchForMarker);

      //Makes wikipedia and flikcr ajax request and sets articles and pictures on markers base on its titles.
      //This loop is used to add an event listener to markers, this listeners open an infowindow for each marker
      //when clicked.
      for(var marker in model.markersData)
      {
        for(var y in model.markersData[marker])
        {
          if(model.markersData[marker][y].Wurl ==="" || model.markersData[marker][y].picUrl==="")
          {
            model.currentMarker = model.markersData[marker][y];

            //Add and set the wikipedia request url.
            model.markersData[marker][y].Wurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+model.currentMarker.title+'&format=json&callback=wikiCallback';
            (function(currentCopy)
              {
                $.ajax({
                  url: currentCopy.Wurl,
                  dataType:"jsonp",
                  success:function(response)
                  {
                    var setMarkerPic =function(data)
                    {
                      var base = data.photos.photo[0];
                      currentCopy.picUrl = "http://farm"+base.farm+".staticflickr.com/"+base.server+"/"+base.id+"_"+base.secret+"_q.jpg";
                      currentCopy.inf =octopus.setInfoWindow(currentCopy);
                    };
                    currentCopy.artic = response;
                    $.getJSON( "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1b42091b473fe9b06c5f4875ae9879d4&tags=santo_domingo&text="+currentCopy.title+"&per_page=1&format=json&jsoncallback=?",setMarkerPic );
                  },error:function(errorThrown)
                  {
                    console.log( "There was an " +errorThrown+ " please check your internet conection and try again." );
                  }
                });
                google.maps.event.addListener(currentCopy, 'click', function()
                  {
                    if(model.currentMarker !== "")
                      {
                        model.currentMarker.inf.close();
                      }
                    model.currentMarker = currentCopy;
                    model.currentMarker.inf.open(map,model.currentMarker);
                  });
            })(model.markersData[marker][y]);
          }
        }
      }
    }
  };


  octopus.initialize();
  octopus.start();
  $("#map-canvas").css("height", window.innerHeight-$( "#terco" ).outerHeight()); //Sets the zise to make the map fit.
  $(window).resize(function() //If the browser window is resized it makes the map canvas fit on it.
    {
      $("#map-canvas").css("height", window.innerHeight-$( "#terco" ).outerHeight());
    });
  Offline.options = {checks: {image: {url: location.href+'/favicon.ico'}, active: 'image'}}
}
google.maps.event.addDomListener(window, 'load', begingApp);
