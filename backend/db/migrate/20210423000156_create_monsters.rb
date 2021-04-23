class CreateMonsters < ActiveRecord::Migration[5.2]
    def change
        create_table :monsters do |t|
            t.string :name
            t.string :meta
            t.string :armor_class
            t.string :hit_points
            t.string :speed
            t.string :stats
            t.string :senses
            t.string :languages
            t.string :challenge
            t.string :traits
            t.string :actions
            t.string :legendary_actions
            t.string :img_url

            t.timestamps
        end
    end
end
