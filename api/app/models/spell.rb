class Spell < ApplicationRecord
  MAX_PER_PAGE = 500

  has_many :spell_list_spells
  has_many :spell_lists, through: :spell_list_spells
end
