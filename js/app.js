"use strict"

     var map;

     var markers = [];

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

      var infoWindow = new google.maps.InfoWindow();

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
          markers.push(marker);
          marker.addListener('click', function() {
            popInfoWindow(this, infoWindow);
          });
      }

    availableGalleries.marker = function() {
      var self = this;
      this.markers;
    }

    //creat infoWindow
    function popInfoWindow(marker, infoWindow) {
        if (infoWindow.marker != marker) {
          infoWindow.marker = marker;
          infoWindow.setContent("<div><img src='"+marker.img+"'/><br /></div><div class='info-title'>"+marker.title+"</div><br /><p class='address'>"+marker.address+"<br />"+marker.phone+"<br /><a href='"+marker.web+"'>"+marker.web+"</a></p>");
          infoWindow.open(map, marker);
          infoWindow.addListener("closeclick", function() {
          infoWindow.setMarker(null);
          });
        }
    }
};



var AppViewModel = function() {

    var self = this;

    // self.availableGalleries = ko.observable(availableGalleries);
    // self.value = ko.observable('');

    availableGalleries.forEach(function(gallery) {
        gallery.marker = markers;
    });


    //click on gallery to display marker
    self.clickGallery = function(availableGalleries) {
      map.setZoom (18);
      map.setCenter(availableGalleries.location);
    }


    // self.search = ko.computed(function() {
    //     // Got lines 51-53 from https://discussions.udacity.com/t/search-function-implemetation/15105/33
    //      return ko.utils.arrayFilter(self.availableGalleries(), function(place) {
    //      var match = place.title.toLowerCase().indexOf(self.value().toLowerCase()) >= 0;
    //      place.marker.setVisible(match);
    //      return match;
    //     });
    //   })

    // for (var i = 0; i < availableGalleries.length; i++) {
    //   availableGalleries[i].marker = createMarker(new google.maps.LatLng(availableGalleries[i].location));
    // }

};




// Activates knockout.js
ko.applyBindings(new AppViewModel());
