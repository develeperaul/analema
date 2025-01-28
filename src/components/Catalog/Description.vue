<template>
  <div>
    <ChipList class="tw-mb-[14px]" :items="tabs" :activeItem="activeTab" @change:item="activeTab = $event" />
    <div v-if="activeTab?.value === '1'" class="tw-text-t2 tw-space-y-[10px]">
      <div
        v-for="(value, key) in properties"
        class="tw-flex tw-gap-[30px]"
      >
        <p class="tw-text-card-descr tw-w-full tw-max-w-[120px]">{{ key }}</p>
        <p class="tw-w-full">{{ value ? value : '-' }}</p>
      </div>
    </div>
    <p v-else-if="activeTab?.value === '2'" class="tw-text-t2 tw-text-base">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import type { CatalogShowedProp } from 'src/repositories/catalog';
  import ChipList, { type Item as ChipItem } from 'src/components/Base/ChipList.vue';

  const props = defineProps<{
    properties: Record<string, CatalogShowedProp>,
    text: string,
  }>();

  const tabs = computed(() => {
    const res: ChipItem[] = [];
    if(Object.keys(props.properties).length > 0) {
      res.push({ label: 'Характеристики', value: '1'});
    }
    if(props.text) {
      res.push({ label: 'Описание', value: '2'});
    }

    return res;
  });

  const activeTab = ref<ChipItem | null>(tabs.value[0] ?? null);
</script>
