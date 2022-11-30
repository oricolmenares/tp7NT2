<template>
  <section>
    <div class="jumbotron">
      <h2>Usuarios</h2>
      <hr />
      <br />

      <button
        class="btn btn-success my-3 mr-2"
        @click="usuariosAsyncAwait()"
      >
        GET Usuarios Async Await
      </button>
      <button class="btn btn-success my-3 mr-2" @click="usuariosThenCatch()">
        GET Usuarios Then Catch
      </button>

      <div v-if="requestSolved == true && usuarios.length == 0">
        No se encontraron usuarios
      </div>
      <div v-else>
        <div
          class="media alert alert-info"
          v-for="(usuario, index) in usuarios"
          :key="index"
        >
          <img
            :src="usuario.foto"
            class="mr-3"
            width="300"
            :alt="usuario.nombre"
            :style="{ 'border-radius': '10px' }"
          />
          <div class="media-body">
            <h4 class="mt-0">
              <u>Usuario {{ index + 1 }} - ID: {{ usuario.id }}</u>
            </h4>
            <br />
            <p>
              Nombre: {{ usuario.name }}
            </p>
            <p>
              Email: {{ usuario.email }}
            </p>
            <p>
              Edad: {{ usuario.age }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-usuarios",
  props: [],
  mounted() {},
  data() {
    return {
      url: "https://635c78e1f0bc26795bff441d.mockapi.io/users",
      usuarios: [],
      requestSolved: false,
    };
  },
  methods: {
    async usuariosAsyncAwait() {
      try {
        let { data: usuarios } = await this.axios(this.url);
        console.log(usuarios);
        this.usuarios = usuarios;
        this.requestSolved = true;
      } catch (error) {
        console.error("Error en getUsuarios", error.message);
      }
    },
    usuariosThenCatch() {
      fetch(this.url)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((respuesta) => {
          this.usuarios = respuesta;
          console.log(this.usuarios);
          this.requestSolved = true;
        })
        .catch((error) => console.error(error));
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: navy;
  color: white;
}
hr {
  background-color: #bbb;
}
</style>
