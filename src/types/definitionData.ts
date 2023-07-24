import MeaningData from '@/src/types/meaningData';

export default interface DefinitionData {
  phonetic?: string;
  meanings?: MeaningData[];
  sourceUrls?: Array<string>;
}
