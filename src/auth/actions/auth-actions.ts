import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'

export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return { error: 'Email and password are required' }
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    const dbUser = await createUser(email, password)
    return dbUser
  }

  if (!bcrypt.compareSync(password, user.password ?? '')) {
    // return { error: 'Invalid password' }
    return null
  }

  return user
}

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0]
    }
  })
  return user
}
