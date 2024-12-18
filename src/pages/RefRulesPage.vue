<template>
  <q-page class="env-t">
    <div class="tw-container tw-pt-6 tw-mb-4">
      <div class="tw-relative tw-flex tw-justify-center tw-mb-6">
        <div
          @click="$router.go(-1)"
          class="tw-absolute tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2">
          <baseIcon name="back" class="tw-w-[17px] tw-h-[17px]" />
        </div>
        <div class="tw-text-h1 tw-font-bold">Правила программы</div>
      </div>
    </div>
    <div class="tw-container">
      <div class="tw-text-t2 tw-mb-3">
        Цель нашей реферальной программы – привлечь как можно больше новых
        участников в наш проект, а также способствовать активному развитию и
        росту нашей компании.
      </div>
      <div class="tw-font-bold tw-mb-3">
        Правила участия в реферальной программе
      </div>
      <ul class="tw-text-t2 tw-grid tw-gap-2 tw-list-decimal tw-pl-4">
        <li>
          Зарегистрируйтесь или войдите в свой аккаунт. Если у вас еще нет
          аккаунта, создайте его, указав свои данные.
        </li>
        <li>
          После регистрации или авторизации перейдите в раздел “Реферальная
          программа”.
        </li>
        <li>
          Скопируйте вашу уникальную реферальную ссылку или код приглашения.
        </li>
        <li>
          Поделитесь этой ссылкой или кодом с друзьями, коллегами и знакомыми,
          которых вы хотели бы пригласить в наше сообщество. Вы можете
          опубликовать эту ссылку на своих страницах в социальных сетях,
          отправить по электронной почте или через мессенджеры.
        </li>
        <li>
          Когда ваши друзья перейдут по вашей ссылке и зарегистрируются в нашем
          проекте, они автоматически станут участниками вашей реферальной
          группы.
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: "RefRulesPage",
});
</script>
