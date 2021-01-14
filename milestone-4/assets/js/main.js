// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// ● Un header che contiene logo e search bar
// ● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)
// ● Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

let app = new Vue({
    el: '#app',
    data:{
        film: "",
        risultati:"",
        voto:[],
        risultatiSerie:"",
        votoSerie:[],
        attoriPrincipali:[],
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
                    //tramite la proprieta id trovo il cast del film
                    axios.get(("https://api.themoviedb.org/3/movie/") + (element.id) + ("/credits?api_key=fbebf38b6276068d6e0065d2377875c0"))
                        .then(response =>{
                            //verifico lo stato della risposta
                            //console.log(response);
                            const attori=(response.data.cast);
                            console.log(attori);
                        });
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
                     element = Math.ceil((element.vote_average)/2);
                     //console.log(element);
                     this.votoSerie.push(element);
                    });
                    //console.log(Math.ceil((this.risultati[0].vote_average)/2));
 
             });

             
        },
  
   
    }
});

    

