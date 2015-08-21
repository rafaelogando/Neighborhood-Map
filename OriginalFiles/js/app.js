function begingApp()
{
  'use strict';

  //Create google map element and set its parameters.
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    {
      center: {lat: 18.668407, lng: -69.811627},
      zoom: 10,
      disableDefaultUI: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        ]
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT
      }
    });

  //Refresh the map when the user get back to it from the gallery.
  $(".backButton").click(function(){
  google.maps.event.trigger(map, "resize");
  });


 var centerControlDiv = document.createElement('div');

  // Create the gallery button 
  var controlUI = document.createElement('div');
  controlUI.className ="col-xs-12 controls";
  controlUI.innerHTML = 'Gallery';
  centerControlDiv.appendChild(controlUI);
  
  //When this button is clicked it hides the search box and shows the back button
  google.maps.event.addDomListener(controlUI, 'click', function() {
    $(".windy-demo").toggle();$("#pac-input").toggle();
    $("#map-canvas").toggle();$("button").toggle();
    google.maps.event.trigger(map, "resize");
    console.log("boon");
  });


  centerControlDiv.index = 1;

  //Add the button gallery to the bottom left side of the map
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);

 //Add the search box to the top left side of the map
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);




  //Used to store and access app data.
  var model = 
  {
    mapOptions:
    {
      center:{ lat: 18.45, lng: -69.94},
      zoom: 15,
      zoomControl: true,
    },

    markersData:
    [
    {
      marker: new google.maps.Marker({
      position: { lat: 18.492394, lng: -69.951457},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Jardin Botanico',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/parks.png",
      galeryContent:ko.observable(),
      }) 
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.452031, lng: -69.607208},  
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Boca Chica',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/swimming.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.755277, lng: -69.637012}, 
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Bayaguana',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/trail.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.810778, lng: -69.789840},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Monte Plata',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/parks.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.810778, lng: -69.72},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Monte Verde',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/parks.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.486187, lng: -69.910560},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Villa Juana',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/cycling.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.425486, lng: -69.425703},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Juan Dolio',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/swimming.png",
      galeryContent:ko.observable()
      })
    },

    {
      marker: new google.maps.Marker({
      position: { lat: 18.672388, lng: -70.171802},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Villa Altagracia',
      picUrl: ko.observable(""),
      Wurl:"",
      artic:ko.observable({}),
      icon:"http://maps.google.com/mapfiles/kml/shapes/mountains.png",
      galeryContent:ko.observable()
      })
    },
    ],

    currentMarker: "",

    enterKeyMarkers:[],
  };


  ko.applyBindings(model);

  var octopus =
  {
    closeInfo: function()
    {
      for(var marker in model.markersData)
      {
        for(var y in model.markersData[marker])
        {
          if (model.markersData[marker][y].getAnimation() !== null)
          {
             model.markersData[marker][y].setAnimation(null);
          }
        }
      }
    },

    //Looks trhough all modal markets titles and if the input search value matches it 
    //remains as the only visible marker.
    searchForMarker: function()
    {
      // This value is refreshed each time the imput value changes.
      model.inputValue = $("#pac-input").val(); 


      for(var marker in model.markersData)
      {
        
          for(var y in model.markersData[marker])
          {
            if(typeof model.inputValue === "string")
            {
              model.markersData[marker][y].inf.close();// close map marker's infoWindow.
              if (model.currentMarker.getAnimation() !== null) {
                model.currentMarker.setAnimation(null);
              }
              if(model.markersData[marker][y].title == model.inputValue)
              {
                alert("keep dancing babe");
                model.currentMarker = model.markersData[marker][y];
                model.currentMarker.setMap(map);

                //Make the search box loss focus to allow mobile devices to hide 
                //keyboard and have more espace to show the infowindow.
                $("#pac-input").blur();

                //wait while the list and mobiele keyboard closes to have more room. 
                setTimeout(function()
                  {
                    model.currentMarker.inf.open(map,model.currentMarker);
                    model.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
                  },300); 
               
              }
              
              //Save the matches in an array and make them visibles in the map
              if(model.markersData[marker][y].title.toUpperCase().slice(0,model.inputValue.length).indexOf(model.inputValue.toUpperCase())!= -1)
              {
                model.enterKeyMarkers = [];
                model.currentMarker = model.markersData[marker][y];
                model.currentMarker.setMap(map);
                model.enterKeyMarkers.push(model.markersData[marker][y]);
              }
              else{model.markersData[marker][y].setMap(null);} //If a marker doesnt match it is removed here.
            }
          }
        
      }
    },

    //Load and set all markers and gallery data. Flickr pictures, 
    //wikipedia articles and infowindows are set here.
    SetInfoContent: function(current)
    {
      (function(currentCopy)
      {
        //Wikipedia ajax request
        $.ajax(
        {
          url: currentCopy.Wurl,
          dataType:"jsonp",

          success:function(response)
          {

            //Set the pic url to the marker, its infowindow 
            //content and the each gallery element
            var setMarker =function(data)
            {
              var base = data.photos.photo[0];

              //Set the marker and gallery pic url
              currentCopy.picUrl( 
                "http://farm"+base.farm+".staticflickr.com/"+
                base.server+"/"+base.id+"_"+base.secret+"_m.jpg");

              //Sets the infowindow content
              currentCopy.inf =octopus.setInfoWindow(currentCopy);
              google.maps.event.addListener(currentCopy.inf,'closeclick',function(){
                octopus.closeInfo();
        });

              //Sets the gallery content
              currentCopy.galeryContent(
                '<div class="landscape"><p>Testing landscape</p></div>'+
                '<div class="portraid"><p>Testing Portraid</p></div>');     
            };
            currentCopy.artic(response[2][0]);

            //Flickr pic url request
            $.getJSON(
             "https://api.flickr.com/services/rest/?method=flickr.photos"+
             ".search&api_key=1b42091b473fe9b06c5f4875ae9879d4&tags=santo"+
             "_domingo&text="+currentCopy.title+"&per_page=1&format="+
             "json&jsoncallback=?",setMarker );
          },

          error:function(errorThrown)
            {
              console.log( "There was an " +errorThrown+ " please check your internet conection and try again." );
            }
        });

        google.maps.event.addListener(currentCopy, 'click', function()
        {

          if(model.currentMarker !== "" && typeof(model.currentMarker.inf) !== "undefined")
          {
            model.currentMarker.inf.close();
            octopus.closeInfo();
          }
          model.currentMarker = currentCopy;
          $("#pac-input").blur();

          //wait while the list closes to have enough space to fully
          // open the infowindow and prevent try to open an infowindow
          // before it even exist.
          if(typeof(model.currentMarker.inf) !== "undefined") 
          {
            model.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
              model.currentMarker.inf.open(map,model.currentMarker);
               
            },300);
          }
          
        });
        
      })(current);
    },

    // Sets an infowindow and its content for each marker on medel.
    setInfoWindow:function(marker)
    {
      var infowindow = new google.maps.InfoWindow({
      content:
      "<div><div style='float:left;'><span style='font-size:"+
      "18px;font-weight:bold;'>" + marker.title +"</span><hr>" +
      ""+marker.artic()+", <br><a href='http://en.wikipedia.org/"+
      "wiki/"+marker.title+"'style='text-decoration:none;color:"+
      "#cccccc;font-size:10px;'> Wikipedia</a></div><div style="+
      "'float:right; padding:5px;'><img src='" + marker.picUrl()+
      "'>" + "</img></div></div>"
      });
      return infowindow;
    },

    //Set the max length of an string to a given number of characters.
    truncateText:function(selector, maxLength)
    {
      var truncated = selector;
      if (truncated.length > maxLength)
      {
        truncated = truncated.substr(0,maxLength) + '...';
      }
      return truncated;
    }, 

    //This function start basic data to run the app.
    start:function()
    {
      //Check if the enter key has been pressed and 
      //open an infowindow base on the results from
      //searchForMarker function.
      $( "#pac-input").keypress(function(data) 
      {

        if(data.charCode == 13 || data.keyCode == 13 && model.input !=="")
        {
          $("#pac-input").blur();
          model.currentMarker.inf.close();
          model.currentMarker =model.enterKeyMarkers[0];
          //wait while the list closes to have enough space to fully
          // open the infowindow.
          model.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){model.currentMarker.inf.open(map,model.currentMarker);},300); 
        } 
      });

      //Each time a value is type it search for a matches on markers
      // to display only those markers.
      document.getElementById('pac-input').addEventListener('input', octopus.searchForMarker);

      //Makes wikipedia and flikcr ajax request and sets articles and 
      //pictures on markers base on its titles.  This loop is used to
      // add an event listener to markers, this listeners open an 
      //infowindow for each marker when clicked.
      
      for(var marker in model.markersData)
      {
        if(model.markersData.length > 0)
        {
          for(var y in model.markersData[marker])
          {
            if(model.markersData[marker][y].Wurl ==="" || model.markersData[marker][y].picUrl()==="")
            {
              model.currentMarker = model.markersData[marker][y];

              //Wikipedia info and flickr images are requested and added
              //to markers infoWindow here. Also marker click event it set.
              model.markersData[marker][y].Wurl =
              'http://en.wikipedia.org/w/api.php?action=opensearch&search='+
              model.currentMarker.title+'&format=json&callback=wikiCallback';
              octopus.SetInfoContent(model.markersData[marker][y]);
            }
          }
        }      
      }
    }
  };


  
  octopus.start(); 
}

