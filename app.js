import { DecisionTree } from "./decisiontree.js"
import { VegaTree } from "./vegatree.js"

let predictButton = document.querySelector("#predict")
let glucose = document.querySelector("#glucose")
let bp = document.querySelector("#bloodpressure")
let skin = document.querySelector("#skin")
let insulin = document.querySelector("#insulin")
let bmi = document.querySelector("#bmi")
let pedigree = document.querySelector("#pedigree")
let age = document.querySelector("#age")
let pregnant = document.querySelector("#pregnant")
let result = document.querySelector("#result")

function loadSavedModel() {
     fetch("./model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)
    let visual = new VegaTree('#view',1800, 1000, decisionTree.toJSON())
    predictButton.addEventListener("click", () => predict(decisionTree))
}

function predict(decisionTree) {
    let features = {
        Glucose: glucose.value,
        Bp: bp.value,
        Skin: skin.value,
        Insulin: insulin.value,
        bmi: bmi.value,
        Pedigree: pedigree.value,
        Age: age.value,
        Pregnant: pregnant.value
    }
    let prediction = decisionTree.predict(features)
    console.log(prediction)
    if(prediction == 1) {
        result.innerHTML = "I predict that you have diabetes" }
    else {  result.innerHTML = "I predict that you do not have diabetes" }
}

loadSavedModel()
