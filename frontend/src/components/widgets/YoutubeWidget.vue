<template>
  <div class="container">
    <!-- form submitted usually refresh the page, this prevents that, then run videoSearch -->
    <form @submit.prevent="videoSearch">
      <input type="text" id="search" v-model="searchInput" required />
      <button type="submit" value="Search">Search</button>
    </form>

    <div id="videos"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "", // bind input value w v-model
    };
  },
  methods: {
    videoSearch() {
      const API_KEY = "AIzaSyAOY5ZqU1LZ4-lwR0GBSArcDIUx6ZnfW5E";

      const search = this.searchInput;

      if (!search) {
        console.error("Type something first big boy");
        return;
      }

      const videosContainer = document.getElementById("videos");
      videosContainer.innerHTML = "";

      fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=1&q=${search}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.items.length > 0) {
            var item = data.items[0];
            var video = document.createElement("iframe");
            video.width = "400";
            video.height = "225";
            video.src = `http://www.youtube.com/embed/${item.id.videoId}`;
            video.frameBorder = "0";
            video.allowFullscreen = false;

            videosContainer.appendChild(video);
          } else {
            console.error("No videos found.");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

input {
  border-radius: 5px 0 0 5px;
  border: 1px black solid;
}

#videos {
  margin-top: 10px;
}

button {
  border-radius: 0 5px 5px 0;
  border: 1px black solid;
  border-left: none;
  background-color: #b6b5b5;
}

button:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}
</style>