//EventlListeners here

google.maps.event.addDomListener(window, 'load', begingApp);

//Sets the zise to make the map fit.
$("li").css("height", window.innerHeight-$("#terco").height()-$(".windy-demo h2").height()-40); 
$("#map-canvas").css("height", window.innerHeight);

  //If the browser window is resized it makes the
  // map canvas fit on it.
  $(window).resize(function() 
    {
      $("li").css("height", window.innerHeight-$("#terco").height()-$(".windy-demo h2").height()-40);
      $("#map-canvas").css("height", window.innerHeight);
      $("#map-canvas").css("width", $(window).width()-1);
    });

//Check for current orientation when the
//app first start and set the screen size.
window.addEventListener("load",function()
{

  $("#map-canvas").css("height", window.innerHeight);
  $("#map-canvas").css("width", $(window).width()-1);
  if (window.matchMedia("(orientation: portrait)").matches) 
  {
    $(".landscape").hide();
    $(".portraid").show();
  }// you're in PORTRAIT mode

  else if (window.matchMedia("(orientation: landscape)").matches)
  {
    $(".landscape").show();
    $(".portraid").hide();
  }// you're in LANDSCAPE mode
});

//Check for orientation when app is runing.
//Hides and shows classes base on orientation
//to meke the best controls distribution on the
//screen acoording to the available space and 
//control shape and size.

window.addEventListener("orientationchange", function() 
{
  
 // Shows or hide element base on orientation.
 if (window.matchMedia("(orientation: portrait)").matches)
  {
    $(".landscape").show();
    $(".portraid").hide();
  }

  else if (window.matchMedia("(orientation: landscape)").matches)
  {
    $(".landscape").hide();
    $(".portraid").show();
  }
 
},false);
