<template>
  <div>
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle text-start">
        <thead class="table-light">
          <tr>
            <th style="width: 20%">Code INSEE</th>
            <th style="width: 50%">City</th>
            <th style="width: 30%">Population</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="city in cities"
            :key="city.insee"
            @click="$emit('select', city.insee)"
            class="align-middle"
            style="cursor: pointer"
          >
            <td>{{ city.insee }}</td>
            <td>{{ city.name }}</td>
            <td>{{ city.population.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <button
        class="btn btn-outline-primary"
        :disabled="page <= 1"
        @click="$emit('changePage', page - 1)"
      >
        ← Précédent
      </button>

      <span>Page {{ page }} / {{ totalPages }}</span>

      <button
        class="btn btn-outline-primary"
        :disabled="page >= totalPages"
        @click="$emit('changePage', page + 1)"
      >
        Suivant →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cities: any[];
  page: number;
  totalPages: number;
}>();

defineEmits<{
  (e: "select", insee: string): void;
  (e: "changePage", newPage: number): void;
}>();
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f1f3f5;
}
</style>
