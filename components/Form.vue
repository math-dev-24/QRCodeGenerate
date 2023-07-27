<template>
    <div class="flex flex-col gap-2 border mx-4 md:mx-8 border-slate-500 p-6 rounded bg-slate-600 text-white">
        <div class="flex flex-col">
            <label for="url">l'url :</label>
            <input type="text" v-model="url" id="url" @change="updateMessage"
                class="text-black bg-slate-200 p-0.5 rounded px-4" />
        </div>
        <div class="flex flex-col">
            <label for="name">Nom du qrCode :</label>
            <input type="text" v-model="name" id="name" @change="updateMessage"
                class="text-black bg-slate-200 p-0.5 rounded px-4" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="flex content-center items-center gap-2">
                <label for="color">Couleur des cubes :</label>
                <input type="color" v-model="colorCube" id="color">
                <input type="number" min="0" max="100" v-model="transCube" class="text-black rounded text-center bg-slate-200">%
            </div>
            <div class="flex content-center items-center gap-2">
                <label for="bgcolor">Couleur de fond :</label>
                <input type="color" id="bgcolor" v-model="colorBackground">
                <input type="number" min="0" max="100" v-model="transBg" class="text-black rounded text-center bg-slate-200">%
            </div>
        </div>
        <span v-if="message" class="text-red-500">{{ message }}</span>
        <button @click="addQRCode"
            class="bg-green-600 p-1 rounded hover:bg-green-700 duration-300 transition">Générer</button>
    </div>
</template>

<script setup lang="ts">
import { RGBA } from "lean-qr";
import { qrCodeInterface } from "../shared/interface/qrCodeInterface";

const url = ref<string>("")
const name = ref<string>("")
const colorCube = ref<string>("#000000")
const transCube = ref<number>(100)
const colorBackground = ref<string>('#ffffff')
const transBg = ref<number>(100)
const message = ref<string>("")

const props = defineProps<{
    listQrCode: qrCodeInterface[]
}>()

const emit = defineEmits<{
    (e: "addqr", qrCode: qrCodeInterface): void
}>()

const updateMessage = () => {
    if (url.value.length > 0 && name.value.length > 0 && message.value == "Veuillez remplir les champs") {
        message.value = ""
    }
}

const addQRCode = () => {
    if (url.value.length > 0 && name.value.length > 0 && !props.listQrCode.find(qr => qr.url === url.value) && !props.listQrCode.find(qr => qr.name === name.value)) {
        emit("addqr", {
            id: props.listQrCode.length + 1,
            url: url.value,
            name: name.value,
            color: hexToRgba(colorCube.value, transCube.value),
            backgroundColor: hexToRgba(colorBackground.value, transBg.value)
        })
        message.value = ""
    } else {
        if (!props.listQrCode.find(qr => qr.url === url.value) || !props.listQrCode.find(qr => qr.name === name.value)) {
            message.value = "Nom ou URL déjà utilisé !"
        }
        if (url.value.length === 0 || name.value.length === 0) {

            message.value = "Veuillez remplir les champs"
        }
    }
}

function hexToRgba(hex: string, transp: number = 100): RGBA {
    if (transp < 0) {
        transp = 0
    }
    if (transp > 100) {
        transp = 100
    }
    hex = hex.replace(/^#/, "");
    var red = parseInt(hex.substring(0, 2), 16);
    var green = parseInt(hex.substring(2, 4), 16);
    var blue = parseInt(hex.substring(4, 6), 16);
    return [red, green, blue, transp];
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