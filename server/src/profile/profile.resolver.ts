import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { BadRequestException } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation('createProfile')
  @Auth()
  async create(@Args('dto') dto: CreateProfileInput) {
    try {
      const result = await this.profileService.create(dto);
      return result;
    } catch {
      throw new BadRequestException('Profile already exists');
    }
  }

  @Query('profileById')
  @Auth()
  getProfileById(@Args('userId') userId: string) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Query('profileByToken')
  @Auth()
  getProfileByToken(@CurrentUser('id') userId: string) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Mutation('updateProfile')
  @Auth()
  update(@Args('dto') dto: UpdateProfileInput) {
    return this.profileService.update(dto);
  }
}
