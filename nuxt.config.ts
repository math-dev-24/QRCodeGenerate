// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      title: "QR Code Generator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Générer  vos QR Codes en instantanné !",
        },
      ],
    },
  },
  modules: ["nuxt-windicss", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Poppins: true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
});
