<script setup>
import BaseButton from '../components/BaseButton.vue'

function hello() {
  alert('Home sahifasidan salom!')
}
</script>

<template>
  <h1>Home Page</h1>

  <BaseButton @click="hello">
    Meni bos
  </BaseButton>
</template>
