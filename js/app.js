"use strict"

     var map,
          infoWindow;

     var availableGalleries = [
          {
            title: 'Anno Domini', 
            location: {lat: 37.3307, lng: -121.886},
            img: "img/AnnoDomini.png",
            address: "366 S 1st St",
            phone: "(408) 271-5155",
            web: "http://www.galleryad.com/"
          },
          {
            title: 'Kaleid Gallery', 
            location: {lat: 37.336506, lng: -121.886143},
            img: "img/Kaleid.png",
            address: "88 S 4th St",
            phone: "(408) 271-5151",
            web: "http://www.kaleidgallery.com",
          },
          {
            title: 'Art Object', 
            location: {lat: 37.348799, lng: -121.893726},
            img: "img/ArtObject.png",
            address: "592 N 5th St",
            phone: "(408) 288-9305",
            web: "http://www.artobjectgallery.com",
          },
          {
            title: 'Works', 
            location: {lat: 37.329155, lng: -121.888096},
            img: "img/works.png",
            address: "365 S Market St",
            phone: "(408) 300-6405",
            web: "http://www.workssanjose.org",
          },
          {
            title: 'Higher Fire Clayspace & Gallery', 
            location: {lat: 37.328162, lng: -121.885733},
            img: "img/HigherFire.png",
            address: "499 S Market St",
            phone: "(408) 295-5765",
            web: "http://www.higherfirestudios.com",
          },
          {
            title: 'Aperture Academy', 
            location: {lat: 37.378754, lng: -121.921401},
            img: "img/ApertureAcademy.png",
            address: "2290 N. 1st Street",
            phone: "(408) 369-8585",
            web: "http://www.apertureacademy.com",
          }
    ];




function initMap() {

       map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.338208, lng: -121.886329},
        zoom: 15
      });

      infoWindow = new google.maps.InfoWindow();

    //create markers
    for (var i = 0; i < availableGalleries.length; i++) {
          var position = availableGalleries[i].location;
          var title = availableGalleries[i].title;
          var address = availableGalleries[i].address;
          var phone = availableGalleries[i].phone;
          var web = availableGalleries[i].web;
          var img = availableGalleries[i].img;
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            address: address,
            phone: phone,
            web: web,
            img: img,
            animation: google.maps.Animation.DROP,
            info: availableGalleries[i].infoWindow,
            img: availableGalleries[i].img,
          });
          availableGalleries[i].markerObject = marker;
          marker.addListener('click', function() {
            popInfoWindow(this, infoWindow);
          });
      }
 };   

  

    //creat infoWindow
    function popInfoWindow(marker, infoWindow) {

      var marker = marker;
      var wikiUrl =  'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
      var wikiRequestTimeout = setTimeout(function() {
            alert("Failed to get wikipedia resources");
        },8000);

      $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        // ajax settings
            success: function (response) {
                var wikiStr = response[0];
                var url = 'http://en.wikipedia.org/wiki/' + wikiStr;

                if (infoWindow.marker != marker) {
                  infoWindow.marker = marker;
                  marker.addListener('click', toggleBounce(marker));
                  infoWindow.setContent("<div><img src='"+marker.img+"'/><br /></div><div class='info-title'>"+marker.title+"</div><br /><p class='address'>"+marker.address+"<br />"+marker.phone+"<br />Wiki Page:<br /><a href='"+url+"'>"+url+"</a></p>");
                  infoWindow.open(map, marker);
                  infoWindow.addListener("closeclick", function() {
                  //infoWindow.setMarker(null);
                  });
                }
                clearTimeout(wikiRequestTimeout);
            }
        });
    }

//Got from https://developers.google.com/maps/documentation/javascript/examples/marker-animations
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 750);
        }
      }




var AppViewModel = function() {

    var self = this;

    self.availableGalleries = ko.observable(availableGalleries);


    //click on gallery to display marker
    self.clickGallery = function(availableGalleries) {
      map.setZoom (18);
      map.setCenter(availableGalleries.location);

      popInfoWindow(availableGalleries.markerObject, infoWindow);
    };


    self.query = ko.observable('');
    self.search = ko.computed(function() {
        // Got lines 51-53 from https://discussions.udacity.com/t/search-function-implemetation/15105/33
         return ko.utils.arrayFilter(self.availableGalleries(), function(gallery) {
              return gallery.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
        });
      });
};

//error to handle Google failure
var googleFailure = function() {
    alert('Could not load Google Map. Try again later');
};


// Activates knockout.js
ko.applyBindings(new AppViewModel());
