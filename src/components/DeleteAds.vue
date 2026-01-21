<template>
  <div>
    <h2>DELETE Product</h2>
    <input v-model="idToDelete" type="number" placeholder="Enter Product ID" />
    <button @click="deleteProduct">Delete Product</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const idToDelete = ref("");

async function deleteProduct() {
  try {
    await axios.delete(`https://effective-mobile.duckdns.org/api/ads/${idToDelete.value}/`);
    alert(`Product ${idToDelete.value} deleted!`);
    idToDelete.value = "";
  } catch (error) {
    console.log("DELETE Error:", error);
  }
}
</script>
