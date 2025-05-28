<template>
  <q-page>
    <div class="tw-max-w-[500px] tw-mx-auto">
      <swiper
        :space-between="0"
        :modules="[Pagination, EffectFade]"
        :pagination="{
          el: '.swiper-pagination',
        }"
        class="tw-h-screen">
        <swiper-slide
          style="
            background: linear-gradient(
              99.66deg,
              #e1e1fd -1.66%,
              #b2b2ef 107.46%
            );
          ">
          <div class="tw-flex tw-flex-col tw-justify-between tw-h-full env-t">
            <div></div>
            <div>
              <img
                class="tw-w-full tw-max-w-[330px] tw-mx-auto"
                src="~assets/images/slides/1.png"
                alt=""
              />
            </div>
            <h2
              class="tw-absolute slide-pb tw-text-center tw-w-full">
              Покупайте, продавайте и <br />
              зарабатывайте вместе с нами
            </h2>
            <div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 375 278"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M63.4665 22.9728C36.5 22.9728 18.5146 33.1743 -1 49.3469V278H376V22.9728C355.912 13.31 344.618 5.81867 322.364 2.07255C304.11 -1.00021 293.273 -0.36319 274.917 2.07255C242.237 6.40879 228.898 26.3155 196.525 32.4276C182.01 35.1682 173.657 35.8701 158.877 36.4086C121.249 37.7795 101.083 22.9728 63.4665 22.9728Z"
                  fill="white" />
              </svg>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide
          style="
            background: linear-gradient(
              98.03deg,
              #ffefd2 -8.55%,
              #edc39b 107.51%
            );
          ">
          <div class="tw-flex tw-flex-col tw-justify-between tw-h-full env-t">
            <div></div>
            <div>
              <img
                class="tw-w-full tw-max-w-[450px] tw-mx-auto"
                src="~assets/images/slides/2.png"
                alt=""
              />
            </div>
            <h2
              class="tw-absolute slide-pb tw-text-center tw-w-full">
              Каталог с уникальными <br />
              товарами и лучшими ценами
            </h2>
            <div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 375 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0C153 46 230.5 41.5 375 0V278.5H0V0Z" fill="white" />
              </svg>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide
          style="
            background: linear-gradient(
              98.03deg,
              #ffefd2 -8.55%,
              #edc39b 107.51%
            );
          ">
          <div class="tw-flex tw-flex-col tw-justify-between tw-h-full env-t">
            <div></div>
            <div>
              <img
                class="tw-w-full tw-max-w-[360px] tw-mx-auto"
                src="~assets/images/slides/3.png"
                alt=""
              />
            </div>
            <h2
              class="tw-absolute slide-pb tw-text-center tw-w-full">
              Экспресс-оценка товара <br />
              нейросетью за 30 секунд
            </h2>
            <div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 375 286"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 31.125C140.5 -10.3749 242 -10.3751 375 31.125V309.625H0V31.125Z"
                  fill="white" />
              </svg>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide
          style="
            background: linear-gradient(
              99.66deg,
              #e1e1fd -1.66%,
              #b2b2ef 107.46%
            );
          ">

          <div class="tw-flex tw-flex-col tw-justify-between tw-h-full env-t">
            <div></div>
            <div>
              <img
                class="tw-w-full tw-max-w-[470px] tw-mx-auto"
                src="~assets/images/slides/4.png"
                alt=""
              />
            </div>
            <div class="tw-absolute slide-pb tw-text-center tw-w-full tw-px-4">
              <h2>
                Зарабатывайте с нашей <br />
                реферальной программой
              </h2>
              <BaseButton class="tw-mt-6" text="Продолжить" to="/" />
            </div>
            <div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 375 278"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M311.534 22.9728C347.5 22.9728 356.485 33.1743 376 49.3469V278H-1V22.9728C19.088 13.31 30.3824 5.81867 52.6361 2.07255C70.8897 -1.00021 81.7269 -0.36319 100.083 2.07255C132.763 6.40879 146.102 26.3155 178.475 32.4276C192.99 35.1682 201.343 35.8701 216.123 36.4086C253.751 37.7795 273.917 22.9728 311.534 22.9728Z"
                  fill="white" />
              </svg>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SW } from "swiper";
import { useRouter } from "vue-router";
import BaseButton from "src/components/BaseButton.vue";

const router = useRouter();
const sw = ref<SW | null>(null);
const activeInd = ref(0);
const onSwiper = (swiper: SW) => {
  sw.value = swiper;
  activeInd.value = swiper.activeIndex;
};

const onSlideChange = (swiper: SW) => {
  activeInd.value = swiper.activeIndex;
};

const next = () => {
  if (sw.value) {
    sw.value.slideNext();
    activeInd.value = sw.value.activeIndex;
  }
};
const signIn = () => {
  window.localStorage.setItem("first", "1");
  router.push({ name: "home" });
};

onMounted(() => {
  if (sw.value) {
    // sw.value.slideNext();
  }
});
</script>
<style lang="scss">
.slide-pb {
  bottom: calc(env(safe-area-inset-bottom, 0px) + 80px) !important;
}

.swiper-pagination {
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 30px) !important;
  display: flex;
  gap: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  display: block;
  background: #dcdceb;
  border-radius: 9999px;
}
.swiper-pagination-bullet-active {
  background: #181818;
}
</style>
