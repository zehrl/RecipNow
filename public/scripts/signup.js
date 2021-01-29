console.log("signup.js")
$(function () {

  // User submits search query
  $("#search-result").on("submit", function (event) {
    event.preventDefault();

    console.log("Starting query.")

    // const recipeSearch = {
    //   name: $("#search-result")
    //     .val()
    //     .trim(),
    //   ingredient: $("#ingredients").val(),
    //   instruction: $("#instructions"),
    // };

    const recipeSearch = $("#search-result").val().trim()

    const query = `?ingredient=${recipeSearch}`

    $.ajax("/search" + query, {
      type: "GET"
      // data: newRecipe,
    }).then(function () {
      console.log("Searching...");
      // location.reload();
    });
  });

  // $("#updateButton").on("click", function (event) {
  //   event.preventDefault();

  //   var id = $(this).data("id");

  //   $.ajax("/api/recipes/", {
  //     type: "PUT",
  //     data: id
  //   }).then(function () {
  //     console.log("recipe has been updated");
  //     location.reload();
  //   });
  // });

  // $("#deleteButton").on("click", function (event) {
  //   event.preventDefault();

  //   var id = $(this).data("id");

  //   $.ajax("/api/recipes/" + id, {
  //     type: "DELETE",
  //   }).then(function () {
  //     console.log("recipe has been deleted");
  //     location.reload();
  //   });
  // });
});