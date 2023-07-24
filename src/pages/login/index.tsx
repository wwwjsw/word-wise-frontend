import { useState } from 'react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { signIn, getCsrfToken } from 'next-auth/react';

import { useRouter } from 'next/router';

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoadingFromApi, setIsLoadingFromApi] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingFromApi(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });

    if (!result?.error) {
      setIsLoadingFromApi(false);
      router.push('/', undefined, { scroll: false });
    } else {
      setIsLoadingFromApi(false);
      // Tratar o erro de registro, exibir mensagem de erro, etc.
      setError('Erro no login - ' + result.error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex min-h-screen bg-white flex-col items-center justify-center"
    >
      <div className="gap-8 gap-row text-center">
        <div className="w-8 pr-px justify-start items-start inline-flex">
          <p className="text-zinc-900 text-base font-normal leading-normal">
            .ecs
          </p>
        </div>
        <p className="text-zinc-900 text-3xl font-bold leading-10">Sign up!</p>
        <p className="text-center text-zinc-500 text-sm font-normal leading-normal">
          It&apos;s great to have you here 👋🏼
        </p>
        <p className="text-center text-zinc-500 text-sm font-normal leading-normal">
          Create your account below
        </p>
      </div>

      <div className="flex-col w-80 justify-start items-start gap-4 flex mt-6 mb-4">
        <div className="flex-col w-full gap-2 flex">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
          />
        </div>
      </div>
      {error && <p className="text-red-500 pb-4">{error}</p>}
      <button
        disabled={isLoadingFromApi}
        className="mb-2 mt-1 text-white text-base font-bold leading-normal disabled:bg-gray-600 disabled:cursor-not-allowed bg-violet-600 rounded-lg h-12 w-80 px-6 py-3"
        type="submit"
      >
        Log In
      </button>
      <div className="h-8" />
      <button
        type="button"
        className="text-center text-zinc-500 text-xs font-normal underline leading-tight"
        onClick={() => router.push('/signup', undefined, { scroll: false })}
      >
        Sign up
      </button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
