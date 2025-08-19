FactoryBot.define do
  factory :spell do
    name { Faker::Superhero.name }
    source { [ "Player's Handbook", "Tasha's Cauldron of Everything", "Xanathar's Guide to Everything" ].sample }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    level { Faker::Number.between(from: 0, to: 9) }
    school {
      [
        "conjuration",
        "evocation",
        "illusion",
        "divination",
        "necromancy",
        "transmutation",
        "enchantment",
        "abjuration",
      ].sample
    }
    is_ritual { [ true, false ].sample }
    casting_time { [ "1 action", "1 bonus action", "1 reaction", "1 minute", "10 minutes", "1 hour" ].sample }
    range { [ "Self", "Touch", "30 feet", "60 feet", "120 feet", "150 feet", "300 feet", "1 mile" ].sample }
    duration { [ "Instantaneous", "1 minute", "10 minutes", "1 hour", "8 hours", "24 hours", "Concentration, up to 1 minute" ].sample }
    components { [ "V", "S", "M", "V, S", "V, M", "S, M", "V, S, M" ].sample + " (#{Faker::Lorem.words(number: 3).join(' ')})" }
    higher_levels_info { Faker::Lorem.sentence(word_count: 10) }
  end
end
