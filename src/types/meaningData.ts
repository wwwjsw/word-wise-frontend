import DefinitionsData from '@/src/types/definitionsData';

export default interface DefinitionData {
  partOfSpeech?: string;
  definitions?: DefinitionsData[];
  synonyms?: Array<string>;
  antonyms?: Array<string>;
}
