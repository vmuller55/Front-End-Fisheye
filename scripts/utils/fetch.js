async function getPhotographers() {
    
    const dataLocation = './data/photographers.json';
    console.log("fetch")
    return fetch (dataLocation)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
    })
    .then(response => {
        return ([ 
            {photographers : [...response.photographers]},
            {media: [...response.media]}
        ])
    })
    .catch(err => console.log("erreur sur le fetch json", err));
}