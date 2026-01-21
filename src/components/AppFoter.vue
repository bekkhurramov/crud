<script setup>
defineProps({
  text: String
})
</script>

<template>
  <footer style="background:#eee;padding:15px;text-align:center">
    {{ text }}
  </footer>
</template>
