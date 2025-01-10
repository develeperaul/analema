<template>
  <router-link class="item" to="/">
    <span class="icon-wrap">
      <BaseIcon name="plus" fit color="#DFA543" />
    </span>
    <span class="tw-text-t1 tw-text-base">Приглашенные друзья</span>
  </router-link>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 0 20px 4px #e8e8e8;
    cursor: pointer;
    @apply tw-rounded-20 tw-bg-white tw-p-4;
  }

  .icon-wrap {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 6px;
    background: #FFF3DD;
  }
</style>
