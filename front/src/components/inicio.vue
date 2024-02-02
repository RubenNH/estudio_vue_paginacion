<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <b-link :to="{ name: 'form1' }">Inicio</b-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    
                </li>
            </ol>
        </nav>
        <h1>Inicio</h1>
        <p>Esta es la página de inicio</p>
        <b-button @click="navegarSiguiente" variant="primary">Siguiente</b-button>
    </div>
</template>

<script>
import router from "@/router";

export default {
    methods: {
        navegarSiguiente() {
            router.push({ name: "formulario" });
        }
    },
items: [
        {
          text: "inicio",
          href: "Inicio",
        },
        {
          text: "formulario",
          active: true,
        },
      ],
      }
</script>

<style>

</style>