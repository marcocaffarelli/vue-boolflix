// Milestone 5 (Opzionale):
// Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno
// parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti
// dall’API con Nome e Cognome, e i generi associati al film con questo schema:
// “Genere 1, Genere 2, …”.


let app = new Vue({
    el: '#app',
    data:{
        film: "",
        risultati:"",
        voto:[],
        risultatiSerie:"",
        votoSerie:[],
    },

    mounted(){
        
    },

    methods:{
        cerca(){
            //concatenando il link con this.film posso cercare il film che scrivo nell'input
            axios.get(("https://api.themoviedb.org/3/search/movie?api_key=fbebf38b6276068d6e0065d2377875c0&query=") + (this.film))
            .then(response =>{
                //verifico lo stato della risposta
                //console.log(response);
                //console.log(response.data.results);
                this.risultati = response.data.results
                this.risultati.forEach(element => {
                    elemento = Math.ceil((element.vote_average)/2);
                    //console.log(element);
                    this.voto.push(elemento);
                    //invoco la funzione cast e la salvo in una variabile
                    const nomiAttori = this.cast(element.id)
                    //attraverso il vue set aggiungo una proprietà all'oggetto
                    Vue.set(element, 'attori', nomiAttori)
                });
                //console.log(Math.ceil((this.risultati[0].vote_average)/2));
            });

             //concatenando il link con this.film posso cercare il film che scrivo nell'input
             axios.get(("https://api.themoviedb.org/3/search/tv?api_key=fbebf38b6276068d6e0065d2377875c0&query=") + (this.film))
             .then(response =>{
                 //verifico lo stato della risposta
                 //console.log(response);
                 //console.log(response.data.results);
                 this.risultatiSerie = response.data.results
                 this.risultatiSerie.forEach(element => {
                     elemento = Math.ceil((element.vote_average)/2);
                     //console.log(element);
                     this.votoSerie.push(element);
                     //invoco la funzione cast e la salvo in una variabile
                    const nomiAttori = this.cast(element.id)
                    //attraverso il vue set aggiungo una proprietà all'oggetto
                    Vue.set(element, 'attori', nomiAttori)
                    });
                    //console.log(Math.ceil((this.risultati[0].vote_average)/2));
 
             });

             
        },
        
       /** ## funzione cast 
        * 
        * Questa funzione fa una chiamata ajax per trovare il cast tramite Id
        * @param {number}filmId passare alla funzione l'Id del film
        * return array
        * 
        * */ 
            cast(filmId){
            let attori = [];
            let attoriPrincipali= [];
            axios.get(("https://api.themoviedb.org/3/movie/") + (filmId) + ("/credits?api_key=fbebf38b6276068d6e0065d2377875c0"))
            .then(response =>{
                //verifico lo stato della risposta
                //console.log(response);
                const cast=(response.data.cast);
                //console.log(cast);
                cast.forEach(element => {
                attori.push(element.name) 
                });
                //console.log(attori);
                //Attraverso un ciclo for inserisco nell'array attoriPrincipali i primi 5 attori del cast
                for (let index = 0; index < 5; index++) {
                    attoriPrincipali.push(attori[index]);
                }
                
                
            })
            .catch(error=>{
                console.log(error);
            })
            //console.log(attoriPrincipali);
            return attoriPrincipali;
       
        }
        
    }
});

    

