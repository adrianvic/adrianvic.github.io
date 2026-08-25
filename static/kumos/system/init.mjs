import "../apps/pkg.mjs"; 
import { Process } from "../kernel.mjs";
import interactiveLogin from "./targets/interactive-login.mjs";

function init(p) {
    console.log("Welcome to KumOS!");
    interactiveLogin(p);
}

new Process("init", init);