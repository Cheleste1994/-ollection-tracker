import { PrismaClient, Status } from '@prisma/client';
import { Country, ICountry } from 'country-state-city';
import { usersMock } from './users';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

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
        password: await hash(password),
        role,
        status: Status[status || Status.ACTIVE] || Status.ACTIVE,
        profile: {
          create: {
            about: faker.lorem.paragraph(),
            age: Number(age),
            avatar: '',
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1] || '',
            gender: faker.person.sexType(),
          }
        }
      },
    });
  }

  const catFaker = Array.from({ length: 100 }, () => faker.commerce.department());
  const category = [...new Set(catFaker)].map(cat => ({ name: cat }));

  await prisma.category.createMany({
    data: category,
  });

  const tagFaker = Array.from({ length: 1000 }, () => faker.commerce.productAdjective());
  const tags = [...new Set(tagFaker)].map(tag => ({ name: tag }));

  await prisma.tag.createMany({
    data: tags,
  });

  await prisma.$disconnect();
})();
