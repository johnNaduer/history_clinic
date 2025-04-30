<template>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tenant) in paginatedTenants" :key="tenant.id">
            <td>{{ tenant.id }}</td>
            <td>{{ tenant.name }}</td>
            <td>{{ tenant.firstLastName }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination Controls -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage.value === 1 }">
            <button class="page-link" @click="previousPage">«</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage.value === page }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage.value === totalPages }">
            <button class="page-link" @click="nextPage">»</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, computed } from 'vue';
  
  // Sample data
  const tenants = reactive([
    {
      id: 1,
      name: "John1123",
      firstLastName: "Doe",
    },
    {
      id: 2,
      name: "John12312",
      firstLastName: "Doe",
    },
    {
      id: 3,
      name: "John12321",
      firstLastName: "Doe",
    },
    {
      id: 4,
      name: "John44",
      firstLastName: "Doe",
    },
    {
      id: 5,
      name: "John43",
      firstLastName: "Doe",
    },
    {
      id: 6,
      name: "John31",
      firstLastName: "Doe",
    },
    {
      id: 7,
      name: "John2",
      firstLastName: "Doe",
    },
    {
      id: 8,
      name: "John1",
      firstLastName: "Doe",
    },
    {
      id: 4,
      name: "John44",
      firstLastName: "Doe",
    },
    {
      id: 5,
      name: "John43",
      firstLastName: "Doe",
    }
  ]);
  
  // Pagination state
  const currentPage = reactive({ value: 1 });
  const itemsPerPage = 4;
  
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
  const paginatedTenants = computed(() =>
    tenants.slice(startIndex.value, startIndex.value + itemsPerPage)
  );
  const totalPages = computed(() => Math.ceil(tenants.length / itemsPerPage));
  
  // Pagination methods
  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }
  </script>
  
  <style>
  .table {
    margin: 20px auto;
    width: 80%;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .page-item {
    cursor: pointer;
    width: 30px;
  }


  .page-item.active .page-link {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .page-item.disabled .page-link {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  
  .patient-form button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f4f4f4;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

tbody td {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
  </style>
  