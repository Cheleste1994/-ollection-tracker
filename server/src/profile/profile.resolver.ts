import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { BadRequestException } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Profile, ProfileWithUser } from './entities/profile.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from 'src/user/entities/user.entity';

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
  async getProfileByToken(@CurrentUser('id') userId: string) {
    return this.profileService.getProfileByUserId(userId);
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

  @Mutation(() => Profile, { name: 'uploadAvatar' })
  @Auth()
  async uploadAvatar(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @CurrentUser('id') userId: string,
  ) {
    try {
      const result = await this.profileService.uploadAvatar(userId, file);
      return result;
    } catch {
      throw new BadRequestException();
    }
  }
}
