puts 'Clearing old data...'
Item.destroy_all
Note.destroy_all
Character.destroy_all
Npc.destroy_all
Campaign.destroy_all
Dm.destroy_all
Monster.destroy_all

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

appearences = [
    'Distinctive jewelry: earrings, necklace, circlet, bracelets',
    'Piercings',
    'Flamboyant or outlandish clothes',
    'Formal, clean clothes',
    'Ragged, dirty clothes',
    'Pronounced scar',
    'Missing teeth',
    'Missing fingers',
    'Unusual eye color (or two different colors)',
    'Tattoos',
    'Birthmark',
    'Unusual skin color',
    'Bald',
    'Braided beard or hair',
    'Unusual hair color',
    'Nervous eye twitch',
    'Distinctive nose',
    'Distinctive posture (crooked or rigid)',
    'Exceptionally beautiful',
    'Exceptionally ugly',
]

high_abilitys = [
    'Strength — powerful, brawny, strong as an ox',
    'Dexterity — lithe, agile, graceful',
    'Constitution — hardy, hale, healthy',
    'Intelligence — studious, learned, inquisitive',
    'Wisdom — perceptive, spiritual, insightful',
    'Charisma — persuasive, forceful, born leader',
]

low_abilitys = [
    'Strength — feeble, scrawny',
    'Dexterity — clumsy, fumbling',
    'Constitution — sickly, pale',
    'Intelligence — dim-witted, slow',
    'Wisdom — oblivious, absentminded',
    'Charisma — dull, boring',
]

talents = [
    'Plays a musical instrument',
    'Speaks several languages fluently',
    'Unbelievably lucky',
    'Perfect memory',
    'Great with animals',
    'Great with children',
    'Great at solving puzzles',
    'Great at one game',
    'Great at impersonations',
    'Draws beautifully',
    'Paints beautifully',
    'Sings beautifully',
    'Drinks everyone under the table',
    'Expert carpenter',
    'Expert cook',
    'Expert dart thrower and rock skipper',
    'Expert juggler',
    'Skilled actor and master of disguise',
    'Skilled dancer',
    'Knows thieves’ cant',
]

mannerisms = [
    'Prone to singing, whistling, or humming quietly',
    'Speaks in rhyme or some other peculiar way',
    'Particularly low or high voice',
    'Slurs words, lisps, or stutters',
    'Enunciates overly clearly',
    'Speaks loudly',
    'Whispers',
    'Uses flowery speech or long words',
    'Frequently uses the wrong word',
    'Uses colorful oaths and exclamations',
    'Makes constant jokes or puns',
    'Prone to predictions of doom',
    'Fidgets',
    'Squints',
    'Stares into the distance',
    'Chews something',
    'Paces',
    'Taps fingers',
    'Bites fingernails',
    'Twirls hair or tugs beard',
]

traits = [
    'Argumentative',
    'Arrogant',
    'Blustering',
    'Rude',
    'Curious',
    'Friendly',
    'Honest',
    'Hot tempered',
    'Irritable',
    'Ponderous',
    'Quiet',
    'Suspicious',
]

ideals = [
    'Beauty',
    'Domination',
    'Charity',
    'Greed',
    'Greater good',
    'Might',
    'Life',
    'Pain',
    'Respect',
    'Retribution',
    'Self-sacrifice',
    'Slaughter',
    'Community',
    'Change',
    'Fairness',
    'Creativity',
    'Honor',
    'Freedom',
    'Logic',
    'Independence',
    'Responsibility',
    'No limits',
    'Tradition',
    'Whimsy',
    'Balance',
    'Aspiration',
    'Knowledge',
    'Discovery',
    'Live and let live ',
    'Glory',
    'Moderation',
    'Nation',
    'Neutrality',
    'Redemption',
    'People',
    'Self-knowledge',
]

bonds = [
    'Dedicated to fulfilling a personal life goal',
    'Protective of close family members',
    'Protective of colleagues or compatriots',
    'Loyal to a benefactor, patron, or employer',
    'Captivated by a romantic interest',
    'Drawn to a special place',
    'Protective of a sentimental keepsake',
    'Protective of a valuable possession',
    'Out for revenge',
]

flaws = [
    'Forbidden love or susceptibility to romance',
    'Enjoys decadent pleasures',
    'Arrogance',
    'Envies another creature’s possessions or station',
    'Overpowering greed',
    'Prone to rage',
    'Has a powerful enemy',
    'Specific phobia',
    'Shameful or scandalous history',
    'Secret crime or misdeed',
    'Possession of forbidden lore',
    'Foolhardy bravery',
]

puts 'Nerd Factory 🧙🏻‍♂️🧙🏾‍♀️🧙🏻‍♂️'
Dm.create(username: 'a', password: 'a')
3.times { Dm.create(username: Faker::Name.name, password: Faker::Lorem.word) }

puts 'Initiating Campaigns 🗺'
15.times { Campaign.create(name: Faker::Games::DnD.city, dm: Dm.all.sample) }

puts 'Seeding Characters 🧝🏻‍♂️🧝🏽‍♀️🧝🏽‍🧝🏾‍♂️'
80.times do
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
180.times do
    Note.create(text: Faker::Books::Dune.quote, title: 'character', noteable: Character.all.sample)
    Note.create(text: Faker::Books::Dune.saying, title: 'campaign', noteable: Campaign.all.sample)
    Note.create(text: Faker::Books::Dune.saying, title: 'quest', noteable: Campaign.all.sample)
end

puts 'Making Npcs 👨‍🔧'
100.times do
    Npc.create(
        name: Faker::Name.first_name,
        appearance: appearences.sample,
        best_ability: high_abilitys.sample,
        worst_ability: low_abilitys.sample,
        talent: talents.sample,
        ideal: ideals.sample,
        mannerism: mannerisms.sample,
        trait: traits.sample,
        bond: bonds.sample,
        flaw: flaws.sample,
        campaign: Campaign.all.sample,
    )
end

puts 'Forging Items 🔨'
400.times do
    Item.create(name: item_variety, description: Faker::Lorem.sentence, itemable: Character.all.sample)
    Item.create(name: item_variety, description: Faker::Lorem.sentence, itemable: Npc.all.sample)
end

puts 'Seeding Monsters 💀'
file = File.read('monsters.json')
data_hash = JSON.parse(file)

data_hash.each do |m|
    Monster.create(
        name: m['name'],
        meta: m['meta'],
        armor_class: m['Armor Class'],
        hit_points: m['Hit Points'],
        speed: m['Speed'],
        stats:
            "#{m['STR']}#{m['STR_mod']},#{m['DEX']}#{m['DEX_mod']},#{m['CON']}#{m['CON_mod']},#{m['INT']}#{m['INT_mod']},#{m['WIS']}#{m['WIS_mod']},#{m['CHA']}#{m['CHA_mod']}",
        senses: m['Senses'],
        languages: m['Languages'],
        challenge: m['Challenge'],
        traits: m['Traits'],
        actions: m['Actions'],
        legendary_actions: m['Legendary Actions'],
        img_url: m['img_url'],
    )
end

puts '🌱 Done Seeding 🌱'
