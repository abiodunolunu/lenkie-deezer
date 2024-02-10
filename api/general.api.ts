import { type $Fetch } from "ofetch";
import { FetchMethod } from "~/types/enums/FetchMethods";
import { SearchType } from "~/types/enums/SearchType";

export const general = (fetcher: $Fetch) => {
  return {
    findData<T>(searchTerm: string, searchType: SearchType = SearchType.ALL) {
      return fetcher<T>(`/search/${searchType}`, {
        method: FetchMethod.GET,
        query: { q: searchTerm },
      });
    },
  };
};
