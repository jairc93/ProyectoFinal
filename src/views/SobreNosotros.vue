<template>
  <div>
    <MainMenu></MainMenu>

    <!-- <h1>{{ contador }}</h1> -->
    <div class="mb-3">
      <label for="lblId" class="form-label">ID</label>
      <input v-model="estudiante.id" type="text" class="form-control" id="lblId" 
             placeholder="Digite ID"
      />
    </div>
    <div class="mb-3">
      <label for="lblnombre" class="form-label">Nombre</label>
      <input v-model="estudiante.nombre"  type="text" class="form-control"  id="lblnombre"
        placeholder="Digite Nombre"
      />
    </div>
    <!-- <button @click="cargarEstudiantes">Imprimir</button> -->
    <button @click="guardarEstudiante" class="btn btn-success">Guardar</button>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NOMBRE</th>
          <th> funcion </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in estudiantes" :key="estudiante.id">
          <th scope="row">{{ estudiante.id }}</th>
          <td>{{ estudiante.nombre }}</td>
          <td><button type="button" @click="eliminar(estudiante.id)" class="btn btn-danger">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
    <!-- <img src="@/assets/mazda3.jpg" alt=""> -->
  </div>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
export default {
  name: "SobreNosotros",

  //Datos inicializados
  data() {
    return {
      mensaje: "Hola Mundo",
      contador: 0,
      estudiante: {
        id: 0,
        nombre: ""
      },
      estudiantes: [
        {
          id: 234567,
          nombre: "Luis Mozo",
        },
        {
          id: 234568,
          nombre: "Juan Fontalvo",
        },
        {
          id: 234569,
          nombre: "Jhonny Jhonny",
        },
        {
          id: 234570,
          nombre: "Stiven Hernandez",
        },
      ],
    };
  },

  //Metodos (Aquí van mis funciones)
  methods: {
    saludar: function () {
      alert(this.mensaje);
    },

    incrementar: function () {
      this.contador++;
    },

    cargarEstudiantes: function () {
      for(let est of this.estudiantes){
        console.log(est.id);
      }
    },

    eliminar: function(id){
      //Aquí voty a eliminar el estudiante
      alert(id);
      //Uni lineA

      //Aquí actulsdkjfhdsjkhvsjkdhfkjdsfashdjkfsdhkfjadsf

      console.log("ACT")

    },

    guardarEstudiante: function(){
      let encontrado = false;
      for(let est of this.estudiantes){
        if(est.id === this.estudiante.id){
          encontrado = true;
        }
      }

      if(!encontrado && this.estudiante.id != 0 && this.estudiante.nombre != ""){
        this.estudiantes.push(this.estudiante);
        alert("Se ha agregado un nuevo estudiante");
        this.estudiante = {id: 0, nombre: ""};
      }else{
        alert("NO se pudo agregar, el estudiante ya existe, o su estudiante no tiene un ID/nombre válidos");
      }
      

    }
  },

  //Metodo creador de la vista
  created: function () {
     this.cargarEstudiantes();
  },
  //Componentes
  components: {
    MainMenu,
  },
};
</script>

<style></style>
