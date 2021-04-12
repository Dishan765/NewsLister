
/*GET VALUE STORED IN LOCAL STORAGE */
inputElementValue = localStorage.getItem('name');
cards = JSON.parse(localStorage.getItem('cards'))

// SET RESULT TITLE
document.querySelector("#resultTitle").innerHTML = "Results for " + inputElementValue;

// NO ARTICLES FOR THE SEARCH TEX
if (cards === null || cards.length <=0) {

    document.querySelector(".resultList").innerHTML = "<div style = 'text-align:center;'>No results found</div>";
    divNode = document.createElement("div");
    divNode.style.textAlign = "center";
    divNode.innerHTML = "<a class = 'home' href = '/index.html'>Go back to Home Page</a>";
    //divNode.appendChild(textNode);
    document.querySelector(".resultList").appendChild(divNode);
}
else {
    //DISPLAY 10 ARTICLES PER PAGE
    let articlesPerPage = 5;
    $('#pagination-demo').twbsPagination({
        totalPages:Math.round(cards.length/articlesPerPage),
        visiblePages: 6,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            document.querySelector(".resultList").innerHTML ="";
            var grandTotal = articlesPerPage*page;

            for(var i = grandTotal-articlesPerPage;i<grandTotal;i++){
                document.querySelector(".resultList").innerHTML += cards[i];
            }

        }
    });
}

