/**
 * Fonction permettant de trier selon le choix fait par l'utilisateur
 * @param {Array} media 
 * @param {string} sort 
 * @returns Les médias triés
 */
function sortMedia(media, sort){
    if (sort === "date"){ 
       return media.sort((a, b) => new Date (a.date).valueOf() - new Date(b.date).valueOf())
   }
   else{
       if(sort === "name") {
           return media.sort((a, b) => {
               if (a.title > b.title) {
                   return 1
               } else if (b.title > a.title) {
                   return -1
               } else {
                   return 0
               }
           })
       }
       else {
           return media.sort((a, b) => b.likes - a.likes)
       }
   }  
}