class Campaign < ActiveRecord::Base
    belongs_to :dm
    has_many :characters
    has_many :notes, as: :noteable

    def quest_notes
        notes.where(title: 'quest')
    end

    def campaign_notes
        notes.where(title: 'campaign')
    end
end
