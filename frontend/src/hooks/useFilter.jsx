import filter from 'leo-profanity';

filter.addDictionary('en-ru', [...filter.getDictionary('ru'), ...filter.getDictionary('en')]);

const useFilter = () => filter;

export default useFilter;
