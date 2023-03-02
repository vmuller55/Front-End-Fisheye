function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById('main');
    const banner = document.getElementById('banner');
    const logo = document.querySelector('.logo');
    const nameLocation = document.querySelector(".modal h2");
    const who = document.querySelector(".test");
    nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
	modal.style.display = "block";
    main.style.filter = "blur(5px)";
    banner.style.filter = 'blur(5px)';
    logo.style.filter = 'blur(5px)';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById('main');
    const banner = document.getElementById('banner');
    const logo = document.querySelector('.logo');
    modal.style.display = "none";
    main.style.filter = "none";
    banner.style.filter = 'none';
    logo.style.filter = 'none';
}


function setNameOnModal(target, data) {

}