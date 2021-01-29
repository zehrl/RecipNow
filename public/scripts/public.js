$(function() {
  $(".saveButton").on("submit", function(event) {
    event.preventDefault();

    var newRecipe = {
      name: $("#recipename")
        .val()
        .trim(),
      ingredient: $("#ingredients").val(),
      instruction: $("#instructions"),
    };

    $.ajax("/api/recipes", {
      type: "POST",
      data: newRecipe,
    }).then(function() {
      console.log("added a new recipe", newRecipe);
      location.reload();
    });
  });






  $("#updateButton").on("click", function(event){
    event.preventDefault();

    var id = $(this).data("id");

    $.ajax("/api/recipes/" + id, {
      type: "PUT",
    }).then(function() {
      console.log("recipe has been updated");
      location.reload();
    });
  });








  $("#deleteButton").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");

    $.ajax("/api/recipes/" + id, {
      type: "DELETE",
    }).then(function() {
      console.log("recipe has been deleted");
      location.reload();
    });
  });
});


