import { PrismaClient, Status } from '@prisma/client';
import { Country, ICountry } from 'country-state-city';
import { usersMock } from './users';

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

  for (const {age, email, name, password, role, status} of usersMock) {
    await prisma.user.create({
      data: {
        email,
        password,
        role,
        status: Status[status || Status.ACTIVE] || Status.ACTIVE,
        profile: {
          create: {
            about: '',
            age: Number(age),
            avatar: '',
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1] || '',
            gender: '',
          }
        }
      },
    });
  }

  await prisma.$disconnect();
})();
