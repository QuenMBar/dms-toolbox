class CreateCampaigns < ActiveRecord::Migration[5.2]
    def change
        create_table :campaigns do |t|
            t.string :name
            t.belongs_to :dm
            t.timestamps
        end
    end
end
