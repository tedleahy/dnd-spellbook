class CreateSpells < ActiveRecord::Migration[8.0]
  def change
    create_table :spells do |t|
      t.string :name
      t.text :source
      t.text :description
      t.integer :level
      t.string :school
      t.boolean :is_ritual
      t.string :casting_time
      t.string :range
      t.string :duration
      t.string :components
      t.text :higher_levels_info

      t.timestamps
    end
  end
end
