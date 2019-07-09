// API
const url = "http://localhost:8088"
function getPOIs() {
  return fetch(`${url}/interests?_expand=place`)
  .then( poiData => poiData.json())
}

function addPOI(poi) {
  return fetch(`${url}/interests`, {
    method: "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(poi)
  })
  .then( poiData => poiData.json())
}

function updatePOI(poi) {
  return fetch(`${url}/interests/${poi.id}`, {
    method: "PUT",
    "headers": {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(poi)
  })
}

function getPOI(id) {
  return fetch(`${url}/interests/${id}`)
  .then( interest => interest.json())
}

function getPlaces() {
  return fetch(`${url}/places`)
  .then( interestData => interestData.json())
}

// component
function makePOIComponent(poi) {
  return `
      <div id=poi-${poi.id}>
        <h3>${poi.name}${poi.place ? ": located in " + poi.place.name : ""}</h3>
        <p>${poi.description}</p>
        <h4 class=cost-${poi.id}>cost (in €) : ${poi.cost || "coming soon!"} </h4>
        <h4 class="cost-${poi.id} is-hidden">cost: <input type="text" name="cost" id=cost-edit-${poi.id} value=${poi.cost}></h4>
        <p class=review-${poi.id}>
          Review: ${poi.review || "coming soon!"}
        </p>
        <p class="review-${poi.id} is-hidden">
          Review: <textarea name="review" id=review-edit-${poi.id}>${poi.review}</textarea>
        </p>
        <button id=editPOI-${poi.id}>edit</button>
        <button class="is-hidden" id=save-editPOI-${poi.id}>save</button>
      </div>
    `
}

function updatePOIState(poi) {
  const cost = document.querySelector(`#cost-edit-${poi.id}`)
  const review = document.querySelector(`#review-edit-${poi.id}`)
  if (cost.value !== "") {
    poi.cost = cost.value
  }
  if (review.value !== "") {
    poi.review = review.value
  }
  return poi
}

// DOM
function poiList(pois) {
  let poiListContainer = document.createElement("div")
  poiListContainer.innerHTML = "<h1>My POIs</h1>"
  let poiList = document.createElement("ul")
  pois.forEach( poi => poiList.innerHTML += `<li>${makePOIComponent(poi)}</li>`)
  poiListContainer.appendChild(poiList)
  poiListContainer.addEventListener("click", handleEditBtn)
  return poiListContainer
}

// listener(s) callback function(s)
function handleEditBtn(event) {
  let clickedElId = event.target.id
  if (!clickedElId.includes("editPOI")) {
    return
  } else if (clickedElId.includes("save")) {
    console.log("saving changes")
    getPOI(clickedElId.split("-")[2])
    .then( poi => {
      return updatePOI(updatePOIState(poi))
    })
    .then(displayPOIs)
  } else {
    let editBtn = event.target
    // change the edit button's text from "edit" to "cancel" or vice versa
    editBtn.textContent = editBtn.textContent === "cancel" ? "edit" : "cancel"
    let poiEditId = editBtn.id
    showOrHidePOIEdit(poiEditId.split("-")[1])
  }
}

function showOrHidePOIEdit(id) {
  let costEls = document.querySelectorAll(`.cost-${id}`)
  let reviewEls = document.querySelectorAll(`.review-${id}`)
  Array.from(costEls).forEach( el => { console.log(el); el.classList.toggle("is-hidden")})
  Array.from(reviewEls).forEach( el => el.classList.toggle("is-hidden"))
  document.querySelector(`#save-editPOI-${id}`).classList.toggle("is-hidden")
}

// one function to rule, er, display, them all
function displayPOIs() {
  getPOIs()
  .then( pois => { container.innerHTML = ""; container.appendChild(poiList(pois)) })
}


export {displayPOIs, addPOI, getPlaces}
