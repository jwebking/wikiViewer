$(document).ready(function () {




  $(".random").on("click", function () {
    var url = "https://en.wikipedia.org/wiki/Special:Random"
    window.open(url, '_blank');
  });

  $("#userInput").keydown(function (e) {
    if (e.which === 13) {
      $("#search").click();

    }
  });

  $("#userInput").on("click", function () {
    $(this).css("border-color", "#2C2C2C");
  })

  $("#search").on('click', function () {
    var userInput = $("#userInput").val();
    $(".wikiInfo").remove();

    if (userInput === "") {
      $("#userInput").attr("placeholder", "Type something first!").css("border-color", "#B20B00");
    } else {
      $("#userInput").css("border-color", "#2C2C2C");
    }

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + userInput + '&callback=?',
      type: 'GET',
      data: "jsonp",
      success: function (data) {

        if (data.query.searchinfo.totalhits == 0) {
          $('.failed').append("<div class='failtext'><p>Try a different search. We couldn't find whatever that is...</p><p> I think you made it up.</p></div>");
        }
        if (data.query.searchinfo.totalhits !== 0) {
          $('.failed').remove();
          for (var i = 0; i < data.query.search.length; i++) {

            var titleResults = data.query.search[i].title;
            var snippetResults = data.query.search[i].snippet;



            $('.searchResults').append("<div class=\"wikiInfo\"><h4 class=\"wikiTitle\"><a href= 'https://en.wikipedia.org/wiki/" + titleResults + "'target=\"_blank\">" + titleResults + "</a></h4> <p class=\"wikiSnip\">" + snippetResults + "..." + "</p></div>");
          };
        }
      },
      error: function () {
        console.log("not working buddy");
      }
    });
  });

});
