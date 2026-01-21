<template>
  <div>
    <h2>EDIT Product</h2>
    <input v-model="editProduct.id" type="number" placeholder="Product ID" />
    <input v-model="editProduct.title" placeholder="New Title" />
    <input v-model="editProduct.description" placeholder="New Description" />
    <input v-model="editProduct.image_url" placeholder="New Image URL" />
    <input v-model="editProduct.category" placeholder="New Category" />
    <input v-model="editProduct.condition" placeholder="New Condition" />
    <button @click="updateProduct">Update Product</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const editProduct = ref({
  id: "",
  title: "",
  description: "",
  image_url: "",
  category: "",
  condition: ""
});

async function updateProduct() {
  try {
    const { id, ...data } = editProduct.value;
    const response = await axios.put(`https://effective-mobile.duckdns.org/api/ads/${id}/`, data);
    console.log("PUT Response:", response.data);
    alert(`Product ${id} updated!`);
    editProduct.value = { id: "", title: "", description: "", image_url: "", category: "", condition: "" };
  } catch (error) {
    console.log("PUT Error:", error);
  }
}
</script>
