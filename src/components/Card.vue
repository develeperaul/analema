<template>
  <div
    @click="$router.push({ name: 'card', params: { id: '1' } })"
    class="card"
    :class="{ card__mini: mini }">
    <div class="card__img">
      <svg
        @click.stop="
          () => ($emit('favorite', 'id'), (isFavorite = !isFavorite))
        "
        class="heart"
        :class="{ heart__active: isFavorite }"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.1059 19.4728L12.103 19.4743C12.0716 19.4911 12.0362 19.5 12 19.5C11.9638 19.5 11.9284 19.4911 11.897 19.4743L11.8941 19.4728C11.7136 19.378 9.33577 18.0924 7.01071 16.0727C4.65863 14.0296 2.50014 11.3551 2.5 8.49116C2.50158 7.16922 3.03167 5.90105 3.97531 4.96504C4.9191 4.0289 6.19956 3.50156 7.53601 3.5C9.23513 3.50008 10.6967 4.22247 11.6013 5.41753L12 5.94419L12.3987 5.41753C13.3033 4.22247 14.7649 3.50008 16.464 3.5C17.8004 3.50156 19.0809 4.0289 20.0247 4.96504C20.9684 5.90111 21.4985 7.16941 21.5 8.49145C21.4997 11.3553 19.3413 14.0296 16.9893 16.0727C14.6642 18.0924 12.2864 19.378 12.1059 19.4728Z"
          fill="white"
          stroke="#181818" />
      </svg>

      <img src="/public/test.png" alt="" />
    </div>
    <div class="card__content">
      <span class="title"> 26 000 ₽ </span>
      <span class="descr">
        Стиральная машина Ariston Стиральная машина Ariston
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    mini?: boolean;
  }>(),
  {
    mini: false,
  }
);
const isFavorite = ref(false);
const tes = () => {
  console.log("test");
};
</script>
<style lang="scss" scoped>
.card {
  @apply tw-bg-card tw-rounded-10;
  &__mini {
    width: 115px;
    & .card__img {
      @apply tw-pt-3 tw-px-2 tw-pb-2;
      height: 82px;
      .heart {
        display: none;
      }
      img {
        object-fit: cover;
        height: 100%;
        margin: 0 auto;
      }
    }
    & .card__content {
      @apply tw-grid tw-gap-0.5 tw-p-2;
      .title {
        @apply tw-text-t2 tw-font-bold;
      }
      .descr {
        @apply tw-text-card-descr tw-text-t3;
        display: -webkit-box;
        -webkit-line-clamp: 2; // количество строк
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  &__img {
    @apply tw-pt-7 tw-px-2.5 tw-pb-2.5 tw-relative;
    height: 142px;
    .heart {
      @apply tw-absolute tw-top-2 tw-right-2;
      &__active path {
        fill: theme("colors.negative");
        stroke: theme("colors.negative");
      }
    }
    img {
      object-fit: cover;
      height: 100%;
      margin: 0 auto;
    }
  }
  &__content {
    @apply tw-grid tw-gap-0.5 tw-px-2.5 tw-pb-3.5 tw-pt-2;
    .title {
      @apply tw-text-t1 tw-font-bold;
    }
    .descr {
      @apply tw-text-card-descr tw-text-t2;
      display: -webkit-box;
      -webkit-line-clamp: 2; // количество строк
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
