import { useState } from 'react';
import { debounce } from 'lodash';
import { UserIcon, SearchIcon } from '@heroicons/react/solid';
import { InferGetServerSidePropsType } from 'next';
import { DictionaryData } from '@/src/types/dictionaryData';
import { useSession, signOut, signIn } from 'next-auth/react';
import dotenv from 'dotenv';
import Loader from '@/src/shared/components/Loader/Loader';
import Image from 'next/image';

dotenv.config();

const initialTerm = 'hello';

export async function getServerSideProps() {
  const url =
    process.env.NEXT_PUBLIC_MAIN_SERVICE + '/dictionary/' + initialTerm;
  const repositoryData = await fetch(url as string)
    .then((res) => res.json())
    .catch((e) => {
      return {
        message: 'Request error while fetch API',
        serverError: e.message,
      };
    });

  return {
    props: {
      repositoryData,
    },
  };
}

function IndexPage({
  repositoryData,
}: InferGetServerSidePropsType<typeof getServerSideProps> & {
  repositoryData: DictionaryData;
}) {
  const { data: session, status, update } = useSession();
  const [searchQuery, setSearchQuery] = useState(initialTerm);
  const [searchResults, setSearchResults] =
    useState<DictionaryData>(repositoryData);
  const [isLoadingFromApi, setIsLoadingFromApi] = useState(false);
  const mainService = process.env.NEXT_PUBLIC_MAIN_SERVICE;

  const debouncedGetServerSideProps = debounce(async (searchQuery) => {
    const url = mainService + '/dictionary/' + searchQuery;

    await fetch(url as string)
      .then(async (res) => {
        setIsLoadingFromApi(true);
        setSearchResults(await res.json());
      })
      .catch((e) => {
        setIsLoadingFromApi(false);
        return {
          message: 'Request error while fetch API',
          serverError: e.message,
        };
      })
      .finally(() => setIsLoadingFromApi(false));
  }, 500);

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedGetServerSideProps(value); // Call the debounced function with the input value
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* INICIO HEADER*/}
      <div className="flex-row pt-4 flex justify-between items-center mx-64 bg-white">
        <p className="text-zinc-900 text-base font-normal leading-normal">
          .ecs
        </p>
        {session ? (
          <div className="flex flex-row items-center">
            <p>{session.user.email}</p>
            <p className="mx-2 text-violet-500">/</p>
            <a
              className="cursor-pointer hover:text-violet-500"
              onClick={() => signOut()}
            >
              Sign out
            </a>
            <p className="mx-2 text-violet-500">/</p>
            <a
              className="cursor-pointer hover:text-violet-500"
              onClick={() => signOut()}
            >
              Config
            </a>
          </div>
        ) : (
          <a
            onClick={() => signIn()}
            className="w-12 cursos-pointer h-12 p-1.5 bg-gray-100 rounded-full justify-center items-center gap-1.5 flex"
          >
            <UserIcon className="text-gray-400 relative" width={24} />
          </a>
        )}
      </div>
      {/* FIM HEADER  */}

      {/* INICIO INPUT DE PESQUISA */}
      <div className="flex-row flex justify-between items-center mx-64 bg-white pt-24">
        <label className="relative block w-full">
          <input
            className="w-full bg-gray-100 placeholder:font-italitc border-0 placeholder:text-zinc-500 focus:ring-1 focus:ring-inset focus:ring-violet-500 py-2 pl-3 pr-10 focus:outline-none h-14 rounded-lg"
            placeholder="Enter your keyword to search"
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="h-5 w-6 text-gray-900" aria-hidden="true" />
          </span>
        </label>
      </div>
      {/* FIM INPUT DE PESQUISA*/}

      {/* COMEÇO DO RESULTADO DA PESQUISA */}
      {isLoadingFromApi && <Loader />}
      <div className="flex-col flex justify-between items-start mx-64 bg-white pt-6">
        <h1 className="text-zinc-900 text-5xl font-bold leading-10">
          {searchResults.word}
        </h1>
        <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
          {searchResults.definition &&
            searchResults.definition.map((def, index) => {
              return (
                <div className="w-full">
                  <h2 className="text-violet-500 pt-2 text-xl font-normal leading-7">
                    {def.phonetic}
                  </h2>
                  {def.meanings &&
                    def.meanings.map((meaning) => {
                      return (
                        <>
                          <div className="w-full pt-14 justify-start items-center gap-6 inline-flex">
                            <div className="text-zinc-900 text-xl font-normal leading-7">
                              {meaning.partOfSpeech}
                            </div>
                            <div className="w-full h-px bg-zinc-900" />
                          </div>
                          <p className="text-zinc-500 pt-10 text-base font-normal leading-normal">
                            Meaning
                          </p>
                          <div className="flex-col gap-2 inline-flex pt-6 pb-10">
                            {meaning.definitions &&
                              meaning.definitions.map((def, index) => {
                                return (
                                  <p className="text-zinc-900 text-base font-normal leading-normal">
                                    {def.definition}
                                  </p>
                                );
                              })}
                          </div>

                          {meaning.synonyms && (
                            <div className="w-full inline-flex flex-wrap">
                              <p className="text-zinc-500 mr-4 text-base font-normal leading-normal">
                                Synonyms
                              </p>
                              {meaning.synonyms.map((syn, index) => {
                                return (
                                  <p className="text-violet-500 pr-4 text-base font-bold leading-normal">
                                    {syn},
                                  </p>
                                );
                              })}
                            </div>
                          )}

                          {meaning.antonyms && (
                            <div className="mt-10 w-full inline-flex flex-wrap">
                              <p className="text-zinc-500 mr-4 text-base font-normal leading-normal">
                                Antonyms
                              </p>
                              {meaning.antonyms.map((ant, index) => {
                                return (
                                  <p className="text-violet-500 pr-4 text-base font-bold leading-normal">
                                    {ant},
                                  </p>
                                );
                              })}
                            </div>
                          )}
                          <div className="pt-14" />
                        </>
                      );
                    })}
                  {def.sourceUrls &&
                    def.sourceUrls.map((sourceUrl) => {
                      return (
                        <>
                          <div className="h-px mb-8 bg-zinc-900" />
                          <div className="inline-flex items-center">
                            <p className="text-zinc-500 mr-4 text-sm font-normal underline leading-tight">
                              Source
                            </p>
                            <a
                              className="text-zinc-900 underline text-base font-normal leading-normal"
                              href={sourceUrl}
                              target="_blank"
                            >
                              {sourceUrl}
                            </a>
                            <Image
                              src="./external-link-line.svg"
                              alt="Eye Icon"
                              className="pl-2"
                              width={20}
                              height={20}
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
              );
            })}
        </div>
        {/* FIM DO FIM DO RESULTADO DA PESQUISA */}
      </div>
      <div className="mx-64"></div>
    </div>
  );
}

export default IndexPage;
