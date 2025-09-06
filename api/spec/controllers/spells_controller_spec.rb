require "rails_helper"

RSpec.describe SpellsController, type: :controller do
  describe "GET #index" do
    it "returns paginated spells" do
      fireball = create(:spell, name: "Fireball")
      grease = create(:spell, name: "Grease")

      get :index
      expect(response).to have_http_status(:success)

      response_data = JSON.parse(response.body)
      expected_spells = [ fireball, grease ]
        .sort_by(&:level)
        .map do |spell|
          spell.as_json(except: [ "created_at", "updated_at" ])
        end

      expect(response_data["spells"]).to eq(expected_spells)
      expect(response_data["pagination"]).to include(
        "current_page" => 1,
        "per_page"     => Spell::MAX_PER_PAGE,
        "total_pages"  => 1,
        "total_count"  => 2,
        "is_last_page" => true,
      )
    end

    it "respects pagination parameters" do
      spells = create_list(:spell, 25)
      page_number = 2
      spells_per_page = 10

      get :index, params: { page: page_number, per_page: spells_per_page }
      expect(response).to have_http_status(:success)

      response_data = JSON.parse(response.body)

      expect(response_data["spells"].length).to eq(spells_per_page)
      expect(response_data["pagination"]["current_page"]).to eq(page_number)

      spell_ids = response_data["spells"].map { |x| { id: x["id"] } }

      expect(spell_ids).to eq(expected_spell_ids(spells, page_number, spells_per_page))
    end

    describe "GET #index (with search params)" do
      it "returns spells with names matching the search term, case insensitive" do
        fireball = create(:spell, name: "Fireball")
        fire_bolt = create(:spell, name: "Fire Bolt")
        create(:spell, name: "Grease")

        get :index, params: { name: 'fire' }
        expect(response).to have_http_status(:success)

        response_data = JSON.parse(response.body)
        spell_ids = response_data["spells"].map { |x| { id: x["id"] } }

        expect(spell_ids).to eq(expected_spell_ids([ fireball, fire_bolt ]))
      end
    end
  end

  describe "GET #show" do
    let(:spell) { create(:spell) }

    it "returns the correct spell" do
      get :show, params: { id: spell.id }
      expect(response).to have_http_status(:success)

      expect(JSON.parse(response.body)).to eq(
        spell.as_json(except: %w[ created_at updated_at ])
      )
    end
  end
end

def expected_spell_ids(spells, page_number = 1, spells_per_page = Spell::MAX_PER_PAGE)
  offset = spells_per_page * (page_number - 1)

  spells.sort_by { |spell| [ spell.level, spell.name ] }
        .slice(offset, spells_per_page)
        .map { |spell| { id: spell.id } }
end
