
inputElementValue = localStorage.getItem('name');
cards = JSON.parse(localStorage.getItem('cards'))

document.querySelector("#resultTitle").innerHTML = "Results for " + inputElementValue;

if (cards === null || cards.length <=0) {

    document.querySelector(".resultList").innerHTML = "<div style = 'text-align:center;'>No results found</div>";
    divNode = document.createElement("div");
    divNode.style.textAlign = "center";
    divNode.innerHTML = "<a class = 'home' href = '/index.html'>Go back to Home Page</a>";
    //divNode.appendChild(textNode);
    document.querySelector(".resultList").appendChild(divNode);
}
else {
    // for (i = 0; i < cards.length; i++) {
    //     document.querySelector(".resultList").innerHTML += cards[i];
    // }

    $('#pagination-demo').twbsPagination({
        totalPages:Math.round(cards.length/10),
        visiblePages: 6,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            document.querySelector(".resultList").innerHTML ="";
            var grandTotal = 10*page;

            for(var i = grandTotal-10;i<grandTotal;i++){
                document.querySelector(".resultList").innerHTML += cards[i];
            }
            // //fetch content and render here
            // $('.resultList').text();
        }
    });
}

// $('#pagination-demo').twbsPagination({
//     totalPages:Math.round(cards.length/10),
//     visiblePages: 6,
//     next: 'Next',
//     prev: 'Prev',
//     onPageClick: function (event, page) {
//         //fetch content and render here
//         $('.resultList').text('Page ' + page) + ' content here';
//     }
// });
