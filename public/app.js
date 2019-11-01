$(document).ready(function () {

  // variables
  const $noteError = $("small.modalHelp");


  // initialize modal 
  $('.modal').modal();
  
  // initialize filter select
  $('.dropdown-trigger').dropdown();


  // CLICK EVENTS
  // scrape website click event 
  $("button#scrape").on("click", function (event) {
    $.get("/api/scrape", function (data) {
      console.log(data);
      location.reload(true);
    })

  });

  // clear articles click event 
  $("button#clear").on("click", function (event) {
    $.ajax({
      url: "api/articles",
      type: "DELETE"
    })
      .then((res) => {
        console.log(res);
        location.reload(true);
      }).catch(err => { console.log(err); })
  });


  // save article on click event 
  $("i.save").on("click", function (event) {

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

  $(".modal-close").on("click", function(event) {
    $noteError.fadeOut();
  });


  // add note click event 
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

  // delete note event
  $("i.delNote").on("click", function(event) {
    let $this = $(this);

    let noteId = $this.data("note-id");
    console.log(noteId);

    $.ajax({
      url: `api/notes/${noteId}`,
      type: "DELETE"
    }).then((data) => {

      $('.modal').modal('close');
      location.reload(true);

    }).catch((err) => { console.log(err); })
  });


  $("select#filter").on("change", function(event) {

    let $this = $(this);

    let filterVal = $this.val();



  })

});