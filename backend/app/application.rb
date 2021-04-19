require 'pry'

class Application
    def call(env)
        verb = env['REQUEST_METHOD']
        resp = Rack::Response.new
        req = LoginController.new(env)

        # uninitialized constant Application::LoginController
        return resp.write 'Path Not Found' unless req.path.match(/check_login/)
        return req.send(verb.downcase) if req.path.match(/check_login/)

        # elsif req.path.match(/check_login/)
        #     # Validate login.  Pass back id if true or -1 if false
        resp.finish
    end
end
