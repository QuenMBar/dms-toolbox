require 'json'

class NoteController
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

    def post
      data = JSON.parse @req.body.read
      camp = Campaign.find(data["campId"])
      note = Note.create(text: data["text"], title:data["title"], noteable: camp )

      return @status, @headers, [note.to_json]
    end

    def patch
    end 

    def delete
        return @status, @headers,  [{ message: 'Task deleted!' }.to_json]
    end
end