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
            // console.log(this);
            let markerClicked = this;
            let content = "";

            //get inspection history
            $.get(
              "/api/review/" +
                items[key].cat +
                "/" +
                items[key].name +
                "/" +
                items[key].lat +
                "/" +
                items[key].lon,
              function() {}
            )
              .done(function(data) {
                let items_2 = jQuery.parseJSON(data);
                let status = reviewsText = log = "";

                status = items_2[0].status;
                if (typeof items_2[0].review !== "undefined") {
                  reviews = items_2[0].review.reviews;
                  reviewsText = "<ul>";
                  reviews.forEach(e => {
                    reviewsText += "<li>" + e.text + "</li>";
                  });
                  reviewsText += "</ul>";
                }

                if (typeof items_2[0].rating !== "undefined") {
                  status += " | Yelp Rating: " + items_2[0].rating + "/5";
                }
                items_2.forEach(element => {
                  
                    log +=
                      element.date.slice(0, 10) +
                      ' | <span class="' +
                      element.status.toLowerCase() +
                      '">' +
                      element.status.toLowerCase() +
                      "</span> | " +
                      (element.infraction ? element.infraction : "👍") +
                      "<br>";
                  
                });
                content = `<div class="cat">${items[key].cat}</div>
                <div class="name">${items[key].name}</div>
                <div class="status">${status}</div>
                <div>${log + reviewsText}</div>`;
              })
              .then(function() {
                //define popup window
                popup = L.popup({
                  autoPanPaddingTopLeft: [0, 200], //open popup window below the search options
                  offset: [0, -23], //adjust the distance from the marker
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
