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

                    //creo una variabile in cui salvo i generi
                    const generi = element.genre_ids
                    //console.log(generi);
               
                    //utilizzando map sotituisco i valori numeri in stringhe contenenti il genere
                    const newGeneri = generi.map((numero, index, array) => {
                    //console.log(index);
                    if(numero == '28') {
                        return 'Action';
                    }else if(numero == "12"){
                        return 'Adventure'
                    }else if(numero == "16"){
                        return 'Animation'
                    }else if(numero == "35"){
                        return 'Comedy'
                    }else if(numero == "80"){
                        return 'Crime'
                    }else if(numero == "99"){
                        return 'Documentary'
                    }else if(numero == "18"){
                        return 'Drama'
                    }else if(numero == "10751"){
                        return 'Family'
                    }else if(numero == "14"){
                        return 'Fantasy'
                    }else if(numero == "36"){
                        return 'History'
                    }else if(numero == "27"){
                        return 'Horror'
                    }else if(numero == "10402"){
                        return 'Music'
                    }else if(numero == "9648"){
                        return 'Mystery'
                    }else if(numero == "10749"){
                        return 'Romance'
                    }else if(numero == "878"){
                        return 'Science Fiction'
                    }else if(numero == "10770"){
                        return 'TV Movie'
                    }else if(numero == "53"){
                        return 'Thriller'
                    }else if(numero == "10752"){
                        return 'War'
                    }else if(numero == "37"){
                        return 'Western'
                    }
                    return numero;
                    });
                    // aggiungo la proprietà generi all'oggetto
                    Vue.set(element, 'generi', newGeneri)
                    
                });
            
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
                     this.votoSerie.push(elemento);
                     //invoco la funzione cast e la salvo in una variabile
                    const nomiAttori = this.cast(element.id)
                    //attraverso il vue set aggiungo una proprietà all'oggetto
                    Vue.set(element, 'attori', nomiAttori)

                    //creo una variabile in cui salvo i generi
                    const generi = element.genre_ids
                    //console.log(generi);
               
                    //utilizzando map sotituisco i valori numeri in stringhe contenenti il genere
                    const newGeneri = generi.map((numero, index, array) => {
                    //console.log(index);
                    if(numero == '10759') {
                        return 'Action & Adventure';
                    }else if(numero == "16"){
                        return 'Animation'
                    }else if(numero == "35"){
                        return 'Comedy'
                    }else if(numero == "80"){
                        return 'Crime'
                    }else if(numero == "99"){
                        return 'Documentary'
                    }else if(numero == "18"){
                        return 'Drama'
                    }else if(numero == "10751"){
                        return 'Family'
                    }else if(numero == "10762"){
                        return 'Kids'
                    }else if(numero == "9648"){
                        return 'Mystery'
                    }else if(numero == "10763"){
                        return 'News'
                    }else if(numero == "10764"){
                        return 'Reality'
                    }else if(numero == "10765"){
                        return 'Sci-Fi & Fantasy'
                    }else if(numero == "10766"){
                        return 'Soap'
                    }else if(numero == "10767"){
                        return 'Talk'
                    }else if(numero == "10768"){
                        return 'War & Politics'
                    }else if(numero == "37"){
                        return 'Western'
                    }
                    return numero;
                    });
                    // aggiungo la proprietà generi all'oggetto
                    Vue.set(element, 'generi', newGeneri)
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
       
        },
        
        //Utilizzata la chiamata axios per trovare i numeri associati al genere
        // genre(){
        //     axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=fbebf38b6276068d6e0065d2377875c0&language=en-US")
        //     .then(response =>{
        //         //verifico lo stato della risposta
        //         //console.log(response);
        //         let listGeneri = (response.data)
        //         //console.log(listGeneri);
        //         return listGeneri;      
        //     })
        // }

        //Utilizzata la chiamata axios per trovare i numeri associati al genere
        // genreSerie(){
        //     axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=fbebf38b6276068d6e0065d2377875c0&language=en-US")
        //     .then(response =>{
        //         //verifico lo stato della risposta
        //         //console.log(response);
        //         let listGeneri = (response.data)
        //         //console.log(listGeneri);
        //         return listGeneri;      
        //     })
        // }
    }
});

    

