import { CategoryFilters, LevelFilters } from "@/lib/types";
import { atom } from "nanostores";

export const $searchTerm = atom("");
export const $categoryFilter = atom<CategoryFilters>("All");
export const $levelFilter = atom<LevelFilters>("All");

export const setSearchTerm = (value: string) => {
	$searchTerm.set(value);
};

export const setCategoryFilter = (value: CategoryFilters) => {
	$categoryFilter.set(value);
};

export const setLevelFilter = (value: LevelFilters) => {
	$levelFilter.set(value);
};
