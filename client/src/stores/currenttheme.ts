import { writable } from "svelte/store";

const currentTheme = writable<string>();
export {currentTheme}