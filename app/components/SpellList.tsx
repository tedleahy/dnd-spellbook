import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { API_URL } from "../utils/constants";

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
	const [spells, setSpells] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/spells`)
			.then(response => response.json())
			.then(data => setSpells(data))
			.catch(error => console.error('Failed to fetch spells:', error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={spells}
				renderItem={({ item }) => <Text style={styles.spellItem}>{item.name}</Text>}
			/>
		</View>
	);
}