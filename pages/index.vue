<template>
  <main>
    <div class="flex flex-col gap-2 border mx-4 md:mx-8 border-slate-500 p-6 rounded bg-slate-600 text-white">
      <div class="flex flex-col">
        <label for="url">l'url :</label>
        <input type="text" v-model="url" id="url" @change="updateMessage"
          class="text-black bg-slate-300 p-0.5 rounded px-4" />
      </div>
      <div class="flex flex-col">
        <label for="name">Nom du qrCode :</label>
        <input type="text" v-model="name" id="name" @change="updateMessage"
          class="text-black bg-slate-300 p-0.5 rounded px-4" />
      </div>
      <div class="grid grid-cols-2">
        <div class="flex content-center items-center gap-2">
          <label for="color">Couleur des cubes :</label>
          <input type="color" v-model="colorCube" id="color">
        </div>
        <div class="flex content-center items-center gap-2">
          <label for="bgcolor">Couleur de fond :</label>
          <input type="color" id="bgcolor" v-model="colorBackground">
        </div>
      </div>
      <span v-if="message" class="text-red-500">{{ message }}</span>
      <button @click="addQRCode"
        class="bg-green-600 p-1 rounded hover:bg-green-700 duration-300 transition">Générer</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4">
      <TheRow v-for="(qr, index) in qrCode.listQrCode" :qr="qr" :key="index" @delete="deleteElement"
        :rgbcube="hexToRgba(qr.color)" :rgbbg="hexToRgba(qr.backgroundColor)" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { qrCodeInterface } from "../shared/interface/qrCodeInterface";
import { RGBA } from "lean-qr";



const url = ref<string>("")
const name = ref<string>("")
const colorCube = ref<string>("#000000")
const colorBackground = ref<string>('#ffffff')
const message = ref<string>("")

const qrCode = reactive<{
  listQrCode: qrCodeInterface[]
}>({
  listQrCode: []
})


function hexToRgba(hex: string): RGBA {
  hex = hex.replace(/^#/, "");
  var red = parseInt(hex.substring(0, 2), 16);
  var green = parseInt(hex.substring(2, 4), 16);
  var blue = parseInt(hex.substring(4, 6), 16);
  return [red, green, blue, 255];
}


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
      name: name.value,
      color: colorCube.value,
      backgroundColor: colorBackground.value
    })
    message.value = ""
  } else {
    if (!qrCode.listQrCode.find(qr => qr.url === url.value) || !qrCode.listQrCode.find(qr => qr.name === name.value)) {
      message.value = "Nom ou URL déjà utilisé !"
    }
    if (url.value.length === 0 || name.value.length === 0) {

      message.value = "Veuillez remplir les champs"
    }
  }
}

</script>

<style scoped>

input[type="color"] {
  appearance: none;
  border: none;
  width: 35px;
  height: 35px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  border: 2px solid black;
  outline: none;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
</style>