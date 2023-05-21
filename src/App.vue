<template>
  <header
    class="container-fluid mx-auto bg-orange-400 flex flex-col sm:flex-row justify-between items-center p-4"
  >
    <router-link to="/" class="text-xl text-neutral-900 font-bold p-2">vue CRUD</router-link>
    <nav class="text-neutral-900 flex items-cetner space-x-4 text-xl">
      <router-link to="/" class="hover:text-cyan-400">Болезни</router-link
      ><router-link to="/doctors" class="hover:text-cyan-400">Доктора</router-link>
    </nav>
    <div class="w-[200px] hidden md:block"></div>
  </header>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
