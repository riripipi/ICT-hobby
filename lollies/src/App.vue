<script setup>
import { onMounted, ref } from 'vue';
import { query, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore"
import db from '@/firebase/init.js'

const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const newLollie = ref(
  {
    name: "",
    category: "",
    imageUrl: ""
  }
);
const deleteLollieName = ref("");
const lollieList = ref([]);

onMounted(() => {
  getSavedLollies();
});

//Create
async function createLollie() {
  const docRef = doc(db, 'lollies', newLollie.value.name);
  await setDoc(docRef, newLollie.value);

  showCreateModal.value = false;
  newLollie.value.name = "";
  newLollie.value.category = "";
  newLollie.value.imageUrl = "";

  getSavedLollies();
}

//Delete
async function deleteLollie() {
  if (!!deleteLollieName.value) {
    await deleteDoc(doc(db, 'Lollies', deleteLollieName.value));
    showDeleteModal.value = false;
    deleteLollieName.value = "";
    getSavedLollies();
  }
}

//Read
async function getSavedLollies() {
  const colRef = collection(db, 'lollies');
  const LollieQuery = await getDocs(query(colRef));

  lollieList.value = [];
  LollieQuery.forEach((doc) => {
    lollieList.value.push(doc.data());
  })
}

</script>

<template>
  <header>
    <h1 >Lollies</h1>
  </header>
  <main>
    <section class="lollie-list">
      <h3>Favourite Lollies</h3>
      <div class="lollie-card-container">
        <div class="lollie-card" v-for="Lollie in lollieList">
          <div class="lollie-title-container">
            <h5 class="lollie-title">{{ Lollie.name }}</h5>
            <div class="lollie-category"><i>{{ Lollie.category }}</i></div>
          </div>
          <img class="lollie-image" :src="Lollie.imageUrl"/>
        </div>
      </div>
      <button 
        v-if="!showCreateModal && !showDeleteModal"
        @click="showCreateModal = true"
      >
        New Entry 
      </button>
      <button 
        v-if="!showCreateModal && !showDeleteModal"
        @click="showDeleteModal = true"
      >
        Delete Entry
      </button>

      
    </section>

    <section class="new-Lollie" v-if="showCreateModal">
      <div>
        <label>Lollie Name:</label>
        <input v-model="newLollie.name"/>
      </div>
      <div>
        <label>category:</label>
        <input v-model="newLollie.category"/>
      </div>
      <div>
        <label>Image Url:</label>
        <input v-model="newLollie.imageUrl"/>
      </div>
      <button @click="createLollie()">Save</button>
      <button @click="showCreateModal = false">Cancel</button>
    </section>

    <section class="delete-Lollie" v-if="showDeleteModal">
      <select v-model="deleteLollieName">
        <option v-for="Lollie in lollieList" :key="Lollie.id" :value="Lollie.name">
          {{ Lollie.name }}
        </option>
      </select>
      <button @click="deleteLollie()">Delete</button>
      <button @click="showDeleteModal = false">Cancel</button>
    </section>
  </main>
</template>