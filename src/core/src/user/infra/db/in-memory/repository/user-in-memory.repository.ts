import { InMemorySearchableRepository, SortDirection } from '@shared/domain';
import { User } from '@user/domain/entity/user';
import { UserRepository } from '@user/domain/repository/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(items: User[], filter: UserRepository.Filter) {
    if (!filter) return items;

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ) {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}
