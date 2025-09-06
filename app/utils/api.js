import { API_URL } from "./constants";
import { camelCaseObjectKeys } from "./objects";

export async function fetchSpells(page = 1, search_params) {
    let url = `${API_URL}/spells?page=${page}`;
    url += search_params ? `&${new URLSearchParams(search_params)}` : '';

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch spells: ${response.status} ${response.statusText}`);
    }

    const { spells, pagination } = await response.json();

    return {
        fetchedSpells: spells.map(camelCaseObjectKeys),
        isLastPage: pagination.is_last_page,
    }
}
