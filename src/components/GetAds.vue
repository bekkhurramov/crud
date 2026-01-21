<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const title = ref('')
const description = ref('')
const pageCount = ref('')
const editId = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async function () {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books')
    users.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = "Ma'lumotlarni olishda xatolik yuz berdi"
  } finally {
    loading.value = false
  }
})

async function postData() {
  loading.value = true
  error.value = null
  try {
    const newBook = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      pageCount: Number(pageCount.value)
    }
    await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    })
    users.value.unshift(newBook)
    clearForm()
  } catch (err) {
    console.error(err)
    error.value = "Kitob qo‘shishda xatolik yuz berdi"
  } finally {
    loading.value = false
  }
}

async function deleteBook(id) {
  loading.value = true
  error.value = null
  try {
    await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`, {
      method: 'DELETE'
    })
    users.value = users.value.filter(book => book.id !== id)
  } catch (err) {
    console.error(err)
    error.value = "Kitobni o‘chirishda xatolik yuz berdi"
  } finally {
    loading.value = false
  }
}

function editBook(book) {
  editId.value = book.id
  title.value = book.title
  description.value = book.description
  pageCount.value = book.pageCount
}

async function updateBook() {
  loading.value = true
  error.value = null
  try {
    const updatedBook = {
      id: editId.value,
      title: title.value,
      description: description.value,
      pageCount: Number(pageCount.value)
    }
    await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${editId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook)
    })

    users.value = users.value.map(book =>
        book.id === editId.value ? updatedBook : book
    )

    clearForm()
  } catch (err) {
    console.error(err)
    error.value = "Kitobni yangilashda xatolik yuz berdi"
  } finally {
    loading.value = false
  }
}

function clearForm() {
  title.value = ''
  description.value = ''
  pageCount.value = ''
  editId.value = null
}
</script>

<template>

  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">

      <div class="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ editId ? '✏ Tahrirlash' : ' Yangi kitob qo‘shish' }}
        </h2>
        <input v-model="title" placeholder="Title" class="border p-3 w-full mb-4 rounded-lg" />
        <textarea v-model="description" placeholder="Description" class="border p-3 w-full mb-4 rounded-lg"></textarea>
        <input v-model="pageCount" type="number" placeholder="Page count" class="border p-3 w-full mb-6 rounded-lg" />
        <button v-if="!editId" @click="postData" class="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Qo‘shish
        </button>
        <button v-else @click="updateBook" class="bg-green-600 text-white px-6 py-2 rounded-lg">Saqlash</button>
      </div>
      <div v-if="loading" class="flex justify-center items-center h-32">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="user in users" :key="user.id" class="bg-white rounded-xl shadow p-5">
          <h3 class="font-bold text-xl mb-2">{{ user.title }}</h3>
          <p class="text-gray-600 mb-3">{{ user.description }}</p>
          <p class="text-sm text-gray-500 mb-4">{{ user.pageCount }} sahifa</p>
          <div class="flex gap-2">
            <button @click="editBook(user)" class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button @click="deleteBook(user.id)" class="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
