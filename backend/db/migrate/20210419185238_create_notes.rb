class CreateNotes < ActiveRecord::Migration[5.2]
    def change
        create_table :notes do |t|
            t.references :noteable, polymorphic: true
            t.string :title
            t.string :text

            t.timestamps
        end
    end
end
