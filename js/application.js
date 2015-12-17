//Variables
var responseAPI;
var url;
var pageNumber = 1;
var gameList = document.getElementsByClassName("gameList");
var pageCount;

function ajaxCall(argument) {
  argument = argument || '';
  var searchValue = document.forms[0]['search'].value;
  //building URL
  if(argument){
      document.getElementById('page-number').innerHTML = pageNumber;
      url = argument;
  }else{
      document.getElementById('page-number').innerHTML = 1;
      url = "https://api.twitch.tv/kraken/search/streams?q="+searchValue;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if( xhttp.readyState == 4 && xhttp.status == 200 ) {
          responseAPI = xhttp.responseText;
          responseAPI = JSON.parse(responseAPI);
          createList(responseAPI);
          setPagesCount(responseAPI);
          setNavButtonsAvailabity(responseAPI._links);
          document.getElementById('search-field').value = '';
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function setNavButtonsAvailabity(links){
    if(links.prev){
        document.getElementById('left-button').disabled = false;
    }else{
        document.getElementById('left-button').disabled = true;
    }
    if(links.next && pageNumber != pageCount){
        document.getElementById('right-button').disabled = false;
    }else{
        document.getElementById('right-button').disabled = true;
    }
}

function setPagesCount(responseAPI){
    pageCount = Math.ceil(responseAPI._total /10 );
    document.getElementById('last-page').innerHTML = pageCount;
}


//Build List
function createList(responseAPI){
    document.getElementsByTagName('section')[0].style.display = 'block';
    var streams = responseAPI.streams;
    document.getElementsByClassName('total-number')[0].innerHTML = "Total results: " + responseAPI._total;
    document.getElementsByTagName('ul')[0].innerHTML = '';
    for (var i = 0; i < streams.length; i++) {
       appendNodes(streams[i], i);
    }
}

function appendNodes(stream, index){
    //creaet LI item
    document.getElementById("game-list").innerHTML += "<li></li>"
    // create Image
    document.getElementsByTagName("UL")[0].lastChild.innerHTML += ("<img src=\"" + stream.preview.large + "\"class='item-image'>");
    //create div
    document.getElementsByTagName("UL")[0].lastChild.innerHTML += "<div class=\"text-data\"></div>"
    // create H1
    document.getElementsByClassName("text-data")[index].innerHTML += '<h1></h1>'
    //create Link
    document.getElementsByTagName('H1')[index].innerHTML += ("<a href=\""+stream.channel.url+"\">"+stream.channel.display_name+"</a>");
    //create first paragraph
    document.getElementsByClassName("text-data")[index].innerHTML += ("<p class='game-name'>" + stream.channel.game + "</p>");
    //create span
    document.getElementsByClassName("game-name")[index].innerHTML += ("<span> - " + stream.viewers + " viewers</span><br>");
    //create description
    document.getElementsByClassName('text-data')[index].innerHTML += ("<p>" + stream.channel.status + "</p>");
}


//Event Listeners
document.getElementById("right-button").addEventListener("click", displayNext);
function displayNext(){
    pageNumber += 1;
    var next_url = responseAPI._links.next;
    ajaxCall(next_url);
}

document.getElementById("left-button").addEventListener("click", displayPrev);
function displayPrev(){
    pageNumber -= 1;
    var prev_url = responseAPI._links.prev;
    ajaxCall(prev_url);
}

