import { FlatList, StyleSheet, Text, View } from "react-native";

const dummySpells = [
	{
		id: 267,
		name: "Fireball",
		source: "Player's Handbook",
		description: "A bright streak flashes from your pointing finger ...",
		level: 3,
		school: "evocation",
		is_ritual: false,
		casting_time: "1 action",
		range: "150 feet",
		duration: "Instantaneous",
		components: "V, S, M (a tiny ball of bat guano and sulfur)",
		higher_levels_info: "When you cast this spell using a spell slot of 4th...",
		created_at: "2025-08-14 00:12:42.950920000 +0000",
		updated_at: "2025-08-14 00:12:42.950920000 +0000",
	},
	{
		id: 98,
		name: "Control Flames",
		source: "Xanathar's Guide to Everything",
		description: "You choose nonmagical flame that you can see withi...",
		level: 0,
		school: "Transmutation",
		is_ritual: false,
		casting_time: "1 action",
		range: "60 feet",
		duration: "Instantaneous or 1 hour",
		components: "S",
		higher_levels_info: "",
		created_at: "2025-08-13 23:37:52.403332000 +0000",
		updated_at: "2025-08-13 23:37:52.403332000 +0000",
	},
	{
		id: 148,
		name: "Grease",
		source: "Player's Handbook",
		description: "Slick grease covers the ground in a 10-foot square...",
		level: 1,
		school: "conjuration",
		is_ritual: false,
		casting_time: "1 action",
		range: "60 feet",
		duration: "1 minute",
		components: "V, S, M (a bit of pork rind or butter)",
		higher_levels_info: "",
		created_at: "2025-08-13 23:39:04.029678000 +0000",
		updated_at: "2025-08-13 23:39:04.029678000 +0000"
	},
	{
		id: 499,
		name: "Wish",
		source: "Player's Handbook",
		description: "Wish is the mightiest spell a mortal creature can ...",
		level: 9,
		school: "conjuration",
		is_ritual: false,
		casting_time: "1 action",
		range: "Self",
		duration: "Instantaneous",
		components: "V",
		higher_levels_info: "",
		created_at: "2025-08-14 00:18:11.735947000 +0000",
		updated_at: "2025-08-14 00:18:11.735947000 +0000"
	},
]

const DUMMY_SPELLS = [];
for (let i = 0; i < 100; i++) {
	DUMMY_SPELLS.push(...dummySpells.map(spell => ({ ...spell, id: spell.id + i * 100 })));
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
	},
	spellItem: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

export default function SpellList() {
	return (
		<View style={styles.container}>
			<FlatList
				data={DUMMY_SPELLS}
				renderItem={({ item }) => <Text style={styles.spellItem}>{item.name}</Text>}
			/>
		</View>
	)
}