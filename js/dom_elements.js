var Node = {
    leftButton: document.getElementById('left-button'),

    rightButton: document.getElementById('right-button'),

    searchField: document.forms[0]['search'],

    pageNumber: document.getElementById('page-number'),

    lastPage: document.getElementById('last-page'),

    section: document.getElementsByTagName('section')[0],

    totalNumber: document.getElementsByClassName('total-number')[0],

    gameList: document.getElementById("game-list"),

    lastListItem: document.getElementsByTagName("UL")[0].lastChild,

    textDataClass: document.getElementsByClassName("text-data"),

    gameName: document.getElementsByClassName("game-name"),

    gameLink: document.getElementsByTagName('H1'),

    lastListItem: document.getElementsByTagName("UL")[0]
}
