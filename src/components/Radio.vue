<template>
  <label class="checkbox">
    <div class="checkbox__wrapper">
      <input type="radio" name="test" id="1" hidden class="checkbox__input" />
      <div class="checkbox__icon"></div>
      <span class="checkbox__label">{{ label }}</span>
    </div>
  </label>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>
<style lang="scss" scoped>
.checkbox__wrapper {
  /* меняем внешний вид курсора */
  cursor: pointer;
  /* выравниваем элементы по центру */
  display: flex;
  align-items: center;
  gap: 12px;
}

/* отдельные настройки для самого чекбокса */
.checkbox__input {
  /* устанавливаем абсолютное позиционирование */
  position: absolute;
  /* задаём высоту и ширину */
  width: 18px;
  height: 18px;
  /* делаем чекбокс непрозрачным, чтобы скрыть исходный элемент и заменить его потом нарисованным */
  opacity: 0;
  /* меняем внешний вид курсора */
  cursor: pointer;
}

/* настройки для SVG-иконки */
.checkbox__icon {
  border: 1.5px solid #dadada;
  border-radius: 9999px;
  /* размеры совпадают с размерами скрытого чекбокса */
  width: 16px;
  height: 16px;
  /* убираем ограничение по наименьшей ширине блока */
  flex-shrink: 0;
  /* разрешаем отображать содержимое за пределами блока */
  overflow: visible;
  position: relative;
}
.checkbox__icon::before {
  position: absolute;
  opacity: 0;
  content: "";
  background: #181818;
  border-radius: 9999px;
  width: 9px;
  height: 9px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* настройки для подписи чекбокса */
.checkbox__label {
  @apply tw-text-t1;
  transition: color 0.2s ease-out;
}

/* включаем возможность поставить галочку */
.checkbox__input:checked + .checkbox__icon::before {
  opacity: 1;
}
.checkbox__input:checked ~ .checkbox__label {
}
.checkbox__input:checked + .checkbox__icon {
  border-color: #181818;
}
</style>
