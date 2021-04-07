//KEY:
//75a888f103934e49b5658d00f5a3240d
//localStorage.clear();

const APIkey = "33e74bdaa2d3071adcc35ef05c5c31e0"

var form = document.querySelector(".searchForm");

form.addEventListener("submit", retrieve_articles);

function retrieve_articles(e) {
    e.preventDefault();
    inputElementValue = form.searchBox.value;
    //alert(inputElementValue);

    var url = "http://api.mediastack.com/v1/news?access_key=" + APIkey + "&keywords=" + inputElementValue + "&languages = en&countries=au,us,gb,in,nz";
    console.log(url)
    let cards = [];

    $.ajax({
        url: 'http://api.mediastack.com/v1/news',
        data: {
          access_key: APIkey,
          languages: 'en',
          countries: 'au,us,gb,in,nz',
          keywords: inputElementValue,
          limit: 50,
          offset: 10,
        }
      }).done(function(data) {
        articles = data.data;
        
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
                '                    <a href = "'+articles[i].url+'" target="_"><img src="'+image_url+'" alt="news" width="200" height="200"/></a>' +
                '                </div>' +
                '                <div class="card-body">' +
                '                    <a href = "'+articles[i].url+'" target="_"><p class="card-text">'+articles[i].title+'</p></a>' +
                '                    <a href = "'+articles[i].url+'" target="_"><small class="text-muted">'+inputElementValue+'</small></a>' +
                '                </div>' +
                '                ' +
                '            </div>' +
                '        </div>';




            cards.push(output);
        }
        
        // Remove old data
        localStorage.removeItem('cards');
        localStorage.removeItem('name')
        
        // Store in local storage
        localStorage.setItem("cards", JSON.stringify(cards));
        localStorage.setItem("name", inputElementValue);
        
        // Wait for data to be saved before redirecting
        setTimeout(function () {
            location.replace('/result.html');
        }, 0);

    });
}

stopwords = ['a','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

function remove_stopwords(str) {
    res = []
    str = str.toLowerCase();
    str = str.replace(/[^\w\s]|_/g, "")
    words = str.split(' ');
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean);
       }
    }
    res = res.join(' ')
    x = Array.from(new Set(res.split(' ')));
    return x;
}  