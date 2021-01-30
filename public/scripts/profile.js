console.log("profile.js")

$(function () {
  $("#saveButton").on("click", function (event) {
    // event.preventDefault();

    var newRecipe = {
      name: $("#recipeName")

        .val()
        .trim(),
      ingredient: $("#ingredients").val(),

      instruction: $("#instructions").val(),
    };

    $.ajax("/api/recipes", {
      type: "POST",
      data: newRecipe,
    }).then(function () {
      console.log("added a new recipe", newRecipe);
      location.reload();
    });
  });

  $(".updateButton").on("click", function (event) {
    // event.preventDefault();

    var id = $(this).data("recipeid");

    const ingredients = "IT UPDATED!";
    const instructions = "IT UPDATED!";
    const name = "IT UPDATED!";

    const recipeData = {
      id: id,
      ingredients: ingredients,
      instructions: instructions,
      name: name
    }

    $.ajax("/api/recipes/", {
      type: "PUT",
      data: recipeData
    }).then(function () {
      console.log("recipe has been updated");
      location.reload();
    });
  });

  $(".deleteButton").on("click", function (event) {
    // event.preventDefault();

    var id = $(this).data("recipeid");

    // console.log(id)

    $.ajax("/api/recipes/" + id, {
      type: "DELETE"
    }).then(function () {
      console.log("recipe has been deleted");
      location.reload();
    });
  });
});


