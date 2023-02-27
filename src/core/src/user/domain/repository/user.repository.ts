import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '@shared/domain';
import { User } from '../entities/user';

export namespace UserRepository {
  export type Filter = string;

  export type SearchParams = DefaultSearchParams<Filter>;

  export type SearchResult = DefaultSearchResult<User, Filter>;

  export type Repository = SearchableRepositoryInterface<
    User,
    Filter,
    SearchParams,
    SearchResult
  >;
}
