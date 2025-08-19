require "rails_helper"

RSpec.describe SpellsController, type: :controller do
  describe "GET #index" do
    it "returns all spells" do
      fireball = create(:spell, name: "Fireball")
      grease = create(:spell, name: "Grease")

      get :index
      expect(response).to have_http_status(:success)

      spells = JSON.parse(response.body)
      expected_spells = [ fireball, grease ].map do |spell|
        spell.as_json(except: [ "created_at", "updated_at" ])
      end

      expect(spells).to eq(expected_spells)
    end
  end

  describe "GET #show" do
    let(:spell) { create(:spell) }

    it "returns the correct spell" do
      get :show, params: { id: spell.id }
      expect(response).to have_http_status(:success)

      expect(JSON.parse(response.body)).to eq(
        spell.as_json(except: [ "created_at", "updated_at" ])
      )
    end
  end
end
