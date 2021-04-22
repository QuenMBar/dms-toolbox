require 'json'

class SignUpController
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

        if !Dm.find_by(username: username).nil?
            return 400, { 'Content-Type' => 'application/json' }, [{ message: 'Bad Request' }.to_json]
        end

        new_dm = Dm.create(username: username, password: password)
        response_var = { id: new_dm.id, name: new_dm.username }
        return 200, { 'Content-Type' => 'application/json' }, [response_var.to_json]
    end
end
