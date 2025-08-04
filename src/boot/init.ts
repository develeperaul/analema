import { boot } from "quasar/wrappers";
import "virtual:svg-icons-register";
import { vMaska } from "maska";
import 'animate.css';
import prettyAmount from 'src/plugins/pretty-amount';

export default boot(({ app, redirect }) => {
  app.config.globalProperties.$reload = function() {
    location.reload();
  }

  app.directive("maska", vMaska);
  app.use(prettyAmount);

  // if(!isShowedStartScreen()) {
  //   setShowedStartScreen('1');
  //   redirect({ name: 'start' });
  // }
});

function isShowedStartScreen() {
  const value = localStorage.getItem('showedStartScreen');
  return value === '1';
}

function setShowedStartScreen(value: '1' | '0') {
  localStorage.setItem('showedStartScreen', value);
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $reload: () => void,
  }
}
