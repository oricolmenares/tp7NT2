<template>
  <section>
    <div class="jumbotron">
      <h2>Formulario</h2>
      <br/>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div">
          <label for="nombre"> Nombre </label>
          <input
            type="text"
            id="nombre"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.nombre"
            name="nombre"
            required
            entre-3-15-caracteres
          />
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="entre-3-15-caracteres" class="alert alert-danger mt-1">
              Este campo debe poseer entre {{ nombreMinLength }} y
              {{ nombreMaxLength }} caracteres.
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div">
          <label for="edad"> Edad </label>
          <input
            type="number"
            id="edad"
            class="form-control"
            autocomplete="off"
            v-model.number="formData.edad"
            name="edad"
            required
            entre-18-120-anios
          />
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="entre-18-120-anios" class="alert alert-danger mt-1">
              La edad debe ser mayor a {{ edadMin }} y menor a {{ edadMax }} anios.
            </div>
          </field-messages>
        </validate>

        <br/>

        <validate tag="div">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.email"
            name="email"
            required
          />
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido
            </div>
            <div slot="email" class="alert alert-danger mt-1">
              Email no válido
            </div>
          </field-messages>
        </validate>
        <br/>

        <button class="btn btn-success my-3" :disabled="formState.$invalid">
          Enviar
        </button>
      </vue-form>


      <p><u>formData</u></p>
      <pre>{{ formData }}</pre>

      <hr/>
      <p><u>formState</u></p>
      <pre>{{ formState }}</pre>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-formulario",
  props: [],
  mounted() {},
  data() {
    return {
      url: "https://635c78e1f0bc26795bff441d.mockapi.io/users",
      formState: {},
      formData: this.getInitialData(),
      nombreMinLength: 3,
      nombreMaxLength: 15,
      edadMin: 18,
      edadMax: 120,
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: null,
        edad: null,
        email: null,
      };
    },
    async createUser() {
      try {
        await this.axios.post(this.url, this.formData, {
          "content-type": "application/json",
        });
      } catch (error) {
        console.error("Error en creacion de usuario", error.message);
      }
    },
    enviar() {
      console.log({ ...this.formData });
      this.createUser();
      this.formData = this.getInitialData();
      this.formState._reset();
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.jumbotron {
  background-color: purple;
  color: white;
}
hr {
  background-color: #bbb;
}
</style>
