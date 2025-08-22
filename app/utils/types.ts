export type Spell = {
    name: string,
    source: string,
    description: string,
    level: number,
    school: string,
    isRitual: boolean,
    castingTime: string,
    range: string,
    duration: string,
    components: string,
    higherLevelsInfo: string,
    spellLists: string[],
}

export type RootStackParamList = {
    SpellList: undefined;
    SpellDetails: { spell: Spell };
}