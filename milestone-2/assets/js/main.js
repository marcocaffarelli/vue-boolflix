// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)



let app = new Vue({
    el: '#app',
    data:{
        film: "",
        risultati:"",
        voto:[],
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
                for (let i = 0; 0 < this.risultati.length; i++) {
                    const element = Math.ceil((this.risultati[i].vote_average)/2);
                    console.log(element);
                    this.voto.push(element);
                }
                //console.log(Math.ceil((this.risultati[0].vote_average)/2));
            });
        },
   
    }
});