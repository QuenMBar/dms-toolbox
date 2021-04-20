require 'json'

class LoginController
    def initialize(env)
        @req = Rack::Request.new(env)
        # binding.pry
    end

    def path
        @req.path
    end

    #C
    def post
        # data = JSON.parse @req.body.read
        # category = Category.find_by(name: data['category'])
        # task = Task.create(text: data['text'], category: category)
        # res_task = { id: task.id, text: task.text, category: task.category.name }
        # # binding.pry
        # return 200, { 'Content-Type' => 'application/json' }, [res_task.to_json]
    end

    #R
    def get
        username = @req.env['HTTP_USERNAME']
        password = @req.env['HTTP_PASSWORD']

        dm = Dm.all.select { |d| d.username == username && d.password == password }
        if dm == []
            return 400, { 'Content-Type' => 'application/json' }, [{ message: 'Bad Request' }.to_json]
        else
            response_var = { id: dm[0].id, name: dm[0].username }
            return 200, { 'Content-Type' => 'application/json' }, [response_var.to_json]
        end
    end

    #U

    # def patch
    # #No updating in this one.
    # end

    #D
    def delete
        id = @req.path.split('/tasks/').last
        Task.find(id).delete
        return 200, { 'Content-Type' => 'application/json' }, [{ message: 'Task deleted!' }.to_json]
    end
end
