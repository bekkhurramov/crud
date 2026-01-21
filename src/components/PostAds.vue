<template>
  <div>
    <h2>POST New Product</h2>
    <input v-model="newProduct.title" placeholder="Title" />
    <input v-model="newProduct.description" placeholder="Description" />
    <input v-model="newProduct.image_url" placeholder="Image URL" />
    <input v-model="newProduct.category" placeholder="Category" />
    <input v-model="newProduct.condition" placeholder="Condition" />
    <button @click="createProduct">Add Product</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const newProduct = ref({
  title: "",
  description: "",
  image_url: "",
  category: "",
  condition: ""
});

async function createProduct() {
  try {
    const response = await axios.post("https://effective-mobile.duckdns.org/api/ads/", newProduct.value);
    console.log("POST Response:", response.data);
    alert("Product added successfully!");
  } catch (error) {
    console.log("POST Error:", error);
  }
}
</script>
