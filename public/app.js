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
        window.reload();
      }).catch(err => { console.log(err); })

  });


  $("button.addNote").on("click", function (event) {


    const articleId = $(this).val();
    const $noteTitle = $(`input#noteTitle${articleId}`);
    const $noteContent = $(`input#noteContent${articleId}`);

    const noteTitle = $noteTitle.val().trim();
    const noteContent = $noteContent.val().trim();

    console.log(`Note Title: ${noteTitle}`);
    console.log(`Note Content: ${noteContent}`);
    if (!noteTitle || !noteContent) {
      console.log("nothing here folks!")
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

        }).catch(err => { console.log(err); })


    }


  });

});