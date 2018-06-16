function toggleClass(input, right) {
  if (right) {
    input.classList.remove("wrong");
    input.classList.add("right");
  } else {
    input.classList.remove("right");
    input.classList.add("wrong");
  }
}

function validate(element) {
  const pattern = /.+/;
  toggleClass(element, pattern.test(element.value));
}

function prepareButton(button, room) {
  button.classList.remove("btn-success");
  button.classList.add("btn-danger");
  button.querySelector("span").classList.remove("glyphicon-plus");
  button.querySelector("span").classList.add("glyphicon-minus");
  button.addEventListener("click",(event) => {
    event.preventDefault();
    removeDoseField(room + 1);
  })
}

function updateFields() {
  let i = 1;
  document.querySelectorAll(".row").forEach((element) => {
    if (i > 1) {
      element.id = `field_${i}`;
      prepareButton(element.querySelector(".btn"), i - 1);
    }
    i++;
  })
}

function validateField(input) {
  input.classList.remove("right");
  input.classList.remove("wrong");
  input.addEventListener("blur", (event) => {
    validate(event.target);
  });
}

function addDoseField()
{
  const room = document.querySelectorAll(".row").length;
  const fields = document.querySelector('.fields')
  const new_row = document.createElement("div");
  new_row.innerHTML = document.querySelectorAll('.row')[0].innerHTML;
  new_row.classList.add("row");
  new_row.id = `field_${room + 1}`
  new_row.querySelector("#cocktail_doses_attributes_0_description").setAttribute("name", `cocktail[doses_attributes][${room}][description]`);
  new_row.querySelector("#cocktail_doses_attributes_0_ingredient_id").setAttribute("name", `cocktail[doses_attributes][${room}][ingredient_id]`);
  const button = new_row.querySelector("#add_field");
  validateField(new_row.querySelector("input"))
  prepareButton(button, room);
  fields.appendChild(new_row);
}

function removeDoseField(rid)
{
  document.querySelector('#field_' + rid).remove();
}

document.querySelector("#add_field").addEventListener("click", (event) => {
  event.preventDefault();
  addDoseField();
})

document.querySelectorAll(".form-control").forEach((form) => {
  form.addEventListener("blur", (event) => {
    validate(event.target);
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  updateFields();
})

export { addDoseField };
