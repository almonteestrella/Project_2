$(function() {
  $("#search-box").keyup(function() {
    $(".bicon").hide();

    let val = $("#search-box")
      .val()
      .trim();
      
    if (val !== "") {
      $.get("/api/s2/" + val, function() {}).done(function(data) {
        let items = jQuery.parseJSON(data);
        for (let key in items) {
          iconresult = switchCatego(items[key].cat);
          let latlng = L.latLng(items[key].lat, items[key].lon);
          let marker = L.marker(latlng, { icon: iconresult }).addTo(mymap);

          marker.addEventListener("click", function(e) {

            console.log(this);
            let markerClicked = this;
            let infraction = "";
            let status = "";
            let content = "";  

            //get inspection history
            $.get("/api/review/" + items[key].name, function () {
            })
              .done(function (data)  {
                let items_2 = jQuery.parseJSON(data);
                status = items_2[0].status;
                infraction = items_2[0].infraction;
                if( infraction === null) {
                  infraction = "No infraction!";
                }
                content = `<div class="cat">${items[key].cat}</div>
                <div class="name">${items[key].name}</div>
                <div class="status">${status}</div>
                <div>${infraction}</div>`;
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
  });
});
