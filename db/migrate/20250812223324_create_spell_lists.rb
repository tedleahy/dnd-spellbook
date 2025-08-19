class CreateSpellLists < ActiveRecord::Migration[8.0]
  def change
    create_table :spell_lists do |t|
      t.string :name

      t.timestamps
    end
  end
end
