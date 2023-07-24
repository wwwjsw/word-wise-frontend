import { hash } from 'bcrypt';
import { firestore } from '@/lib/firestore';
import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        return userRecord;
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await admin.auth().createUser({
      displayName: name,
      email,
      password,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
