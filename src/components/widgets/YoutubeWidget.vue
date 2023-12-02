<template>
  <div class="container">
    <form id="form">
      <input type="text" id="search" required />
      <button type="submit" value="Search">Search</button>
    </form>

    <div id="videos"></div>
  </div>
</template>

<script>
        document.addEventListener('DOMContentLoaded', function () {
            const API_KEY = "AIzaSyAOY5ZqU1LZ4-lwR0GBSArcDIUx6ZnfW5E";

            const form = document.getElementById('form');
            const searchInput = document.getElementById('search');
            const videosContainer = document.getElementById('videos');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const search = searchInput.value;
                videoSearch(API_KEY, search);
            });

            function videoSearch(key, search) {
                videosContainer.innerHTML = '';

                fetch(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=1&q=${search}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.items.length > 0) {
                            var item = data.items[0];
                            var video = document.createElement('iframe');
                            video.width = "400";
                            video.height = "225";
                            video.src = `http://www.youtube.com/embed/${item.id.videoId}`;
                            video.frameBorder = "0";
                            video.allowFullscreen = false;

                            videosContainer.appendChild(video);
                        } else {
                            console.error('No videos found.');
                        }
                    })
                    .catch(error => console.error('Error fetching data:', error));
            }
        });
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

input{
    border-radius: 5px 0 0 5px;
    border: 1px black solid;
}

#videos{
    margin-top: 10px;
}

button {
  border-radius: 0 5px 5px 0;
  border: 1px black solid;
  border-left: none;
  background-color: #b6b5b5;
}

button:hover{
    background-color: black;
    color: white;
    cursor: pointer;
}
</style>