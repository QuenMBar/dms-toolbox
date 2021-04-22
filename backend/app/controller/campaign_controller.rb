require 'json'

class CampaignController
    def initialize(env)
        @req = Rack::Request.new(env)
        @id = get_id
        @status = 200
        @headers = {'Content-Type' => 'application/json'}
    end

    def get_id
        @req.path.split('/').last.to_i 
    end 

    def path
        @req.path
    end

    def empty_check el
        el.length == 0? "No Notes" : el
    end 

    def get
        camp = Campaign.find(@id)
        q_notes, c_notes = camp.quest_notes, camp.campaign_notes
        empty_check q_notes
        empty_check c_notes
        res = {qNotes: q_notes, cNotes: c_notes}
        return @status, @headers, [res.to_json]
    end

    def delete
        id = @req.path.split('/tasks/').last
        Task.find(id).delete
        return @status, @headers,  [{ message: 'Task deleted!' }.to_json]
    end
end