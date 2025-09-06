import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 4,
    gap: 8,
  },
});

export default function FilterChipGroup({
  searchParams,
  setSearchParams,
  paramName,
  values,
}) {
  const valueIsSelected = value => searchParams?.[paramName]?.includes(value);

  function toggleSearchParam(value) {
    setSearchParams((searchParams) => ({
      ...searchParams,
      // remove if already selected, otherwise add it
      [paramName]: valueIsSelected(value)
        ? searchParams[paramName].filter((v) => v !== value)
        : [...(searchParams[paramName] || []), value],
    }));
  }

  return (
    <View style={styles.chipContainer}>
      {values.map(({ value, display }) => (
        <Chip
          key={value}
          selected={valueIsSelected(value)}
          onPress={() => toggleSearchParam(value)}
        >
          {display || value}
        </Chip>
      ))}
    </View>
  );
}
