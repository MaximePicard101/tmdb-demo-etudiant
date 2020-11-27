document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    connexion.requeteDernierFilm();

});





class MovieDB{

    constructor() {

        console.log("Constructeur");

        this.APIkey = "a6f50bd414fd0b68dede936f0cd5bfda";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/";

        this.totalFilm= 8;
    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=a6f50bd414fd0b68dede936f0cd5bfda&language=en-US&page=1");
        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourRequeteDernierFilm(e){

        console.log("retourDernierFilm");

        let target = e.currentTarget;
        let data;

       // console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);


        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
        }

    }
}