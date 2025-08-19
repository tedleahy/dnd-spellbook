class CreateSpellListSpells < ActiveRecord::Migration[8.0]
  def change
    create_table :spell_list_spells do |t|
      t.references :spell, null: false, foreign_key: true
      t.references :spell_list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
