<template>
  <q-page>
    <div class="tw-container">
      <Toolbar class="tw-mb-6" title="Мои данные" showBack>
        <template #actions>
          <button class="remove" @click="showedDelete = true">
            <BaseIcon name="delete" fit color="tw-fill-brown" />
          </button>
        </template>
      </Toolbar>
      <FormUpdate />
      <ModalDelete v-model="showedDelete" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import FormUpdate from 'src/components/Profile/FormUpdate.vue';
  import ModalDelete from 'src/components/Profile/ModalDelete.vue';

  const showedDelete = ref(false);
</script>

<style scoped lang="scss">
  .remove {
    width: 32px;
    height: 32px;
    padding: 6px;
  }
</style>
