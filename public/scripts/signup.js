console.log("loading signup.js")
$(function () {

  // User submits search query
  $("#searchButton").on("click", function (event) {
    event.preventDefault();

    console.log("Starting query.")

    const recipeSearch = $("#search-result").val().trim()

    const query = `?ingredient=${recipeSearch}`

    // redirect to /search route with query text
    window.location.href = "/search" + query;

  });

});