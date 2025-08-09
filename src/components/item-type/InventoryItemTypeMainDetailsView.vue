<template>
  <div class="inventory-item-type-view">
    <div class="item-details">
      <h3>{{ data.name }}</h3>
      
      <div class="detail-row">
        <strong>Descripción:</strong>
        <p>{{ data.description || 'Sin descripción' }}</p>
      </div>
      
      <div class="detail-row">
        <strong>Categoría:</strong>
        <p>{{ getCategoryName(data.categoryId) }}</p>
      </div>
      
      <div class="detail-row" v-if="data.presignedUrl">
        <strong>Imagen:</strong>
        <img :src="data.presignedUrl" alt="Item image" class="item-image" />
      </div>
      
      <div class="detail-row">
        <strong>Tiene tallas:</strong>
        <p>{{ data.hasSizes ? 'Sí' : 'No' }}</p>
      </div>
      
      <div class="detail-row">
        <strong>Recordatorio de stock:</strong>
        <p>{{ data.stockReminder ? 'Sí' : 'No' }}</p>
      </div>
      
      <div class="detail-row" v-if="data.stockReminder && data.minimumStockReminder">
        <strong>Stock mínimo:</strong>
        <p>{{ data.minimumStockReminder }}</p>
      </div>
      
      <div class="detail-row">
        <strong>Generación automática de números:</strong>
        <p>{{ data.itemNumberGeneration ? 'Sí' : 'No' }}</p>
      </div>
      
      <div class="detail-row" v-if="data.hasSizes && data.sizes">
        <strong>Tallas disponibles:</strong>
        <div class="sizes-grid">
          <div 
            v-for="(size, key) in data.sizes" 
            :key="key" 
            class="size-item"
          >
            <span class="size-name">{{ key }}</span>
            <span class="size-stock">Stock: {{ size.stock }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const getCategoryName = (categoryId: string) => {
  const category = props.categories.find((cat: any) => cat.id === categoryId)
  return category ? category.label : 'Sin categoría'
}
</script>

<style scoped>
.inventory-item-type-view {
  padding: 1rem;
}

.item-details h3 {
  margin-bottom: 1rem;
  color: #333;
}

.detail-row {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.detail-row strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #555;
}

.detail-row p {
  margin: 0;
  color: #666;
}

.item-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.sizes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.size-item {
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.size-name {
  font-weight: bold;
  color: #333;
}

.size-stock {
  font-size: 0.9em;
  color: #666;
}
</style>