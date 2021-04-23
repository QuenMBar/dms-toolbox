class CreateNpcs < ActiveRecord::Migration[5.2]
    def change
        create_table :npcs do |t|
            t.string :name
            t.string :appearance
            t.string :best_ability
            t.string :worst_ability
            t.string :talent
            t.string :ideal
            t.string :mannerism
            t.string :trait
            t.string :bond
            t.string :flaw
            t.belongs_to :campaign

            t.timestamps
        end
    end
end
