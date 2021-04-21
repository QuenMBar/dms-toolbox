require 'json'

class LoginController
    def initialize(env)
        @req = Rack::Request.new(env)
        @status = 200
        @headers = { 'Content-Type' => 'application/json' }
    end

    def path
        @req.path
    end

    def get
        username = @req.env['HTTP_USERNAME']
        password = @req.env['HTTP_PASSWORD']

        dm = Dm.all.select { |d| d.username == username && d.password == password }
        return 400, { 'Content-Type' => 'application/json' }, [{ message: 'Bad Request' }.to_json] if dm == []
        response_var = { id: dm[0].id, name: dm[0].username }
        return 200, { 'Content-Type' => 'application/json' }, [response_var.to_json]
    end
end
