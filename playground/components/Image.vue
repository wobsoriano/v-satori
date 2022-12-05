<script setup>
defineProps({
  title: String,
  website: String,
})
</script>

<template>
  <div tw="h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50">
    <div tw="flex items-start justify-start h-full">
      <div tw="flex flex-col justify-between w-full h-full'">
        <h1 tw="text-[80px] p-20 font-black text-left">
          {{ title }}
        </h1>
        <div tw="text-2xl pb-10 px-20 font-bold mb-0">
          {{ website }}
        </div>
      </div>
    </div>
  </div>
</template>
