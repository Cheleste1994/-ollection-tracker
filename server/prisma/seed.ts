import { PrismaClient } from '@prisma/client';
import { Country, ICountry } from 'country-state-city';

(async () => {
  const prisma = new PrismaClient();

  const countries: ICountry[] = Country.getAllCountries();

  for (const country of countries) {
    await prisma.country.create({
      data: {
        ...country,
        timezones: {
          create: [...country.timezones],
        },
      },
    });
  }

  await prisma.$disconnect();
})();
