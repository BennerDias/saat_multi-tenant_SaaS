import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      photo: user.photo,
      companyId: user.company?.id ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toResponseList(users: User[]): UserResponseDto[] {
    return users.map(this.toResponse);
  }
}
