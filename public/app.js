$(document).ready(function () {

  // initialize modal 
  $('.modal').modal();




  // click events
  $("button#scrape").on("click", function (event) {
    $.get("/api/scrape")
      .then((res) => {

        console.log(res);
        window.reload();
      }).catch(err => { console.log(err); })

  });

});