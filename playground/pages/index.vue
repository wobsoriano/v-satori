<script setup>
const title = 'OG Image Generator using Nuxt and Satori'
const website = 'v3.nuxtjs.org'

const url = `/api/og?title=${title}&website=${website}`
</script>

<template>
  <div>
    <Head>
      <Meta property="og:image" :content="url" />
    </Head>
    <img :src="url" alt="hello">
  </div>
</template>
