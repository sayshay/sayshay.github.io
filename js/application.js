//Variables
var responseAPI;
var pageNumber = 1;
var pageCount;


function ajaxCall(argument) {
  argument = argument || '';
  var searchValue = Node.searchField.value;
  //building URL
  twitch_url = buildURL(argument, searchValue);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if( xhttp.readyState == 4 && xhttp.status == 200 ) {
          responseAPI = xhttp.responseText;
          responseAPI = JSON.parse(responseAPI);
          createList(responseAPI);
          setPagesCount(responseAPI);
          setNavButtonsAvailabity(responseAPI._links);
          Node.searchField.value = '';
      }
  };
  xhttp.open("GET", twitch_url, true);
  xhttp.send();
}

function buildURL(argument, searchValue){
  if(argument){
      Node.pageNumber.innerHTML = pageNumber;
      url = argument;
  }else{
      Node.pageNumber.innerHTML = 1;
      url = "https://api.twitch.tv/kraken/search/streams?q="+searchValue;
  }
  return url;
}

function setNavButtonsAvailabity(links){
    if(links.prev){
        Node.leftButton.disabled = false;
    }else{
        Node.leftButton.disabled = true;
    }
    if(links.next && pageNumber != pageCount){
        Node.rightButton.disabled = false;
    }else{
        Node.rightButton.disabled = true;
    }
}

function setPagesCount(responseAPI){
    pageCount = Math.ceil(responseAPI._total /10 );
    Node.lastPage.innerHTML = pageCount;
}


//Build List
function createList(responseAPI){
    Node.section.style.display = 'block';
    var streams = responseAPI.streams;
    Node.totalNumber.innerHTML = "Total results: " + responseAPI._total;
    document.getElementsByTagName('ul')[0].innerHTML = '';
    for (var i = 0; i < streams.length; i++) {
       appendNodes(streams[i], i);
    }
}

function appendNodes(stream, index){
    //creaet LI item
    Node.gameList.innerHTML += "<li></li>"
    // create Image
    Node.lastListItem.lastChild.innerHTML += ("<img src=\"" + stream.preview.large + "\"class='item-image'>");
    //create div
    Node.lastListItem.lastChild.innerHTML += "<div class=\"text-data\"></div>"
    // create H1
    Node.textDataClass[index].innerHTML += '<h1></h1>'
    //create Link
    Node.gameLink[index].innerHTML += ("<a href=\""+stream.channel.url+"\">"+stream.channel.display_name+"</a>");
    //create first paragraph
    Node.textDataClass[index].innerHTML += ("<p class='game-name'>" + stream.channel.game + "</p>");
    //create span
    Node.gameName[index].innerHTML += ("<span> - " + stream.viewers + " viewers</span><br>");
    //create description
    Node.textDataClass[index].innerHTML += ("<p>" + stream.channel.status + "</p>");
}


//Event Listeners
Node.rightButton.addEventListener("click", displayNext);
function displayNext(){
    pageNumber += 1;
    var next_url = responseAPI._links.next;
    ajaxCall(next_url);
}

Node.leftButton.addEventListener("click", displayPrev);
function displayPrev(){
    pageNumber -= 1;
    var prev_url = responseAPI._links.prev;
    ajaxCall(prev_url);
}

