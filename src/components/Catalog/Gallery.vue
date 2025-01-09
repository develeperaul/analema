<template>
  <Swiper
    :slidesPerView="1.1"
    :spaceBetween="8"
  >
    <SwiperSlide v-for="image in images">
      <Image class="tw-rounded-20 tw-overflow-hidden" imgClass="tw-w-full" :width="width" :height="height" :src="image" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';

  defineProps<{
    width?: number | string,
    height?: number | string,
    images: string[],
  }>();
</script>
