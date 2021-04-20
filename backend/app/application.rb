require 'pry'

class Application
    def call(env)
        verb = env['REQUEST_METHOD']
        resp = Rack::Response.new
        req = LoginController.new(env)

        # uninitialized constant Application::LoginController
        unless req.path.match(/check_login/)
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'Bad Request' }]
        end
        return req.send(verb.downcase) if req.path.match(/check_login/)

        resp.finish
    end
end
