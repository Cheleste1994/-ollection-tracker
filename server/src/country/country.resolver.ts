import { Resolver, Query } from '@nestjs/graphql';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';

@Resolver('Country')
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [Country], { name: 'countries' })
  countries() {
    return this.countryService.countries();
  }
}
