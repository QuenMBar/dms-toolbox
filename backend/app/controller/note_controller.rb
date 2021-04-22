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

    def patch 
        data = JSON.parse @req.body.read
        n = Note.find(@id)
        n.update(text: data["text"])
        return @status, @headers,  [{ message: 'Note updated!' }.to_json]
    end

    def post
      data = JSON.parse @req.body.read
      camp = Campaign.find(data["campId"])
      note = Note.create(text: data["text"], title:data["title"], noteable: camp )
      return @status, @headers, [note.to_json]
    end

    def get
        n = Note.find(@id)
        note = {text: n.text, title: n.title, noteable: n.noteable.id}
        return @status, @headers,  [note.to_json]
    end 

    def delete
        Note.find(@id).delete
        return @status, @headers,  [{ message: 'Note deleted!' }.to_json]
    end


end