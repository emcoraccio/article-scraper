$(document).ready(function () {

  // variables
  const $noteError = $("small.modalHelp");


  // initialize modal 
  $('.modal').modal();


  // click events
  $("button#scrape").on("click", function (event) {
    $.get("/api/scrape")
      .then((res) => {

        console.log(res);
        location.reload(true);
      }).catch(err => { console.log(err); })

  });

  $("button#clear").on("click", function(event) {
    $.ajax({
      url: "api/articles",
      type: "DELETE"
    })
    .then((res) => {
      console.log(res);
      location.reload(true);
    }).catch(err => { console.log(err); })
  });


  $("i.save").on("click", function(event) {

    const $this = $(this);
    const articleId = $this.data("art-id");

    let articleLocked = $this.data("locked");

    articleLocked = (articleLocked === false) ? true : false; 

    $.ajax({
      url: `api/articles/${articleId}`,
      type: "PUT",
      data: {
        lock: articleLocked,
      }
    }).then((article) => {

      $this.data("locked", articleLocked);
      location.reload(true);
    })

  });


  $("button.addNote").on("click", function (event) {

    const articleId = $(this).val();
    const $noteTitle = $(`input#noteTitle${articleId}`);
    const $noteContent = $(`input#noteContent${articleId}`);

    const noteTitle = $noteTitle.val().trim();
    const noteContent = $noteContent.val().trim();

    if (!noteTitle || !noteContent) {
      $noteError.fadeIn();
    }
    else {
      $noteError.fadeOut();

      $.post(`api/articles/${articleId}`, {
        title: noteTitle,
        body: noteContent
      })
        .then((res) => {
          
          $noteTitle.val("");
          $noteContent.val("");
          $('.modal').modal('close');
          location.reload(true);

        }).catch(err => { console.log(err); })

    }

  });

});