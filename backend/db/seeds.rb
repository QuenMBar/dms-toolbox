puts 'Clearing old data...'

Campaign.destroy_all
Character.destroy_all
Item.destroy_all
Note.destroy_all
Dm.destroy_all

##Random number generator
def set_stat(a, b)
    rand(a..b)
end
#assigns a random item
def item_variety
    item = [
        Faker::Games::ElderScrolls.jewelry,
        Faker::Games::ElderScrolls.weapon,
        Faker::Games::Heroes.artifact,
        Faker::Games::Zelda.item,
        Faker::Games::DnD.melee_weapon,
    ]
    item[rand(0..item.length)]
end

puts 'Nerd Factory 🧙🏻‍♂️🧙🏾‍♀️🧙🏻‍♂️'
3.times { Dm.create(username: Faker::Name.name, password: Faker::Lorem.word) }

puts 'Initiating Campaigns 🗺'
5.times { Campaign.create(name: Faker::Games::DnD.city, dm: Dm.all.sample) }

puts 'Seeding Characters 🧝🏻‍♂️🧝🏽‍♀️🧝🏽‍🧝🏾‍♂️'
15.times do
    Character.create(
        name: Faker::Books::Dune.character,
        klass: Faker::Games::DnD.klass,
        race: Faker::Games::DnD.race,
        alignment: Faker::Games::DnD.alignment,
        language: Faker::Games::DnD.language,
        armor_class: set_stat(8, 22),
        level: set_stat(1, 20),
        strength: set_stat(10, 18),
        dexterity: set_stat(10, 18),
        constitution: set_stat(10, 18),
        intelligence: set_stat(10, 18),
        wisdom: set_stat(10, 18),
        charisma: set_stat(10, 18),
        background: Faker::Games::DnD.background,
        campaign: Campaign.all.sample,
    )
end

puts 'Writing Notes ✍🏻'
10.times do
    Note.create(text: Faker::Books::Dune.quote, title: 'character', noteable: Character.all.sample)
    Note.create(text: Faker::Books::Dune.saying, title: 'campaign', noteable: Campaign.all.sample)
    Note.create(text: Faker::Books::Dune.saying, title: 'quest', noteable: Campaign.all.sample)
end
puts 'Forging Items 🔨'
50.times { Item.create(name: item_variety, description: Faker::Lorem.sentence, itemable: Character.all.sample) }

puts '🌱 Done Seeding 🌱'
