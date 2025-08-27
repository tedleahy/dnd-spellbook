import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  header: {
    marginBottom: 16,
  },
});

const descriptionStyles = {
  p: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  ul: {
    marginBottom: 12,
  },
  li: {
    fontSize: 16,
  },
};

export default function SpellDetails() {
  const route = useRoute();
  const { spell } = route.params;
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{spell.name}</Text>
        <Text style={{ fontStyle: 'italic' }}>
          {spell.level === 0
            ? `${spell.school} Cantrip`
            : `Level ${spell.level} ${spell.school}`}
          {spell.isRitual ? ' (Ritual)' : ''}
        </Text>
      </View>

      <View style={styles.section}>
        <Text>Source: {spell.source}</Text>
      </View>

      <View style={styles.section}>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>School: </Text>
          <Text>{spell.school}</Text>
        </Text>

        <Text>
          <Text style={{ fontWeight: 'bold' }}>Casting Time: </Text>
          <Text>{spell.castingTime}</Text>
        </Text>

        <Text>
          <Text style={{ fontWeight: 'bold' }}>Range: </Text>
          <Text>{spell.range}</Text>
        </Text>

        <Text>
          <Text style={{ fontWeight: 'bold' }}>Components: </Text>
          <Text>{spell.components}</Text>
        </Text>

        <Text>
          <Text style={{ fontWeight: 'bold' }}>Duration: </Text>
          <Text>{spell.duration}</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <RenderHTML
          contentWidth={width}
          source={{ html: spell.description }}
          tagsStyles={descriptionStyles}
        />
      </View>

      {spell.higherLevelsInfo && (
        <View style={styles.section}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>At Higher Levels: </Text>
            <Text>{spell.higherLevelsInfo}</Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
