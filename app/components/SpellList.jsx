import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { camelCaseObjectKeys } from '../utils/objects';

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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default function SpellList() {
  const navigation = useNavigation();

  const [spells, setSpells] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    isLastPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  async function loadSpells(page = 1) {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);

    try {
      const { fetchedSpells, isLastPage } = await fetchSpells(page);

      setSpells((currentSpells) => [...currentSpells, ...fetchedSpells]);

      setPagination({
        currentPage: page,
        isLastPage,
      });
    } catch (error) {
      console.error('Failed to fetch spells:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadSpells();
  }, []);

  function loadMoreSpells() {
    if (pagination?.hasNextPage && !loading) {
      fetchSpells(pagination.currentPage + 1);
    }
  }

  const Footer = () =>
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;

  if (initialLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={spells}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SpellDetails', { spell: item })}
          >
            <Text style={styles.spellItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreSpells}
        onEndReachedThreshold={0.1}
        ListFooterComponent={Footer}
      />
    </View>
  );
}
