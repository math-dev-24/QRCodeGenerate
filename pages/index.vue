<template>
  <main>
    <div class="flex flex-col gap-2 border mx-4 md:mx-8 border-slate-500 p-6 rounded bg-slate-600 text-white">
      <div class="flex flex-col">
        <label for="url">l'url :</label>
        <input type="text" v-model="url" id="url" @change="updateMessage"  class="text-black bg-slate-300 p-0.5 rounded px-4"/>
      </div>
      <div class="flex flex-col">
        <label for="name">Nom du qr :</label>
        <input type="text" v-model="name" id="name" @change="updateMessage"  class="text-black bg-slate-300 p-0.5 rounded px-4"/>
      </div>
      <span v-if="message" class="text-red-500">{{ message }}</span>
      <button @click="addQRCode" class="bg-green-600 p-1 rounded hover:bg-green-700 duration-300 transition">Générer</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4">
      <TheRow v-for="(qr, index) in qrCode.listQrCode" :qr="qr" :key="index" @delete="deleteElement" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { qrCodeInterface } from "../shared/interface/qrCodeInterface";

const url = ref<string>("")
const name = ref<string>("")
const message = ref<string>("")

const qrCode = reactive<{
  listQrCode: qrCodeInterface[]
}>({
  listQrCode: []
})
const deleteElement = (id: number) => {
  qrCode.listQrCode = qrCode.listQrCode.filter(qr => qr.id !== id)
}

const updateMessage = () => {
  if (url.value.length > 0 && name.value.length > 0 && message.value == "Veuillez remplir les champs") {
    message.value = ""
  }
}

const addQRCode = () => {
  if (url.value.length > 0 && name.value.length > 0 && !qrCode.listQrCode.find(qr => qr.url === url.value) && !qrCode.listQrCode.find(qr => qr.name === name.value)) {
    qrCode.listQrCode.push({
      id: qrCode.listQrCode.length,
      url: url.value,
      name: name.value
    })
    message.value = ""
  } else {
    if(!qrCode.listQrCode.find(qr => qr.url === url.value) || !qrCode.listQrCode.find(qr => qr.name === name.value)){
      message.value = "Nom ou URL déjà utilisé !"
    }
    if(url.value.length === 0 || name.value.length === 0){
      
      message.value = "Veuillez remplir les champs"
    }
  }
}

</script>