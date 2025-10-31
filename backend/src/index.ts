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


app.use(cors({
    origin:["https://bloggr.krohit.me",'http://localhost:5173'],
    credentials: true,
    allowMethods: ['GET','POST', 'PUT','DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type','Authorization'],
    exposeHeaders: ['Content-Length','X-Request-Id'],
    maxAge:86400
}))

app.use(limiter)
app.route("api/v1/user", userRouter)
app.route("api/v1/blog/",blogRouter)

function validateEnvironment(env: Bindings){
    const errors : string[] = [];
    if(!env.JWT_SECRET || env.JWT_SECRET === "undefined"){
        errors.push('JWT_SECRET is not set in Cloudflare dashboard')
    }
    if(!env.DATABASE_URL || env.DATABASE_URL === "undefined"){
        errors.push('DATBASE_URL is not set')
    }
    if(errors.length > 0){
        console.log("FATAL ERRORS",errors)
        throw new Error(errors.join(", "));
    }
}

export default{
    async fetch(request: Request, env: Bindings, ctx: any){
        try {
            validateEnvironment(env)
            return app.fetch(request, env,ctx)
        } catch (error) {
            console.error('Environment validation failed:', error);
            return new Response(
                JSON.stringify({
                    error:"server misconfigured"
                }),{
                    status:500,
                    headers:{'Content-Type':"application/json"}
                }
            )
        }
    }
}


