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
    limit:25,
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
        track_url: item.trackViewUrl,
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
      pool += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
      pool += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp</br>'.replace("{0}", obj.track_url);
      pool += '<span class="label">Artist:</span><a href="{0}" target="_blank">{1}</a><br/>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
      pool += '<span class="label">Collection Name:</span>{0}<br/>'.replace("{0}", obj.collection_name);
      pool += '<span class="label">Primary Genre Name:</span>{0}<br/>'.replace("{0}", obj.genre);
      pool += '</div>';
    }

    jQuery("#resultITunes").html(pool);
  }
