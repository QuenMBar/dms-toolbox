class CreateCharacters < ActiveRecord::Migration[5.2]
    def change
        create_table :characters do |t|
            t.string :name
            t.string :klass
            t.string :language
            t.string :race
            t.string :alignment
            t.integer :armor_class
            t.integer :level
            t.integer :strength
            t.integer :dexterity
            t.integer :constitution
            t.integer :intelligence
            t.integer :wisdom
            t.integer :charisma
            t.string :background

            t.belongs_to :campaign
            t.timestamps
        end
    end
end
