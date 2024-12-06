<template>
  <div class="popular">
    <h2 class="title">Популярные товары</h2>
    <div class="label">Хиты продаж</div>
    <div class="popular__cards">
      <div class="popular__cards--wrapper">
        <Card v-for="n in 6" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.popular {
  @apply tw-rounded-20;
  padding: 16px 18px;
  background: white;
  box-shadow: 0px 0px 20px 4px #e8e8e8;
  position: relative;
  & .title {
    margin-bottom: 10px;
  }
  & .label {
    @apply tw-text-white tw-text-t4 tw-rounded-20 tw-right-0 tw-top-0 tw-transform -tw-translate-y-1/2;
    position: absolute;
    padding: 5px 8px;
    background: #fa3224;
  }
  &__cards {
    overflow: hidden;
    margin-inline: -16px;
    &--wrapper {
      @apply tw-flex tw-overflow-auto tw-gap-2;
      & > * {
        flex-shrink: 0;
        &:first-child {
          margin-left: 16px;
        }
        &:last-child {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
