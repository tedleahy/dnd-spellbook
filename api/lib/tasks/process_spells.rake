namespace :spells do
  desc "Clean up spells"
  task process: :environment do
    Spell.all.each do |spell|
      description = spell.description
      next unless description.include? '<li>'

      # insert <ul> just before first <li>
      open_ul_index = description.index('<li>') - 1
      # insert </ul> just after last </li>
      close_ul_index = description.rindex('</li>') + 4

      spell.description =
        description[0..open_ul_index] +
        '<ul>' +
        description[open_ul_index..close_ul_index] +
        '</ul>' + description[close_ul_index + 1..]
    end
  end
end