class CreateItems < ActiveRecord::Migration[5.2]
    def change
        create_table :items do |t|
            t.string :name
            t.string :description
            t.references :itemable, polymorphic: true

            t.timestamps
        end
    end
end
