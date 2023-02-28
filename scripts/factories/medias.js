function photographerHeaderFactory (target, data) {
    target.innerHTML = `
        <div>
            <h2 class="test">${data.name}</h2>
            <h3>${data.city} ${data.country}</h3>
            <p>${data.tagline}</p>
            <p class="price">${data.price}€/jour</p>
        </div>
        <div id="bloc-contact">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div id="bloc-picture">
            <img src="assets/photographers/${data.portrait}" alt="photo de ${data.name}">
        </div>
    `
}