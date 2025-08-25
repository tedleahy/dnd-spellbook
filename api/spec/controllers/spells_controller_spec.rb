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
        "per_page" => 20,
        "total_count" => 2,
        "total_pages" => 1,
      )
    end

    it "respects pagination parameters" do
      spells = create_list(:spell, 25)

      get :index, params: { page: 2, per_page: 10 }
      expect(response).to have_http_status(:success)

      response_data = JSON.parse(response.body)

      expect(response_data["spells"].length).to eq(10)
      expect(response_data["pagination"]["current_page"]).to eq(2)

      spell_ids = response_data["spells"].map { |x| { id: x["id"] } }
      expected_spell_ids = spells.sort_by { |spell| [ spell.level, spell.name ] }
                                 .slice(10, 10)
                                 .map { |spell| { id: spell.id } }

      expect(spell_ids).to eq(expected_spell_ids)
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
