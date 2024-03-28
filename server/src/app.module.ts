import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { Request, Response } from 'express';
import { ProfileModule } from './profile/profile.module';
import { CountryModule } from './country/country.module';
import { DropboxModule } from './dropbox/dropbox.module';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      sortSchema: true,
      csrfPrevention: false,
    }),
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    CountryModule,
    DropboxModule,
    ItemModule,
    CategoryModule,
    TagModule,
  ],
})
export class AppModule {}
