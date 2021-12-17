<template>
  <div class="p-2">
    <div class="m-3">
      <input
        class="form-control input mr-1"
        type="search"
        placeholder="Buscar auto..."
        v-on:input="buscar"
        v-model="consulta"
      />
    </div>

    <div class="m-3">
      <table class="table table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">Auto</th>
            <th scope="col">Características</th>
            <th scope="col">Marca</th>
            <th scope="col">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(auto, index) in autos" :key="index">
            <td>{{ auto._source.titulo }}</td>
            <td>{{ auto._source.caracteristicas }}</td>
            <td>{{ auto._source.marca.marca }}</td>
            <td>{{ auto._source.marca.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      consulta: '',
      autos: []
    };
  },
  methods: {
    async buscar() {
      let res;
      if (this.consulta) {
        res = await axios.get('/autos/' + this.consulta);
      } else {
        res = await axios.get('/todosLosAutos');
      }

      this.autos = res.data.hits.hits;
    }
  },
  async created() {
    this.buscar();
  }
};
</script>

<style>
</style>