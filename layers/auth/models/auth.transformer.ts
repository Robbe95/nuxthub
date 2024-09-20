import type { CurrentUser } from './current-user/currentUser.model'
import type { CurrentUserDto } from './current-user/currentUserDto.model'

export class AuthTransformer {
  static toCurrentUser(dto: CurrentUserDto): CurrentUser {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    }
  }
}
