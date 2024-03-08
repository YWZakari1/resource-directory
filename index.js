let createButton = document.getElementById("button")
let modalContainer = document.getElementById("modal-container")
let closeModalIcon = document.getElementById("close-modal-icon")
let form = document.getElementById("form")
let nameOfWebsite = document.getElementById("name-of-websites")
let linkOfWebsite = document.getElementById("link-of-websites")
let descriptionOfWebsite = document.getElementById("description-of-websites")
let myResourcesSection = document.getElementById("resources-section")

let resources = []


createButton.addEventListener("click", revealModalContainer)

function revealModalContainer(){
    if(modalContainer.classList.contains("modal-container")){
        modalContainer.classList.remove("modal-container")
        modalContainer.classList.add("modal-container-visible")
    }
}

closeModalIcon.addEventListener("click", hideModalContainer)
function hideModalContainer(){
    if(modalContainer.classList.contains("modal-container-visible")){
        modalContainer.classList.remove("modal-container-visible")
        modalContainer.classList.add("modal-container")
    }
} 

form.addEventListener("submit", collectAndSaveResource)
function collectAndSaveResource(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value
    let websiteLink = linkOfWebsite.value
    let websiteDescription = descriptionOfWebsite.value


    const resourceObject = {
        nameForWebsite : websiteName,
        linkForWebsite : websiteLink,
        descriptionForWebsite : websiteDescription
    }

    resources.push(resourceObject)
    localStorage.setItem("resources", JSON.stringify(resources))
    form.reset()
    hideModalContainer()
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resources")){
        resources = JSON.parse(localStorage.getItem("resources"))
    }
    showResourcesUI()
}
fetchResources()

function showResourcesUI(){
    myResourcesSection.innerHTML = " "
    resources.forEach(function(resourceObject, index){
        let theWebsiteName = resourceObject.nameForWebsite
        let theWebsiteLink = resourceObject.linkForWebsite
        let theWebsiteDescription = resourceObject.descriptionForWebsite

        let resourceDiv = document.createElement("div")
        resourceDiv.classList.add("resource")

        let nameofWebsiteAndDeleteIconDiv = document.createElement("div")
        nameofWebsiteAndDeleteIconDiv.classList.add("name-of-website-and-delete-icon")

        let nameOfWebsiteText = document.createElement("a")
        nameOfWebsiteText.setAttribute("href", `${theWebsiteLink}`)
        nameOfWebsiteText.textContent = theWebsiteName
        nameOfWebsiteText.setAttribute("target", "_blank")


        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa","fa-trash")
        deleteIcon.setAttribute("id","delete-icon")

        let descriptionForWebsiteDiv = document.createElement("div")
        descriptionForWebsiteDiv.classList.add("description-of-website-container")

        let descriptionText = document.createElement("p")
        descriptionText.classList.add("description-of-website-container")
        descriptionText.textContent = theWebsiteDescription

        //Appending Elements

        nameofWebsiteAndDeleteIconDiv.append(nameOfWebsiteText, deleteIcon)
        descriptionForWebsiteDiv.append(descriptionText)
        resourceDiv.append(nameofWebsiteAndDeleteIconDiv, descriptionForWebsiteDiv)
        myResourcesSection.append(resourceDiv)
    })
}

