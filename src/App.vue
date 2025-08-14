<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">


      <nav>
        <RouterLink to="/" class="p-3 ">Home</RouterLink>
        <RouterLink to="/about" class="p-3 ">About</RouterLink>
        <RouterLink to="/table" class="p-3 ">table</RouterLink>
        <RouterLink to="/tableView" class="p-3 ">tableView</RouterLink>
      </nav>
    </div>
  </header>


  <main  class=" mb-6">
  <div class="container-base-card">
    <div class="collapsed-container">
      <div class="router-wrap">
  <RouterView />
</div>
</div>
  </div>
  </main>



</template>

<style>
body {
    background-color: #b6d4e9;
    margin: 0;
    padding: 0;
}

.router-wrap {
  margin-top: 24px;
  padding: 12px 24px;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.5rem;
  width: 100%;
  height: auto;
}

.container-base-card {
  flex-direction: column;
  align-items: center;
  display: flex;
}

.collapsed-container {
  background-color: #ffffff;
  border-radius: 7px;
  width: 100%;
  max-width: 1800px;
  height: auto;
}

</style>
