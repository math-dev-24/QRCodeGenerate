<template>
    <div class="border border-slate-400 drop-shadow-xl rounded-lg flex flex-col m-6 overflow-hidden bg-white">
        <h2 class="text-xl text-center font-bold relative pt-1">
            {{ props.qr.name }}
        </h2>
        <canvas class="image-render-pixel h-full w-full" ref="canvas"></canvas>
        <div class="grid grid-cols-2 place-items-center px-2 mb-3">
            <div class="cursor-pointer border border-slate-200 bg-red-300 rounded-full p-0.5" @click="emit('delete', props.qr.id)"><img src="./../public/poubelle.png"
                    class="h-15"></div>
            <div class="cursor-pointer border border-slate-200 bg-slate-400 rounded-full p-0.5" @click="download">
                <img src="./../public/upload.png" alt="" class="h-15">
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { RGBA, generate } from "lean-qr";
import { ref, onMounted, watch } from "vue";
import { qrCodeInterface } from "../shared/interface/qrCodeInterface";

const props = defineProps<{
    qr: qrCodeInterface
}>()

const emit = defineEmits<{
    (e: 'delete', url: number): void
}>()

const blackRGBA: RGBA = [0, 0, 0, 255],
    whiteRGBA: RGBA = [255, 255, 255, 255],
    qrConfig = {
        on: blackRGBA,
        off: whiteRGBA,
    },

    canvas = ref<HTMLCanvasElement>(),
    text = ref(props.qr.url),
    filename = ref(props.qr.name);
let size = 300;

let code = generate(props.qr.url);

onMounted(() => {
    watch(text, (newText: string) => {
        code = generate(newText);
        code.toCanvas(canvas.value!, qrConfig);
    });

    code.toCanvas(canvas.value!, qrConfig);
});

async function download() {
    size = Math.min(Math.max(size, 32), 2000);

    const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d")!,
        imgData = code.toImageData(ctx, qrConfig);

    canvas.width = canvas.height = size;
    ctx.putImageData(imgData, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = "copy";

    ctx.drawImage(
        canvas,
        0,
        0,
        imgData.width,
        imgData.height,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const link = document.createElement("a");
    link.download = filename.value || "qrcode.png";
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
}
</script>