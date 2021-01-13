// Milestone 3:
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png


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
                    element = Math.ceil((element.vote_average)/2);
                    //console.log(element);
                    this.voto.push(element);
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

    

