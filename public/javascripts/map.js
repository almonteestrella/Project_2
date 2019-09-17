//normal tile setting

//var mymap = L.map('mapid', { zoomControl: false }).setView([43.706635, -79.388750], 12);

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  
//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//maxZoom: 18,
//id: 'mapbox.streets',
//accessToken: 'pk.eyJ1IjoiY2lubmFtb21lIiwiYSI6ImNrMGZxbTQ5ZjAyNzQzaXM4am90Mjg0NWkifQ.hbdP4yMD7PFsKvw-PRzVuA'
//}).addTo(mymap);

//leaflet setup
let popup = "";
const layer = new L.StamenTileLayer("toner");  
const mymap = new L.Map("mapid", {
  center: new L.LatLng(43.706635, -79.413750),
  zoom: 12,
  zoomControl: false
});
mymap.addLayer(layer);

//set zoom controller to bottom right
L.control.zoom({ position: 'bottomright' }).addTo(mymap);


//icons
var IconOne = L.icon({
  iconUrl: '/images/pink.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon pink'
});

var IconTwo = L.icon({
  iconUrl: '/images/blue.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon blue'
});

var IconThree = L.icon({
  iconUrl: '/images/purple.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon purple'
});

var IconFour = L.icon({
  iconUrl: '/images/light blue.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon light-blue'
});

var IconFive = L.icon({
  iconUrl: '/images/orange.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon orange'
});

var IconSix = L.icon({
  iconUrl: '/images/red.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon red'
});

var IconSeven = L.icon({
  iconUrl: '/images/green.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon green'
});

var IconEight = L.icon({
  iconUrl: '/images/yellow.png',
  iconSize: [18, 30], 
  iconAnchor: [9, 30], 
  className: 'bicon yellow'
});


function switchCatego(nameCatego) {
  let icon = ''
  if (nameCatego === 'Aesthetics') {
    icon = IconOne
  } else if (nameCatego === 'Barbering & Hairdressing') {
    icon = IconTwo
  } else if (nameCatego === 'Body Piercing') {
    icon = IconThree
  } else if (nameCatego === 'Ear Piercing') {
    icon = IconFour
  } else if (nameCatego === 'Electrolysis') {
    icon = IconFive
  } else if (nameCatego === 'Micropigmentation') {
    icon = IconSix
  } else if (nameCatego === 'Nails') {
    icon = IconSeven
  } else if (nameCatego === 'Tattooing') {
    icon = IconEight
  }
  return icon
}


function addToMap(category) {

  category = category || ''

  //get category and name 
  $.get("/api/db/" + category, function () {
  })
    .done(function (data) {
      let items = jQuery.parseJSON(data)

      for(let key in items){
        iconresult = switchCatego(items[key].cat)
        let latlng = L.latLng(items[key].lat, items[key].lon); 

        //add marker to the map
        let marker = L.marker(latlng, { icon: iconresult }).addTo(mymap);
        
        marker.addEventListener("click", function (e) {

          let markerClicked = this;
          let date = "";
          let infraction = "";
          let status = "";
          let content = "";
            
          //get inspection history
          $.get("/api/review/" + items[key].name, function () {
          })
            .done(function (data)  {
              date = jQuery.parseJSON(data)[0].date.slice(0, 10);
              status = jQuery.parseJSON(data)[0].status;
              infraction = jQuery.parseJSON(data)[0].infraction;
              if( infraction === null) {
                infraction = "No infraction!";
              }
              content = `<div class="cat">${items[key].cat}</div>
              <div class="name">${items[key].name}</div>
              <div class="status">${status}</div>
              <div>${date}<br>${infraction}</div>`;
            })
              .then(function() {

                //define popup window 
                popup = L.popup({
                  autoPanPaddingTopLeft: [0, 200],    //open popup window below the search options
                  offset: [0, -23],   //adjust the distance from the marker
                  maxWidth: 270
                })
                  .setLatLng(markerClicked.getLatLng())
                  .setContent(content)
                  .openOn(mymap);
                });
        });
      }

    });
}


function showMarkers(input, img, category) {

  $(input).change("click", function () {
  
    let catAlreadyPulled = [];

    if ($(this).is(':checked')) {

      if (!catAlreadyPulled.includes(category)) {
        addToMap(category);
        catAlreadyPulled.push(category);
      } else {
        $(img).show();
      }

    } else {
      $(img).hide();
      popup.remove();
    }
    
  });
}

showMarkers('input[id=aesthetics]', '.pink', 'Aesthetics');
showMarkers('input[id=barbering]', '.blue', 'Barbering & Hairdressing');
showMarkers('input[id=bodyPiercing]', '.purple', 'Body Piercing');
showMarkers('input[id=earPiercing]', '.light-blue', 'Ear Piercing');
showMarkers('input[id=electrolysis]', '.orange', 'Electrolysis');
showMarkers('input[id=micropigmentation]', '.red', 'Micropigmentation');
showMarkers('input[id=nails]', '.green', 'Nails');
showMarkers('input[id=tattooing]', '.yellow', 'Tattooing');
