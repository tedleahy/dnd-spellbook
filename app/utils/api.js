import { API_URL } from "./constants";
import { camelCaseObjectKeys } from "./objects";

export async function fetchSpells(page = 1) {
    const response = await fetch(`${API_URL}/spells?page=${page}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch spells: ${response.status} ${response.statusText}`);
    }

    const { spells, pagination } = await response.json();

    return {
        fetchedSpells: spells.map(camelCaseObjectKeys),
        isLastPage: pagination.is_last_page,
    }
}
