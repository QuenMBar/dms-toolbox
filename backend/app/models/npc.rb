class Npc < ActiveRecord::Base
    belongs_to :campaign
    has_many :items, as: :itemable, dependent: :delete_all

    def return_everything
        nc = as_json
        nc['items'] = items.as_json
        nc
    end
end
