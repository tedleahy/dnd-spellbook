import { Divider, List } from 'react-native-paper';
import FilterChipGroup from './spell-list-filters/FilterChipGroup';
import { useState } from 'react';

export default function SpellListFilterDrawer({
  searchParams,
  setSearchParams,
}) {
  const [accordionsExpanded, setAccordionsExpanded] = useState({
    level: true,
    school: true,
  });

  return (
    <>
      <List.Accordion
        title="Level"
        expanded={accordionsExpanded.level}
        onPress={() => setAccordionsExpanded(prev => ({ ...prev, level: !prev.level, }))}
      >
        <FilterChipGroup
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          paramName="levels"
          values={[
            { value: 0, display: 'Cantrip' },
            { value: 1, display: '1st Level' },
            { value: 2, display: '2nd Level' },
            { value: 3, display: '3rd Level' },
            { value: 4, display: '4th Level' },
            { value: 5, display: '5th Level' },
            { value: 6, display: '6th Level' },
            { value: 7, display: '7th Level' },
            { value: 8, display: '8th Level' },
            { value: 9, display: '9th Level' },
          ]}
        />
      </List.Accordion>

      <Divider style={{ marginVertical: 16 }} />

      <List.Accordion
        title="School of Magic"
        expanded={accordionsExpanded.school}
        onPress={() => setAccordionsExpanded(prev => ({ ...prev, school: !prev.school, }))}
      >
        <FilterChipGroup
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          paramName="schools"
          values={[
            { value: 'Abjuration' },
            { value: 'Conjuration' },
            { value: 'Divination' },
            { value: 'Enchantment' },
            { value: 'Evocation' },
            { value: 'Illusion' },
            { value: 'Necromancy' },
            { value: 'Transmutation' },
          ]}
        />
      </List.Accordion>
    </>
  );
}
