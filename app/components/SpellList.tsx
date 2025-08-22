import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_URL } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, Spell } from "../utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { camelCaseObjectKeys } from "../utils/objects";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SpellList'>;

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
	const navigation = useNavigation<NavigationProp>();
	const [spells, setSpells] = useState<Spell[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/spells`)
			.then(response => response.json())
			.then(data => setSpells(data.map(camelCaseObjectKeys)))
			.catch(error => console.error('Failed to fetch spells:', error));
	}, []);

	const handleSpellPress = (spell: Spell) => navigation.navigate('SpellDetails', { spell });

	return (
		<View style={styles.container}>
			<FlatList
				data={spells}
				renderItem={({ item }: { item: Spell }) => (
					<TouchableOpacity
						onPress={() => handleSpellPress(item)}
					>
						<Text style={styles.spellItem}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}