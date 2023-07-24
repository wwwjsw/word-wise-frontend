import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoadingFromApi, setIsLoadingFromApi] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoadingFromApi(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        setIsLoadingFromApi(false);
        const data = await response.json();

        const result = await signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/',
        });

        if (!result?.error) {
          router.push('/', undefined, { scroll: false });
        } else {
          setError('Error at Signup - ' + result.error);
        }
      } else {
        setIsLoadingFromApi(false);
        const errorData = await response.json();
        // Handle error response
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="flex min-h-screen bg-white flex-col items-center justify-center"
      >
        <div className="gap-8 gap-row text-center">
          <div className="w-8 pr-px justify-start items-start inline-flex">
            <p className="text-zinc-900 text-base font-normal leading-normal">
              .ecs
            </p>
          </div>
          <p className="text-zinc-900 text-3xl font-bold leading-10">
            Sign up!
          </p>
          <p className="text-center text-zinc-500 text-sm font-normal leading-normal">
            It&apos;s great to have you here 👋🏼
          </p>
          <p className="text-center text-zinc-500 text-sm font-normal leading-normal">
            Create your account below
          </p>
        </div>

        <div className="flex-co w-80 justify-start items-start gap-4 flex mt-6 mb-4">
          <div className="flex-col w-full gap-2 flex">
            <input
              className="text-zinc-500 text-sm font-normal leading-normal w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              name="email"
              className="text-zinc-500 text-sm font-normal leading-normal w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name="password"
              className="text-zinc-500 text-sm font-normal leading-normal w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              name="password-confirmation"
              className="text-zinc-500 text-sm font-normal leading-normal w-80 h-12 px-4 py-3 bg-gray-100 rounded-lg justify-start items-start gap-2 inline-flex"
              type="password"
              placeholder="Password confirmation"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 pb-4">{error}</p>}
        <button
          disabled={isLoadingFromApi}
          className="mb-2 mt-1 text-white text-base font-bold leading-normal disabled:bg-gray-600 disabled:cursor-not-allowed bg-violet-600 rounded-lg h-12 w-80 px-6 py-3"
          type="submit"
        >
          Sign up
        </button>
        <div className="h-8" />
        <button
          type="button"
          className="text-center text-zinc-500 text-xs font-normal underline leading-tight"
          onClick={(e) => signIn()}
        >
          Log in
        </button>
      </form>
    </>
  );
}
