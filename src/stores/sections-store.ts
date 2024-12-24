import { atom } from "nanostores";

export const $isSectionsOpen = atom(false);

export const setIsSectionsOpen = (value: boolean) => {
	$isSectionsOpen.set(value);
};
