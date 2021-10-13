/**
 * 
 * @param {string} nom 
 * @param {Object} attributes 
 * @param {HTMLElement} parent 
 * @param {string} texte
 * @returns {HTMLElement}
 */
function createElement(nom, attributes, parent, texte) {
    const element = document.createElement(nom)

    // Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))

    for (const key in attributes) {
        console.log(key, attributes);
        element.setAttribute(key, attributes[key])
    }
    
    if (texte)
        element.innerText = texte

    parent.appendChild(element)

    return element
}



const canvas = createElement('canvas', { id: "xxx", class: 'zaer', width: 500, height: 500 }, document.body)
const buttonGenerate = createElement('button', { id: 'btnGenerate' }, document.body, "GENERATE")
const buttonSolve = createElement('button', { id: 'btnSolve' }, document.body, "SOLVE")
const ctx = canvas.getContext('2d')