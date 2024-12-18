import "virtual:svg-icons-register";
import { vMaska } from "maska";
import { Form } from "vee-validate";
export default async ({ app }) => {
  console.log(vMaska);

  app.directive("maska", vMaska);
  app.component("Form", Form);
};
