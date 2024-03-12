import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { Request, Response } from 'express';
import { ProfileResolver } from './profile/profile.resolver';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
