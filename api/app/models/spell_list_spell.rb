class SpellListSpell < ApplicationRecord
  belongs_to :spell
  belongs_to :spell_list
end
