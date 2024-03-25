import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { BadRequestException } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Profile, ProfileByRole, ProfileWithUser } from './entities/profile.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from 'src/user/entities/user.entity';
import { AuthAnyway } from 'src/auth/decorators/auth-anyway.decorator';
import { Role } from '@prisma/client';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profileById' })
  @Auth()
  getProfileById(@Args('userId') userId: string) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Query(() => [ProfileWithUser], { name: 'profiles' })
  async profiles() {
    return this.profileService.profiles();
  }

  @Query(() => Profile, { name: 'profileByToken' })
  @Auth()
  async profileByToken(@CurrentUser('id') userId: string) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Query(() => ProfileByRole, { name: 'profileByRole' })
  @AuthAnyway()
  @Auth()
  async profileByRole(@CurrentUser() user: User, @Args('id') id: string) {
    const result = await this.profileService.getProfileByUserId(id);

    return {
      currentRole: user ? Role[user.role] : Role.USER,
      profile: result,
    };
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  @Auth()
  async updateProfile(
    @Args('dto') dto: UpdateProfileInput,
    @CurrentUser('id') userId: string,
  ) {
    try {
      const result = await this.profileService.update(userId, dto);
      return result;
    } catch {
      throw new BadRequestException();
    }
  }

  @Mutation(() => Profile, { name: 'updateProfileByRole' })
  @Auth()
  async updateProfileByRole(
    @Args('userId') userId: string,
    @Args('dto') dto: UpdateProfileInput,
  ) {
    try {
      const result = await this.profileService.update(userId, dto);
      return result;
    } catch {
      throw new BadRequestException();
    }
  }

  @Mutation(() => Profile, { name: 'uploadAvatar' })
  @Auth()
  async uploadAvatar(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args('userId') userId: string,
  ) {
    try {
      const result = await this.profileService.uploadAvatar(userId, file);
      return result;
    } catch {
      throw new BadRequestException();
    }
  }
}
