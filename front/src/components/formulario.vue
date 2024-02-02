<template>
    <b-container>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <b-link :to="{ name: 'inicio' }">Inicio</b-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Formulario
                </li>
            </ol>
        </nav>
        <h1>Debe llevar a cabo validaciones de datos del registro de vehículos con los siguientes atributos: Marca,
            modelo, año y número de serie. Las validaciones son las siguientes</h1>
        <b-col>
            <router-view />
        </b-col>
        <div>
            <b-form @submit="checkForm" novalidate>
                <b-alert variant="danger" dismissible :show="errors.length > 0">
                    <b>{{ errors.length > 1 ? "Corrige los siguientes errores:" : "Corrige el siguiente error:" }}</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </b-alert>

                <b-form-group id="brand-group" label="brand" label-for="brand" :state="validateField('brand')">
                    <b-form-input id="brand" v-model="formData.brand" type="text" name="brand" required></b-form-input>
                </b-form-group>

                <b-form-group id="year-group" label="year" label-for="year" :state="validateField('year')">
                    <b-form-input id="year" v-model="formData.year" type="text" name="year" required></b-form-input>
                </b-form-group>

                <b-form-group id="serie-group" label="Número de Serie" label-for="serie" :state="validateField('serie')">
                    <b-form-input id="serie" v-model="formData.serie" type="text" name="serie"></b-form-input>
                </b-form-group>


                <b-button type="submit" variant="primary">Enviar</b-button>
            </b-form>
        </div>
    </b-container>
</template>

<script>
import axios from 'axios';
import router from "@/router";
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            errors: [],
            formData: {
                id: 1,
                brand: "",
                model: "", 
                year: "",
                serie: "",
            },
            items: [
                {
                    text: "inicio",
                    href: "inicio",
                },
                {
                    text: "formulario",
                    active: true,
                },
            ],
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:8080/api/vehiculos', this.formData);
                console.log('Respuesta del servidor:', response.data);
                router.push('/paginacion'); // Redirige después de un registro exitoso
            } catch (error) {
                console.error('Error al enviar datos:', error);
            }
        },

        checkForm: function (e) {
            this.errors = [];

            if (!this.formData.brand) {
                this.errors.push("La marca es obligatoria.");
            } else if (!/^[a-zA-Z0-9\s]+$/.test(this.formData.brand)) {
                this.errors.push("La marca debe ser alfanumérica y no debe contener signos.");
            }

            if (!this.formData.year) {
                this.errors.push("El año es obligatorio.");
            } else {
                const currentYear = new Date().getFullYear();
                const inputYear = parseInt(this.formData.year, 10);

                if (isNaN(inputYear) || inputYear > currentYear) {
                    this.errors.push("Ingrese un año válido que no sea mayor al año actual.");
                }
            }
            if (!this.formData.serie) {
                this.errors.push("El número de serie es obligatorio.");
            } else {
                const regex = /^[A-Za-z]{4}\d{3}-\d{2}[A-Za-z]{2}$/;
                if (!regex.test(this.formData.serie)) {
                    this.errors.push("Ingrese un número de serie válido en el formato requerido (XXXX000-00XX).");
                }
            }

            if (!this.errors.length) {
                console.log("Formulario válido, se puede enviar.");
                this.submitForm(); // Llama a la función para enviar el formulario
            } else {
                console.log("Hay errores en el formulario.");
                e.preventDefault();
            }
        },

        validateField(field) {
            const errors = this.errors.filter((error) => error.includes(field));
            return errors.length > 0 ? false : null;
        },

        navegarSiguiente() {
            this.$router.push({ name: "paginacion" });
        },
    },
});
</script>

<style></style>
