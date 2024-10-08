import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel'
import  { AuthConfig , initAuthConfig } from "@hono/auth-js"
import authConfig from '@/auth.config'


//routes

import  UserRoutes  from "@/app/api/[[...routes]]/user"


///
export const runtime = 'edge'
// export const runtime = 'node'

function getAuthConfig(c:Context) : AuthConfig{
 return {
    secret : process.env.AUTH_SECRET,
    ...authConfig
 }
}
const app = new Hono().basePath('/api')
const  routes=app.route('/user',UserRoutes)
app.use("*",initAuthConfig(getAuthConfig))





export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)