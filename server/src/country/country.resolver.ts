import { Resolver, Query } from '@nestjs/graphql';
import { CountryService } from './country.service';

@Resolver('Country')
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query('countries')
  countries() {
    return this.countryService.countries();
  }
}
