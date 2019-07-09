import { POIForm } from "./form.js"
import { displayPOIs } from "./pois.js"

const container = document.querySelector("#container")
const nav = document.querySelector("nav")

nav.appendChild(POIForm())
displayPOIs()

// TODO:
// Interest delete btn w/confirmation popup
