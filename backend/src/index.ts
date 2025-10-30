import { Hono } from 'hono'
import { userRouter } from './routes/userRouter'
import { blogRouter } from './routes/blogRouter';
import {cors} from "hono/cors"
import { limiter } from './rateLimiter';

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
    RATE_LIMITER: any;
}
const app = new Hono<{Bindings: Bindings}>()

app.use(cors())
app.use(limiter)
app.route("api/v1/user", userRouter)
app.route("api/v1/blog/",blogRouter)

export default app
