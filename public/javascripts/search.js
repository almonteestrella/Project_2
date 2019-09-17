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

          //always open popup window below the search options
          marker.addEventListener("click", function(e) {
            L.popup({
              autoPanPaddingTopLeft: [0, 200],
              offset: [0, -23]
            })
              .setLatLng(this.getLatLng())
              .setContent(items[key].cat + "<br>" + items[key].name)
              .openOn(mymap);
          });
        }
      });
    }
  });
});
