/*API DETAILS */
const APIkey = "33e74bdaa2d3071adcc35ef05c5c31e0";
const URL = 'https://cors-anywhere.herokuapp.com/http://api.mediastack.com/v1/news';


/*GRAB SEARCH TEXT */
var form = document.getElementsByTagName("form")[0];
//var form = document.querySelector(".searchForm");
form.addEventListener("submit", retrieve_articles);

/* RETRIEVE ARTICLES FROM API */
function retrieve_articles(e) {
    var inputElementValue;

    e.preventDefault();// PREVENT DEFAULT POST METHOD
    inputElementValue = form.searchBox.value;// GET SEARCH TEXT

    $.ajax({
        url: URL,
        data: {
            access_key: APIkey,
            languages: 'en',
            countries: 'au,us,gb,nz',
            keywords: inputElementValue,
            limit: 50,
            offset: 0,
            sort:'popularity'
        }
    }).done(function (data) {
        articles = data.data;

        storeData(articles,inputElementValue);

    });
    
}

function storeData(articles,inputElementValue){
    let cards = [];
    for (i = 0; i < articles.length; i++) {
        image_url = "";
        tag = [];
        if (articles[i].image === null) {
            image_url = "error.jpg";
        }
        else {
            image_url = articles[i].image;
        }


        var output = '<div class="card">' +
            '            <div class="card-horizontal">' +
            '                <div class="img-square-wrapper">' +
            '                    <a href = "' + articles[i].url + '" target="_"><img src="' + image_url + '" alt="news" width="200" height="200"/></a>' +
            '                </div>' +
            '                <div class="card-body">' +
            '                    <a href = "' + articles[i].url + '" target="_"><p class="card-text">' + articles[i].title + '</p></a>' +
            '                    <a href = "' + articles[i].url + '" target="_"><small class="text-muted">' + inputElementValue + '</small></a>' +
            '                </div>' +
            '                ' +
            '            </div>' +
            '        </div>';




        cards.push(output);
    }

    // REMOVE OLD DATA IN LOCAL STORAGE
    localStorage.removeItem('cards');
    localStorage.removeItem('name')

    // STORE NEW DATA IN LOCAL STORAGE
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("name", inputElementValue);

    // WAIT FOR DATA BEFORE REDIRECTING
    setTimeout(function () {
        location.replace('/result.html');
    }, 0);
}