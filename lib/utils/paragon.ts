"use server"

import jasonwebtoken from 'jsonwebtoken'

/**
 * Server side function to create a Paragon token for the given user ID
 * @param userId The user ID to create the token for
 * @returns The Paragon token
 */
export async function paragonToken(userId: string): Promise<string> {
    const paragonSigningKey = process.env.PARAGON_SIGNING_KEY

    if (!paragonSigningKey) {
        throw new Error('Missing paragon signing key')
    }

    const createdAt = Math.floor(Date.now() / 1000)

    const jwt = jasonwebtoken.sign({
        sub: userId,
        iat: createdAt,
        exp: createdAt + 60 * 60, // 1 hour
    },
        paragonSigningKey,
        {
            algorithm: 'RS256',
        }
    )

    return jwt
}
