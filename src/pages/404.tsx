import useRedirectWithTimeout from '@/src/shared/hooks/useRedirectWithTimeout';

export default function FourOhFour() {
  const { secondsRemaining } = useRedirectWithTimeout('/', 5);

  return (
    <>
      <h1 className="text-center text-2xl font-bold">404</h1>
      <h2 className="mt-4 text-center text-xl">
        Você será redirecionado em {secondsRemaining} segundos.
      </h2>
    </>
  );
}
