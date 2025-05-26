<template>
  <div class="col-12 col-md-6 mb-4">
    <div class="card h-100 text-center p-3 shadow-sm">
      <div class="mb-3">
        <i v-if="forecast.icon" :class="`bi bi-${forecast.icon} display-3`"></i>
      </div>
      <div class="fw-bold">Probabilité de pluie</div>
      <div class="fs-4 mb-2">{{ forecast.probarain }} %</div>
      <div class="d-flex justify-content-around">
        <div>
          <div class="fw-bold">Min</div>
          <div>{{ forecast.tmin }} °C</div>
        </div>
        <div>
          <div class="fw-bold">Max</div>
          <div>{{ forecast.tmax }} °C</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ forecast: any }>();
</script>
