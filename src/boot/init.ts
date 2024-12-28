import { boot } from "quasar/wrappers";
import "virtual:svg-icons-register";
import { vMaska } from "maska";
import 'animate.css';
import prettyAmount from 'src/plugins/pretty-amount';

export default boot(({ app }) => {
  app.directive("maska", vMaska);
  app.use(prettyAmount);
});
