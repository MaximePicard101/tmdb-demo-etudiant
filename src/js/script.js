document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();


    if(document.location.pathname.search("fiche-film.html") > 0){
        let params = (new URL(document.location)).searchParams;
        connexion.requeteInfoFilm(params.get("id"));

    }else{

        connexion.requeteDernierFilm();

    }


});





class MovieDB{

    constructor() {

        console.log("Constructeur");

        this.APIkey = "a6f50bd414fd0b68dede936f0cd5bfda";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3/";

        this.imgPath = "https://image.tmdb.org/t/p/";



        this.totalFilm= 8;
    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=a6f50bd414fd0b68dede936f0cd5bfda&language=en-US&page=1");
        requete.open("GET", this.baseURL + "movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

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
        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);


            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML= data[i].title;

            unArticle.querySelector("p.description").innerHTML= data[i].overview || "Pas de description  pour le moment";


            let src = this.imgPath + "w185" + data[i].poster_path;

            console.log(src);

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            unArticle.querySelector("img").innerSRC = data[i].poster_path;

            unArticle.querySelector("a").setAttribute("href","fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);


        }

    }

    requeteInfoFilm(movieId){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=a6f50bd414fd0b68dede936f0cd5bfda&language=en-US&page=1");
        requete.open("GET", this.baseURL + "movie/" + movieId +"?api_key=" + this.APIkey + "&language=" + this.lang );

        requete.send();
    }

    retourRequeteInfoFilm(e){

       // console.log("retourDernierFilm");

        let target = e.currentTarget;
        let data;

        console.log(target.responseText);

        data = JSON.parse(target.responseText);

       // console.log(data);


        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){

        document.querySelector("h1").innerHTML= data.title;
        document.querySelector("p.description").innerHTML= data.overview || "Pas de description  pour le moment";
        document.querySelector("p.revenus").innerHTML= data.revenue ;

        /*let uneImage = document.querySelector("img");
        let src = this.imgPath + "w185" + data.poster_path;
        uneImage.setAttribute("src", src);
        uneImage.setAttribute("alt", data.title);
        document.querySelector("img").innerSRC = data.poster_path;*/

        this.requeteActeur(data.id);





        /*for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);


            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML= data[i].title;

            unArticle.querySelector("p.description").innerHTML= data[i].overview || "Pas de description  pour le moment";


            let src = this.imgPath + "w185" + data[i].poster_path;

            console.log(src);

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            unArticle.querySelector("img").innerSRC = data[i].poster_path;

            unArticle.querySelector("a").setAttribute("href","fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);*/


        }

        //ca va reprendre un clone pour creer plusieurs div dans un swipper
        requeteActeur(movieId){
        //"movie/" + movieId + getCredits
        }

        requeteRequeteActeur(e){

        }

        AfficheActeur(data){

        }

}