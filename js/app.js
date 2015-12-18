//Variables
var responseAPI;
var pageNumber = 1;
var pageCount;


function getJSON(argument){  // Create a new script element
  //INIT
  argument = argument || '';
  var searchValue = Node.searchField.value;
  //building URL
  twitch_url = buildURL(argument, searchValue);

  //Create Script
  var script_element = document.createElement('script');
  script_element.type = 'text/javascript';
  // Set its source to the JSONP API
  script_element.src = twitch_url+"&callback=callbackJSONP";
  // Stick the script element in the page <head>
  document.getElementsByTagName('head')[0].appendChild(script_element);
}


function callbackJSONP (data) {
    // Build Page with the JSON response
    console.log(data);
    createList(data);
    setPagesCount(data);
    responseAPI  = data;
    setNavButtonsAvailabity(data._links);
    Node.searchField.value = '';
};


function buildURL(argument, searchValue){
    var url;
    if(argument){
        url = argument;
    }
    else{
        Node.pageNumber.innerHTML = 1;
        url = "https://api.twitch.tv/kraken/search/streams?q="+searchValue;
    }
    return url;
}


//Event Listeners
Node.rightButton.addEventListener("click", displayNext);
function displayNext(){
    pageNumber += 1;
    Node.pageNumber.innerHTML = pageNumber;
    var next_url = responseAPI._links.next;
    getJSON(next_url);
}

Node.leftButton.addEventListener("click", displayPrev);
function displayPrev(){
    pageNumber -= 1;
    Node.pageNumber.innerHTML = pageNumber;
    var prev_url = responseAPI._links.prev;
    getJSON(prev_url);
}
