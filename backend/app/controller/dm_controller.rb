require 'json'

class DmController
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

    def get
        camp_instances = Dm.find(@id).campaigns
        camp_details = camp_instances.map{|c| {name:c.name, id: c.id}}
        return @status, @headers, [camp_details.to_json]
    end

    def delete
        id = @req.path.split('/tasks/').last
        Task.find(id).delete
        return @status, @headers,  [{ message: 'Task deleted!' }.to_json]
    end
end
