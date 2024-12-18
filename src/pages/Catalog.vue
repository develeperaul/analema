<template>
  <q-page class="env-t">
    <div class="tw-container tw-grid">
      <BaseHeader title="Каталог" />

      <!-- <h2 class="tw-flex tw-justify-center tw-pt-3">Каталог</h2> -->
      <SelectCategory class="tw-mb-5" />
      <template v-if="tab">
        <TabItemList v-model="tab" :options="tabs" class="tw-mb-3.5" />
        <TabBody v-model="tab" class="tw-mb-6">
          <TabContent name="1">
            <div class="tw-gap-x-2.5 tw-gap-y-4 tw-grid tw-grid-cols-2">
              <Card v-for="n in 6" @favorite="favorite" />
            </div>
          </TabContent>
        </TabBody>
      </template>

      <div v-else class="tw-gap-x-2.5 tw-gap-y-4 tw-grid tw-grid-cols-2">
        <Card v-for="n in 6" @favorite="favorite" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TabItemList from "src/components/TabItemList.vue";

defineOptions({
  name: "IndexPage",
});
const open = ref(false);
const isOpenModal = ref(true);
const tab = ref<string | null>("1");
const tabs = [
  {
    name: "1",
    label: "Кольца",
  },
  {
    name: "2",
    label: "Серьги",
  },
  {
    name: "3",
    label: "Браслеты",
  },
];

const favorite = (id) => {
  console.log(id);
};
</script>
<style lang="scss"></style>
