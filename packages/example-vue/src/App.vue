<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {TurretLogger} from "@turretjs/sdk/src/lib/logger/TurretLogger";

const crash = () => {
  TurretLogger.log("Helloooooooo", "world", { a: 1, foo: "bar", c: [1, 2, 3] });
  throw new Error("CRASHHHHH");
}

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <button @click="crash">CRASH</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
