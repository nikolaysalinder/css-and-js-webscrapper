<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <form @submit.prevent="getScripts">
      <label for="site"
        >Введите адрес сайта в формате https://www.vk.com
      </label>
      <br />
      <input id="site" type="text" v-model="site" />
      <br />
      <input type="submit" value="Получить скрипты" />
    </form>
    <div class="results">
      <p v-bind:key="index" v-for="(result, index) in results" class="scripts">
        {{ `${index + 1}) ${result}` }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      site: "https://www.facebook.com/",
      results: [],
    };
  },
  methods: {
    getScripts() {
      axios
        .post("http://localhost:3000/scripts", {
          site: this.site,
        })
        .then((response) => {
          console.log(response.data);
          this.results = response.data;
        })
        .catch((err) => console.log(err));
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#site {
  padding: 7px;
  min-width: 250px;

  margin-bottom: 20px;
}
.results {
  text-align: left;
}
</style>
