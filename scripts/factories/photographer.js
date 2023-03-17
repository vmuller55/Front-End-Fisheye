function photographerFactory(data) {
    /**
     * Récupération des infos sur les photographe
     */
    const { name, portrait, id, city, country, tagline, price} = data;
    /**
     * Permet de définir la source des images de portrait
     */
    const picture = `assets/photographers/${portrait}`;
    /**
     * Fonction qui génére le HTML relatif aux infos sur les photographes
     * @returns 
     */
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        const h5 = document.createElement('p');
        h5.textContent = price + "€/jour";
        const a = document.createElement('a');
        a.href='photographer.html?id=' + id;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
