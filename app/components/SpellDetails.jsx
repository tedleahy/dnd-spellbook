import { useRoute } from '@react-navigation/native';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Text, Surface, Card } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

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
    <ScrollView>
      <Surface style={{ flex: 1, padding: 16 }}>
        {/* Header Card */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
              {spell.name}
            </Text>
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
              {spell.level === 0
                ? `${spell.school} Cantrip`
                : `Level ${spell.level} ${spell.school}`}
              {spell.isRitual ? ' (Ritual)' : ''}
            </Text>
            <Text>{spell.source}</Text>
          </Card.Content>
        </Card>

        {/* Spell Stats Card */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>
              Spell Details
            </Text>

            <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
              <Text variant="labelMedium">School: </Text>
              {spell.school}
            </Text>

            <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
              <Text variant="labelMedium">Casting Time: </Text>
              {spell.castingTime}
            </Text>

            <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
              <Text variant="labelMedium">Range: </Text>
              {spell.range}
            </Text>

            <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
              <Text variant="labelMedium">Components: </Text>
              {spell.components}
            </Text>

            <Text variant="bodyMedium">
              <Text variant="labelMedium">Duration: </Text>
              {spell.duration}
            </Text>
          </Card.Content>
        </Card>

        {/* Description Card */}
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>
              Description
            </Text>
            <RenderHTML
              contentWidth={width - 64} // Account for card padding
              source={{ html: spell.description }}
              tagsStyles={descriptionStyles}
            />
          </Card.Content>
        </Card>

        {/* Higher Levels Card */}
        {spell.higherLevelsInfo && (
          <Card>
            <Card.Content>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                At Higher Levels
              </Text>
              <Text variant="bodyMedium">{spell.higherLevelsInfo}</Text>
            </Card.Content>
          </Card>
        )}
      </Surface>
    </ScrollView>
  );
}
