import type {Pixel} from "@modules/Pixel/Domain/Pixel";
import {type Writable, writable} from "svelte/store";

export let isSelectPixelInCooldown: Writable<boolean> = writable(false);