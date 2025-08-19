export type Spell = {
	name: string,
	source: string,
    description: string,
    level: number,
    school: string,
    is_ritual: boolean,
    casting_time: string,
    range: string,
    duration: string,
    components: string,
    higher_levels_info: string,
	spell_lists: string[],
}

export type RootStackParamList = {
	SpellList: undefined;
	SpellDetails: { spell: Spell };
}