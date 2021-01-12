// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto


let app = new Vue({
    el: '#app',
    data:{
        film: "",
        risultati:"",
    },

    methods:{
        cerca(){
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=fbebf38b6276068d6e0065d2377875c0&query=ritorno+al+futuro")
            .then(response =>{
                //verifico lo stato della risposta
                //console.log(response);
                //console.log(response.data.results);
                this.risultati = response.data.results
            });
        }
    }
});