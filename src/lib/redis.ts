import Redis from "ioredis"

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis

// Helper functions for common Redis operations
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key)
    if (!data) return null
    try {
      return JSON.parse(data) as T
    } catch {
      return data as T
    }
  },

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const serialized = typeof value === "string" ? value : JSON.stringify(value)
    if (ttlSeconds) {
      await redis.setex(key, ttlSeconds, serialized)
    } else {
      await redis.set(key, serialized)
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key)
  },

  async exists(key: string): Promise<boolean> {
    return (await redis.exists(key)) === 1
  },

  async incr(key: string): Promise<number> {
    return redis.incr(key)
  },

  async expire(key: string, seconds: number): Promise<void> {
    await redis.expire(key, seconds)
  },
}


