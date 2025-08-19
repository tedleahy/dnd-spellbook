class Spell < ApplicationRecord
  has_many :spell_list_spells
  has_many :spell_lists, through: :spell_list_spells
end
