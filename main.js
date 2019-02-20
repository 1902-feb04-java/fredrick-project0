'use strict';
let finishedSearchTag, similarSearchTag;
let resultCount = 0;
document.addEventListener('DOMContentLoaded', () => {
    if(window.location.href==="file:///C:/revature/projectOne/home.html"){
        finishedSearchTag='';
        let count = 0;
        let searchButton = document.getElementById('search-button');
        let resetButton = document.getElementById('reset-button');
        searchButton.addEventListener('click', () => {
            localStorage.setItem("searchTag", finishedSearchTag);
            window.location = "searchResults.html";
        });
        resetButton.addEventListener('click', () => {
            finishedSearchTag = '';
            document.getElementById("name-filters").innerHTML = '';
            document.getElementById("exp-filters").innerHTML = '';
            document.getElementById("color-filters").innerHTML = '';
            document.getElementById("type-filters").innerHTML = '';
            document.getElementById("subtype-filters").innerHTML = '';
            document.getElementById("cmc-filters").innerHTML = '';
            document.getElementById("power-filters").innerHTML = '';
            document.getElementById("toughness-filters").innerHTML = '';
        });
        document.getElementById("name-button").addEventListener("click", () => {
            let nameText = document.getElementById('name-text').value;
            nameText = nameText.replace(' ', '');
            if(count===0){
                finishedSearchTag=nameText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+"+nameText;}
            document.getElementById("name-filters").innerHTML = document.getElementById("name-filters").innerHTML+"+name="+nameText;
        });
        document.getElementById("expansion-button").addEventListener('click', () => {
            let expansionOption = document.getElementById("expansion-field").value;
            if(count===0){
                finishedSearchTag="set:"+expansionOption;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+set:"+expansionOption;}
            document.getElementById("exp-filters").innerHTML = document.getElementById("exp-filters").innerHTML+"+set="+expansionOption;
        });
        document.getElementById("colors-button").addEventListener('click', () => {
            let colorText = document.getElementById("color-fields").value;
            colorText=colorText.replace(' ', '');
            if(count===0){
                finishedSearchTag="color:"+colorText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+"+"color:"+colorText;}
            document.getElementById("color-filters").innerHTML = document.getElementById("color-filters").innerHTML+"+color="+colorText;
        });
        document.getElementById("type-button").addEventListener('click', () => {
            let typeText = document.getElementById("type-fields").value;
            typeText=typeText.replace(' ', '');
            if(count===0){
                finishedSearchTag="type:"+typeText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+type:"+typeText;}
            document.getElementById("type-filters").innerHTML = document.getElementById("type-filters").innerHTML+"+type="+typeText;
        });
        document.getElementById("subtype-button").addEventListener('click', () => {
            let subtypeText = document.getElementById("subType-fields").value;
            subtypeText=subtypeText.replace(' ', '');
            if(count===0){
                finishedSearchTag="type:"+subtypeText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+type:"+subtypeText;}
            document.getElementById("subtype-filters").innerHTML = document.getElementById("subtype-filters").innerHTML+"+subtype="+subtypeText;
        });
        document.getElementById("cmc-button").addEventListener('click', () => {
            let cmcText = document.getElementById("cmc-fields").value;
            cmcText=cmcText.replace(' ', '');
            if(count===0){
                finishedSearchTag="cmc="+cmcText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+cmc="+cmcText;}
            document.getElementById("cmc-filters").innerHTML = document.getElementById("cmc-filters").innerHTML+"+cmc="+cmcText;
        });
        document.getElementById("power-button").addEventListener('click', () => {
            let powerText = document.getElementById("power-fields").value;
            powerText=powerText.replace(' ', '');
            if(count===0){
                finishedSearchTag="pow="+powerText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+pow="+powerText;}
            document.getElementById("power-filters").innerHTML = document.getElementById("power-filters").innerHTML+"+pow="+powerText;
        });
        document.getElementById("toughness-button").addEventListener('click', () => {
            let toughText = document.getElementById("toughness-fields").value;
            toughText=toughText.replace(' ', '');
            if(count===0){
                finishedSearchTag="tou="+toughText;
                count++;
            }else{finishedSearchTag=finishedSearchTag+"+tou="+toughText;}
            document.getElementById("toughness-filters").innerHTML = document.getElementById("toughness-filters").innerHTML+"+tou="+toughText;
        });
    }else{
        finishedSearchTag = localStorage.getItem("searchTag");
        getCards();
        document.getElementById("back").addEventListener('click', () => {
            window.location = "home.html";
        });
        document.getElementById("previous").addEventListener('click', () => {
            if(resultCount!==0){
                resultCount=resultCount-8;
                getCards();
            }
        });
        document.getElementById("next").addEventListener('click', () => {
            resultCount=resultCount+8;
            getCards();
        });
    }
});
function getCards(){
    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4){
            let responseJSON = xhr.response;
            if(xhr.status>=200&&xhr.status<300){
                let responseObj = JSON.parse(responseJSON);
                document.getElementById("img1").innerHTML="<img src="+responseObj.data[0+resultCount].image_uris.normal+">";
                document.getElementById("img2").innerHTML="<img src="+responseObj.data[1+resultCount].image_uris.normal+">";
                document.getElementById("img3").innerHTML="<img src="+responseObj.data[2+resultCount].image_uris.normal+">";
                document.getElementById("img4").innerHTML="<img src="+responseObj.data[3+resultCount].image_uris.normal+">";
                document.getElementById("img5").innerHTML="<img src="+responseObj.data[4+resultCount].image_uris.normal+">";
                document.getElementById("img6").innerHTML="<img src="+responseObj.data[5+resultCount].image_uris.normal+">";
                document.getElementById("img7").innerHTML="<img src="+responseObj.data[6+resultCount].image_uris.normal+">";
                document.getElementById("img8").innerHTML="<img src="+responseObj.data[7+resultCount].image_uris.normal+">";
            }
        }
    }
    xhr.open("GET", "https://api.scryfall.com/cards/search?q="+finishedSearchTag, true);
    xhr.send();
}