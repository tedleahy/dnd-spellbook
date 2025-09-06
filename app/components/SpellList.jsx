import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Modal,
  Searchbar,
} from 'react-native-paper';
import { fetchSpells } from '../utils/api';
import SpellListFilterDrawer from './SpellListFilterDrawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  const [searchParams, setSearchParams] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);

  async function loadSpells(searchParams) {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);

    try {
      const { fetchedSpells, isLastPage } = await fetchSpells(
        pagination.currentPage,
        searchParams,
      );

      setSpells(fetchedSpells);

      setPagination({
        currentPage: pagination.currentPage,
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
    loadSpells(searchParams);
  }, [searchParams]);

  function loadMoreSpells() {
    if (pagination?.hasNextPage && !loading) {
      fetchSpells(pagination.currentPage + 1, searchParams);
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
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ margin: 8, marginBottom: 0 }}
        placeholder="Search Spells..."
        onChangeText={(query) => setSearchParams({ name: query })}
        value={searchParams.name}
      />

      <Button
        icon="filter"
        mode="outlined"
        onPress={() => setDrawerVisible(true)}
        style={{ margin: 8 }}
      >
        Filter
      </Button>

      <FlatList
        data={spells}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.name}
              titleStyle={{ fontSize: 18 }}
              onPress={() =>
                navigation.navigate('SpellDetails', { spell: item })
              }
            />
            <Divider />
          </>
        )}
        onEndReached={loadMoreSpells}
        onEndReachedThreshold={0.1}
        ListFooterComponent={Footer}
      />

      <Modal
        visible={drawerVisible}
        onDismiss={() => setDrawerVisible(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          margin: 20,
          borderRadius: 8,
        }}
      >
        <SpellListFilterDrawer
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Modal>
    </View>
  );
}
