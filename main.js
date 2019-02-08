'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let searchHeader = document.getElementById('header');
    let searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        getCard(text => {
            searchHeader.innerHTML = text;
        });
    });
});
function getCard(){
    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4){
            let responseJSON = xhr.response;
            if(xhr.status>=200&&xhr.status<300){
                let responseObj = JSON.parse(responseJSON);
                document.getElementById("header").innerHTML="<img src="+responseObj.image_uris.normal+">";
            }
        }
    }
    xhr.open("GET", "https://api.scryfall.com/cards/named?exact=lightningbolt", true);
    xhr.send();
}