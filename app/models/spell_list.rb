class SpellList < ApplicationRecord
  has_many :spell_list_spells
  has_many :spells, through: :spell_list_spells
end
