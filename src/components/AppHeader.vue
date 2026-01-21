<script setup>
defineProps({
  title: String
})
</script>

<template>
  <header style="background:#222;color:white;padding:15px">
    <h2>{{ title }}</h2>

    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>
