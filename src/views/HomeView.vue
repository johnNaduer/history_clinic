<template>
  <div>
    <h1>Product List</h1>
    <!-- Formulario para agregar un producto -->
    <form @submit.prevent="addProduct">
      <h2>Add Product</h2>
      <div>
        <label for="product_name">Product Name:</label>
        <input
          id="product_name"
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          v-model="newProduct.product_name"
          type="text"
          required
        />
      </div>
      <div>
        <label for="price">Price:</label>
        <input
          id="price"
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          v-model.number="newProduct.price"
          type="number"
          required
        />
      </div>
      <div>
        <label for="is_stock">In Stock:</label>
        <select id="is_stock" v-model="newProduct.is_stock">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </div>
      <div>
        <label for="categoryId">Category ID:</label>
        <input
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="categoryId"
          v-model="newProduct.categoryId"
          type="text"
          required
        />
      </div>
      <button
        class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm"
        type="submit"
      >
        Add Product
      </button>
    </form>
    <!-- Lista de productos -->
    <ul>
      <li v-for="product in products" :key="product.product_id">
        {{ product.product_name }} - ${{ product.price }} -
        {{ product.categoryId }}
        <button
          @click="selectProductForEdit(product)"
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm"
        >
          Edit
        </button>
      </li>
    </ul>
    <!-- Formulario para editar un producto -->
    <form v-if="selectedProduct" @submit.prevent="editProduct">
      <h2>Edit Product</h2>
      <div>
        <label for="edit_product_name">Product Name:</label>
        <input
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="edit_product_name"
          v-model="selectedProduct.product_name"
          type="text"
          required
        />
      </div>
      <div>
        <label for="edit_price">Price:</label>
        <input
          id="edit_price"
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          v-model.number="selectedProduct.price"
          type="number"
          required
        />
      </div>
      <div>
        <label for="edit_is_stock">In Stock:</label>
        <select
          id="edit_is_stock"
          class="px-4 text-gray-700 border border-gray-300 rounded-lg"
          v-model="selectedProduct.is_stock"
        >
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </div>
      <div>
        <label for="edit_categoryId">Category ID:</label>
        <input
          class="px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="edit_categoryId"
          v-model="selectedProduct.categoryId"
          type="text"
          required
        />
      </div>
      <button
        type="submit"
        class="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Changes
      </button>
      <button
        class="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="button"
        @click="cancelEdit"
      >
        Cancel
      </button>
    </form>

    <div>
      <button @click="exportToExcel">Exportar a Excel</button>
      <!-- Otros elementos del template -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Definición del tipo Product
type Product = {
  product_id: string
  product_name: string
  price: number
  is_stock: boolean
  categoryId: string
}

// Base URL para las solicitudes al backend
const baseURL = 'http://localhost:3000/api/v1/products'

// Lista reactiva para almacenar los productos
const products = ref<Product[]>([])

// Producto nuevo reactivo para el formulario de agregar
const newProduct = ref<Omit<Product, 'product_id'>>({
  product_name: '',
  price: 0,
  is_stock: true,
  categoryId: '',
})

// Producto seleccionado para edición
const selectedProduct = ref<Product | null>(null)

// Función para obtener productos desde el backend
async function fetchProducts() {
  try {
    const response = await axios.get(baseURL)
    products.value = response.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// Función para agregar un producto al backend
async function addProduct() {
  try {
    const response = await axios.post(baseURL, newProduct.value)
    console.log('Product created:', response.data)
    fetchProducts()
    // Reiniciar el formulario
    newProduct.value = {
      product_name: '',
      price: 0,
      is_stock: true,
      categoryId: '',
    }
  } catch (error) {
    console.error('Error adding product:', error)
  }
}

// Función para seleccionar un producto para edición
function selectProductForEdit(product: Product) {
  console.log('Product selected for edit:', product)
  selectedProduct.value = { ...product }
  console.log('Selected product:', selectedProduct.value)
}

// Función para editar un producto en el backend
async function editProduct() {
  if (!selectedProduct.value) return

  try {
    const response = await axios.put(
      `${baseURL}/${selectedProduct.value.product_id}`,
      selectedProduct.value,
    )
    console.log('Product updated:', response.data)
    fetchProducts()
    selectedProduct.value = null // Cerrar el formulario de edición
  } catch (error) {
    console.error('Error editing product:', error)
  }
}

// Función para cancelar la edición
function cancelEdit() {
  selectedProduct.value = null
}

// Función para exportar productos a Excel
async function exportToExcel() {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/v1/products/export',
      {
        responseType: 'blob', // Para manejar archivos binarios
      },
    )

    // Crear un enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'products.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error exporting to Excel:', error)
  }
}

// Obtener los productos al montar el componente
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
