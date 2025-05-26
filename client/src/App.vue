<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12 col-md-6">
        <CityTable
          :cities="cities"
          :page="page"
          :totalPages="totalPages"
          @select="loadForecast"
          @changePage="changePage"
        />

        <form @submit.prevent="addCity" class="mt-3">
          <input
            v-model="newInsee"
            class="form-control"
            placeholder="Code INSEE"
          />
          <button class="btn btn-primary mt-2">Ajouter</button>
        </form>
      </div>
      <div class="col-12 col-md-6">
        <div class="row">
          <template v-if="forecasts.length">
            <ForecastCard
              v-for="f in forecasts"
              :key="f.datetime"
              :forecast="f"
            />
          </template>
          <template v-else>
            <div class="w-100 text-muted text-center py-5">
              <em>Sélectionnez une ville pour afficher la météo</em>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CityTable from "@/components/CityTable.vue";
import ForecastCard from "@/components/ForecastCard.vue";
import axios from "axios";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "APP",
  components: {
    CityTable,
    ForecastCard,
  },
  data() {
    return {
      cities: [] as any[],
      forecasts: [] as any[],
      newInsee: "",
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  },
  async mounted() {
    try {
      await this.loadCities();
    } catch (err) {
      toast.error("Erreur de santé du serveur.");
    }
  },
  methods: {
    async loadCities() {
      try {
        const res = await axios.get("/cities", {
          params: { page: this.page, limit: this.limit },
        });
        this.cities = res.data.data;
        this.totalPages = Math.ceil(res.data.total / this.limit);
      } catch (err) {
        toast.error("Impossible de charger les villes.");
      }
    },
    async changePage(newPage: number) {
      this.page = newPage;
      await this.loadCities();
    },
    async loadForecast(insee: string) {
      try {
        const res = await axios.get(`/cities/${insee}/forecast`);
        this.forecasts = res.data.forecasts;
      } catch (err) {
        toast.error("Erreur lors du chargement de la météo.");
      }
    },
    async addCity() {
      if (!this.newInsee) return;
      try {
        await axios.post("/cities", { insee: this.newInsee });
        this.newInsee = "";
        this.page = 1;
        await this.loadCities();
        toast.success("Ville ajoutée avec succès !");
      } catch (err) {
        toast.error("Code INSEE invalide ou déjà existant.");
      }
    },
  },
});
</script>

<style scoped>
#app {
  width: 100%;
}
</style>
