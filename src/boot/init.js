import "virtual:svg-icons-register";
import { vMaska } from "maska";

export default async ({ app }) => {
  app.directive("maska", vMaska);
};
