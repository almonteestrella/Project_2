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
            .done(function(data) {
              let items_2 = jQuery.parseJSON(data);
              let status = (log = "");
            
              items_2.forEach(element => {
                if (element.cat === `${items[key].cat}`) {
                  console.log(element);
                  status = element.status;
                  log +=
                    element.date.slice(0, 10) +
                    ' | <span class="' +
                    element.status.toLowerCase() +
                    '">' +
                    element.status.toLowerCase() +
                    "</span> | " +
                    (element.infraction ? element.infraction : "👍") +
                    "<br>";
                }
              });
              content = `<div class="cat">${items[key].cat}</div>
                <div class="name">${items[key].name}</div>
                <div class="status">${status}</div>
                <div>${log}</div>`;
              })
                .then(function() {

                  //define popup window 
                  popup = L.popup({
                    autoPanPaddingTopLeft: [0, 180],    //open popup window below the search options
                    offset: [0, -23],   //adjust the distance from the marker
                    maxWidth: 500,
                    maxHeight: 280
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
