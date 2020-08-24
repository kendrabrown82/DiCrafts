$( document ).ready(function() {
  
    loadArtists();
    loadAlbums();
  
    $('#link-artists-album').click(function () {
      console.log($("#artists-select").val());
      console.log($("#albums-select").val());
  
      $.post('/api/artists_albums', {"artist_id": $("#artists-select").val(), "album_id": $("#albums-select").val()}, function (response){
        console.log(response);
      })
    });
  
    function loadArtists() {
      $.get('/api/artists').then(function (artists) {
        console.log(artists);
  
        // let list = document.getElementById('artists-list');
        // list.innerHTML = '<ul>';
        // artists.forEach(function (artist) {
        //   list.innerHTML = list.innerHTML + renderListItem(artist);
        // });
        // list.innerHTML = list.innerHTML + '</ul>';
  
        artists.forEach(function (artist){
          $("#artists-select").append(new Option(artist.name, artist.id));
        });
  
      });
    }
  
    function loadAlbums() {
      $.get('/api/albums').then(function (response){
        console.log(response);
        
        // let list = document.getElementById('albums-list');
        // list.innerHTML = '<ul>';
        // response.forEach(function (album) {
        //   list.innerHTML = list.innerHTML + renderListItem(album);
        // });
        // list.innerHTML = list.innerHTML + '</ul>';
  
  
        response.forEach(function (album){
          $("#albums-select").append(new Option(album.name, album.id));
        });
      });
    }
  
  
  
    // function renderListItem(listElement) {
    //   return `
    //   <li>${listElement.name}</li>
    //   `
    // }
  });