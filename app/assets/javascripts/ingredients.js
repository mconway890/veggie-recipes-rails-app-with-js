$(function(){
  // on submit of new ingredient form
  $("#new_ingredient").on("submit", function(event) {
    $.ajax({
      type: "POST",
      url: this.action, // action triggered - form element
      data: $(this).serialize(), // serializes form data
      success: function(resp) {
        // on success update DOM with resp in the form of data
        let ingredient = new Ingredient(resp);
        ingredient.renderIngredients();
      }
    })
    //default action of the event will not be triggered.
    event.preventDefault();
  })
  $("#reverse").on("click", function(event) {
    // loads data from the server using a HTTP GET request
    $.get('/ingredients' + '.json', function(data) {
      // data.reverse();
      data.sort(function(a, b){
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      })
      let ingredientsDiv = $("#ingredient_list");
        // set div in DOM to variable
        ingredientsDiv.empty();
        // empty div before appending
        $.each (data, function(i, ingredient){
          // append html
          ingredientsDiv.append(
            `<div>
              <ul>
                <li><a href="/ingredients/${ingredient.id}">${ingredient.name}</a></li>
              </ul>
            </div>`
          )
        })
    })
    event.preventDefault();
  })
  $(".ing").on("click", function(event) {
    //debugger;
    let i = $(this).data('id')
    $.get('/ingredients/' + i + '.json', function(data){
      let recipeDiv = $(".ingredient-recipes");
      recipeDiv.empty();
      data.recipes.forEach(function(recipe){

        recipeDiv.append(
          `<div>
            <ul>
              <li>${recipe.name}</li>
            </ul>
          </div>`
        )
      })
    })
  })
})

// ES6 class syntax
class Ingredient{
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  renderIngredients(){
    let html = "";
    html +=
    `<ul>
      <li id='ingredient-${this.id}'><a href='/ingredients/${this.id}'">${this.name}</a></li>
    </ul>`;
    $("#ingredient_list").append(html);
  }
};
