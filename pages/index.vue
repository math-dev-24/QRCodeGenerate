<template>
  <main>
    <Form :listQrCode="qrCode.listQrCode" @addqr="addqr"/>
    <div class="grid grid-cols-2 md:grid-cols-4">
      <TheRow v-for="(qr, index) in qrCode.listQrCode" :qr="qr" :key="index" @delete="deleteElement"
        :rgbcube="qr.color" :rgbbg="qr.backgroundColor" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { qrCodeInterface } from "../shared/interface/qrCodeInterface";

const qrCode = reactive<{
  listQrCode: qrCodeInterface[]
}>({
  listQrCode: []
})

const deleteElement = (id: number) => {
  qrCode.listQrCode = qrCode.listQrCode.filter(qr => qr.id !== id)
}
const addqr = (qr: qrCodeInterface) => {
  qrCode.listQrCode.push(qr)
}

</script>
