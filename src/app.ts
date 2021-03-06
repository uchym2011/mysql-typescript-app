import express from 'express';
import { Application } from 'express';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';
import TaskRoutes from './routes/task.routes';
import UserRoutes from './routes/user.routes';
import ProjectRoutes from './routes/project.routes';

export class App {
    
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middlewares() {
        this.app.use(morgan('dev'));
        //this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        //this.app.use('/posts',PostRoutes); 
        this.app.use('/tasks',TaskRoutes);
        //this.app.use('/user',UserRoutes);
        this.app.use('/projects',ProjectRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Serwer działa na porcie: ', this.app.get('port'));
    }
}