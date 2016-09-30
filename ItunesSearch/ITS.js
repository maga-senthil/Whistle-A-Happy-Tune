function findkeyPress(key){
  key = key || window.event;
  if(key.keyCode==13){
    document.getElementById('buttonSearch').click();
    return false;
  }
  return true;
}
function getInput(){
  var searchTerm = document.getElementById("searchText").value;
  return searchTerm;
}
function searchSongs(){
  var params={
    term:getInput(),
    media:"music",
    entity:"musicTrack",
    limit:50,
    callback:"displaySearchResults"
  };
   $.ajax({
     method:"GET",
     url:"http://itunes.apple.com/search?",
     dataType : 'JSONP',
     data:params,
    })
}

function displaySearchResults(arg){
  var results = arg.results;
  var pool='';
  for (var i = 0; i < results.length; i++) {
      var item = results[i];
      var obj = {
        source: 0,
        track_name: item.trackCensoredName,
        artist_name: item.artistName,
        artist_url: item.artistViewUrl,
        collection_name: item.collectionCensoredName,
        genre: item.primaryGenreName,
        icon:item.artworkUrl60
      };
      results[i] = obj;
      pool += '<div class="songs-search-result">';
      pool += '<img src="{0}"/>'.replace("{0}",obj.icon);
      pool += '<span class="label">Track:</span>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
      pool += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;<br/>'.replace("{0}", item.previewUrl);
      pool += '<span class="label">Artist:</span><a href="{0}" target="_blank">{1}</a><br/>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
      pool += '<span class="label">Collection Name:</span>{0}<br/>'.replace("{0}", obj.collection_name);
      pool += '<span class="label">Primary Genre Name:</span>{0}<br/>'.replace("{0}", obj.genre);
      pool += '</div>';
      }
    jQuery("#resultITunes").html(pool);
    $('#resultITunes').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});
  }


  $.fn.pageMe = function(opts){
      var $this = this,
          defaults = {
              perPage: 7,
              showPrevNext: false,
              hidePageNumbers: false
          },
          settings = $.extend(defaults, opts);
      var listElement = $this;
      var perPage = settings.perPage;
      var children = listElement.children();
      var pager = $('.pager');
      if (typeof settings.childSelector!="undefined") {
          children = listElement.find(settings.childSelector);
      }
      if (typeof settings.pagerSelector!="undefined") {
          pager = $(settings.pagerSelector);
      }
      var numItems = children.size();
      var numPages = Math.ceil(numItems/perPage);
      pager.data("curr",0);
      if (settings.showPrevNext){
          $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
      }
      var curr = 0;
      while(numPages > curr && (settings.hidePageNumbers==false)){
          $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
          curr++;
      }
      if (settings.showPrevNext){
          $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
      }
      pager.find('.page_link:first').addClass('active');
      pager.find('.prev_link').hide();
      if (numPages<=1) {
          pager.find('.next_link').hide();
      }
      pager.children().eq(1).addClass("active");
      children.hide();
      children.slice(0, perPage).show();
      pager.find('li .page_link').click(function(){
          var clickedPage = $(this).html().valueOf()-1;
          goTo(clickedPage,perPage);
          return false;
      });
      pager.find('li .prev_link').click(function(){
          previous();
          return false;
      });
      pager.find('li .next_link').click(function(){
          next();
          return false;
      });
      function previous(){
          var goToPage = parseInt(pager.data("curr")) - 1;
          goTo(goToPage);
      }
      function next(){
          goToPage = parseInt(pager.data("curr")) + 1;
          goTo(goToPage);
      }
      function goTo(page){
          var startAt = page * perPage,
              endOn = startAt + perPage;
          children.css('display','none').slice(startAt, endOn).show();
          if (page>=1) {
              pager.find('.prev_link').show();
          }
          else {
              pager.find('.prev_link').hide();
          }
          if (page<(numPages-1)) {
              pager.find('.next_link').show();
          }
          else {
              pager.find('.next_link').hide();
          }
          pager.data("curr",page);
          pager.children().removeClass("active");
          pager.children().eq(page+1).addClass("active");
      }
  };
