var motto = [
    "If you dream it, you can do it",
    "Hope is a waking dream",
    "I can, therefore I am",
    "Turn your wounds into wisdom",
    "Practice makes perfect",
    "Begin anywhere",
    "Make yourself proud",
    "The only journey is the one within",
    "When nothing goes right, go left",
    "Whatever you are, be a good one",
    "Never, never, never give up",
    "If not us, who? ",
    "If not now, when?",
    "Everything you can imagine is real",
    "Hope is a waking dream",
    "Live what you love",
    "A jug fills drop by drop",
    "The obstacle is the path",
    "The best revenge is massive success",
    "The best way out is always through",
    "Hope is the heartbeat of the soul",
    "We become what we think about",
    "Dream big and dare to fail",
    "Every moment is a fresh beginning",
    "Make each day your masterpiece",
    "We are what we think",
    "Live, Love, Laugh",
    "Anything is possible",
    "Let your dreams take flight",
    "You can and you will",
    "Keep Going",
    "Be Happy",
    "Think Positive"]

var txt = motto[Math.floor(Math.random() * motto.length)];

$('.intro').text(txt);
$('.mobile-intro').text(txt);

var searchDatas = [];

function searchData(title, url) {
    this.title = title;
    this.url = url;
}

function initSearch() {
    if ($(window).width() > 900) {
        var input = document.getElementById('search');
        var limit = 10;
    } else {
        var input = document.getElementById('mobile-search');
        var limit = 6;
    }
    if (searchDatas.length == 0) {
        input.placeholder = "Initializing...";
        input.blur();
        input.disabled = true;
        $.getJSON("/search.json", function (result) {
            $.each(result, function (i, field) {
                searchDatas.push(new searchData(result[i]['title'], result[i]['url']))
            });
            new Awesomplete(input, {
                autoFirst: true,
                list: searchDatas,
                maxItems: limit
            });
            input.placeholder = "Search";
            input.disabled = false;
            input.focus();
        });
    }
}
