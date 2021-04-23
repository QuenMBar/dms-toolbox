class Campaign < ActiveRecord::Base
    belongs_to :dm
    has_many :characters
    has_many :notes, as: :noteable
    has_many :npcs

    def quest_notes
        notes.where(title: 'quest')
    end

    def campaign_notes
        notes.where(title: 'campaign')
    end

    def return_characters
        characters
            .includes(:items, :notes)
            .map do |c|
                nc = c.as_json
                nc['items'] = c.items.as_json
                nc['notes'] = c.notes.as_json
                nc
            end
    end

    def return_npcs
        npcs
            .includes(:items)
            .map do |c|
                nc = c.as_json
                nc['items'] = c.items.as_json
                nc
            end
    end
end
