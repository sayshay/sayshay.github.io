//Variables
var responseAPI;
var url;
var pageNumber = 1;
var gameList = document.getElementsByClassName("gameList");
var pageCount;

function ajaxCall(argument) {
  //building URL
  argument = argument || '';
  var searchValue = document.forms[0]['search'].value;
  if(argument){
    url = argument;
    document.getElementById('page-number').innerHTML = pageNumber;
  }else{
    document.getElementById('page-number').innerHTML = 1;
    url = "https://api.twitch.tv/kraken/search/streams?q="+searchValue;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
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
    buildLiElement();
    appendDataTOLi(streams[i]);
  }
}
function buildLiElement(){
  var listItem = document.createElement("LI");
  document.getElementById("game-list").appendChild(listItem);
}
function appendDataTOLi(stream){
  // create Image
  var image = document.createElement('img');
  image.src = stream.preview.large;
  image.className = 'item-image';
  document.getElementsByTagName("UL")[0].lastChild.appendChild(image);

  //create div
  var block = document.createElement('div');
  block.className = 'text-data';
  document.getElementsByTagName("UL")[0].lastChild.appendChild(block);

  // create H1
  lastIndex = document.getElementsByClassName("text-data").length-1;
  var h1 = document.createElement('h1');
  document.getElementsByClassName("text-data")[lastIndex].appendChild(h1);

  //create Link
  var link = document.createElement('a');
  link.href = stream.channel.url;
  link.innerHTML = stream.channel.display_name;
  document.getElementsByTagName('H1')[lastIndex].appendChild(link);

  //create first paragraph
  var paragraph = document.createElement('p');
  paragraph.className = 'game-name';
  paragraph.innerHTML = stream.channel.game;
  document.getElementsByClassName("text-data")[lastIndex].appendChild(paragraph);

  //create span
  var span = document.createElement('span');
  span.innerHTML = "- " + stream.viewers + " viewers";
  document.getElementsByClassName("game-name")[lastIndex].appendChild(span);

  var br = document.createElement('br');
  document.getElementsByClassName('text-data')[lastIndex].appendChild(br);

  var description = document.createElement('p');
  description.innerHTML = stream.channel.status;
  document.getElementsByClassName('text-data')[lastIndex].appendChild(description);
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

