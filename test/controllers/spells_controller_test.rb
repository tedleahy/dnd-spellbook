require "test_helper"

class SpellsControllerTest < ActionDispatch::IntegrationTest
  test "should return all spells" do
    fireball = Spell.create!(
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
    )

    grease = Spell.create!(
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
    )

    get spells_url
    assert_response :success

    spells = JSON.parse(@response.body)

    expected_spells = [ fireball, grease ].map do |spell|
      spell.as_json(except: [ "created_at", "updated_at" ])
    end

    assert_equal expected_spells, spells
  end
end
