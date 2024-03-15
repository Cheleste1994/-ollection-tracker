'use client';

import { Button, Input } from '@nextui-org/react';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { SchemaAuth } from '@/utils/yup/schemaValidation';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'sonner';
import {
  AuthRes,
  LOGIN_USER_QUERY,
  REGISTER_USER_QUERY,
} from '@/api/query/users';
import { useRouter } from 'next/navigation';

export default function FormAuth() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SchemaAuth>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSigUp] = useState(false);
  const [getUser, { loading }] = useLazyQuery<{
    login: AuthRes;
    register: AuthRes;
  }>(LOGIN_USER_QUERY, {
    fetchPolicy: 'network-only',
    ssr: false
  });

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: SchemaAuth) => {
    const result = await getUser({
      query: isSignUp ? REGISTER_USER_QUERY : undefined,
      variables: {
        dto: {
          email: data.email,
          password: data.password,
        },
      },
    });

    if (!result.error && result.data) {
      toast.success('You are logged in')
      return router.back();
    }

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 max-w-xs w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
      <div>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
              description="We'll never share your email with anyone else."
              className="max-w-xs"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              label="Password"
              variant="bordered"
              isInvalid={!!errors.password?.message}
              errorMessage={errors.password?.message}
              description="Enter your password"
              {...field}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              className="max-w-xs"
            />
          )}
        />

        {isSignUp && (
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                label=""
                variant="bordered"
                isInvalid={!!errors.confirmPassword?.message}
                errorMessage={errors.confirmPassword?.message}
                description="Confirm password"
                {...field}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                className="max-w-xs"
              />
            )}
          />
        )}
      </div>
      {!isSignUp && (
        <>
          <span>
            Don’t have an account?
            <Button
              color="primary"
              variant="light"
              size="sm"
              onClick={() => setIsSigUp(true)}
            >
              Sign up
            </Button>
            now.
          </span>
          <Button
            color={isValid ? 'primary' : 'danger'}
            size="sm"
            type="submit"
            disabled={!isValid}
            isLoading={loading}
          >
            Sign In
          </Button>
        </>
      )}
      {isSignUp && (
        <>
          <span>
            Already have an account?
            <Button
              color="primary"
              variant="light"
              size="sm"
              onClick={() => setIsSigUp(false)}
            >
              Sign in
            </Button>
            now.
          </span>
          <Button
            color={isValid ? 'primary' : 'danger'}
            size="sm"
            type="submit"
            disabled={!isValid}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </>
      )}
    </form>
  );
}
