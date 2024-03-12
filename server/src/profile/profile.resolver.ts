import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { BadRequestException } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation('createProfile')
  @Auth()
  async create(@Args('dto') dto: CreateProfileInput) {
    try {
      const result = await this.profileService.create(dto)
      return result;
    } catch {
      throw new BadRequestException('Profile already exists')
    }
  }

  @Query('profile')
  @Auth()
  getProfile(@Args('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Mutation('updateProfile')
  @Auth()
  update(
    @Args('dto') dto: UpdateProfileInput,
  ) {
    return this.profileService.update(dto);
  }
}
