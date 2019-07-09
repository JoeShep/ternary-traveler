import { getPlaces, addPOI, displayPOIs } from "./pois.js"

function POIForm() {
  let formContainer = document.createElement("div")
  // form markup
  formContainer.innerHTML = `
    <h2>Add a new point of interest</h2>
    <input type="text" id="poi-form-name" placeholder="POI name">
    <input type="text" id="poi-form-desc" placeholder="POI description">
    <input type="text" id="poi-form-cost" placeholder="cost: x.xx">
  `
  // Add the dropdown populated with place data to the form
  let select = document.createElement("select")
  select.id = "poi-form-place"
  getPlaces()
  .then( places => {
    places.forEach( place => {
      select.innerHTML += `<option value=place-${place.id}>${place.name}</select>`
    })
  })
  // Add a save btn to the form
  let saveBtn = document.createElement("button")
  saveBtn.addEventListener("click", createPOI)
  saveBtn.textContent = "save"
  formContainer.appendChild(select)
  formContainer.appendChild(saveBtn)
  return formContainer
}

function createPOI() {
  const name = document.querySelector("#poi-form-name").value
  const description = document.querySelector("#poi-form-desc").value
  const cost = document.querySelector("#poi-form-cost").value
  const placeId = parseInt(document.querySelector("#poi-form-place").value.split("-")[1])
  const newPOI = {
    name, description, cost, placeId
  }
  addPOI(newPOI)
  .then(displayPOIs)
}

export {POIForm}
