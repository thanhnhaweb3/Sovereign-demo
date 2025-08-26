<template>
  <div>
    <input v-model="input" placeholder="Enter data"/>
    <button @click="setData">Set Data</button>
    <button @click="getData">Get Data</button>
    <p>Data from contract: {{ data }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const input = ref('');
const data = ref('');

const setData = async () => {
  await axios.post('http://localhost:4001/set', { value: input.value });
  input.value = '';
}

const getData = async () => {
  const res = await axios.get('http://localhost:4001/get');
  data.value = res.data.data;
}
</script>
