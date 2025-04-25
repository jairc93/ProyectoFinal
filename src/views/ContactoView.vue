<template>
  <div class="contact-us-page">
    <h2>Contáctenos</h2>
    <form @submit.prevent="submitForm">
      <input v-model="contact.name" placeholder="Nombre" required />
      <input v-model="contact.email" type="email" placeholder="Correo Electrónico" required />
      <select v-model="contact.type" required>
        <option value="" disabled selected>Seleccione el tipo de mensaje</option>
        <option value="PQRS">PQRSD</option>
        <option value="recommendation">Recomendaciones</option>
        <option value="compliment">Felicitaciones</option>
        <option value="consultation">Consulta</option>
      </select>
      <textarea v-model="contact.message" placeholder="Mensaje" required />
      <button type="submit">Enviar</button>
      <p v-if="submissionSuccess" class="success-message">¡Su mensaje ha sido enviado correctamente!</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactoView',
  data() {
    return {
      contact: {
        name: '',
        email: '',
        type: '',
        message: ''
      },
      submissionSuccess: false
    };
  },
  methods: {
    submitForm() {
      if (!this.contact.name || !this.contact.email || !this.contact.type || !this.contact.message) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      // Aquí podrías agregar la lógica para enviar el mensaje a un servidor
      console.log('Mensaje enviado:', this.contact);
      this.submissionSuccess = true;
      this.contact = { name: '', email: '', type: '', message: '' };
      // Ocultar el mensaje de éxito después de unos segundos
      setTimeout(() => {
        this.submissionSuccess = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.contact-us-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
  font-weight: bold;
}
</style>