import express, { Request, Response } from 'express'
import redis from 'redis'

const app = express()
const client = await redis.createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
}).connect();


app.get('/', async (req: Request, res: Response) => {
    await client.incr('visits')
        .catch(err => {
            console.error('Redis error:', err);
            return res.status(500).send('Internal Server Error');
        })

    const visits = await client.get('visits')

    res.send(`<h2>Number of visits: ${visits}</h2>`)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
