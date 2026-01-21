<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button
      @click="emit('click')"
      style="padding:10px 20px;background:green;color:white;border:none"
  >
    <slot />
  </button>
</template>
