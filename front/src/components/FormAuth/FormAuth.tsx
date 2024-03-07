'use client';

import { Button, Chip, Input } from '@nextui-org/react';
import { EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';

export default function FormAuth() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSigUp] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form className="flex flex-col gap-6 max-w-xs w-full">
      <h2 className="text-center">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
      <div>
        <Input
          type="email"
          label="Email"
          variant="bordered"
          defaultValue="junior2nextui.org"
          isInvalid={true}
          errorMessage="Please enter a valid email"
          className="max-w-xs"
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          errorMessage="Please enter a valid email"
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
        {isSignUp && (
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            errorMessage="Please enter a valid email"
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
      </div>
      {!isSignUp && (
        <>
          <span>
            Don’t have an account?
            <Button color="primary" variant="light" size="sm" onClick={() => setIsSigUp(true)}>
              Sign up
            </Button>
            now.
          </span>
          <Button color="primary" size="sm" type="submit">
            Sign In
          </Button>
        </>
      )}
      {isSignUp && (
        <>
          <span>
            Already have an account?
            <Button color="primary" variant="light" size="sm" onClick={() => setIsSigUp(false)}>
              Sign in
            </Button>
            now.
          </span>
          <Button color="primary" size="sm" type="submit">
            Sign Up
          </Button>
        </>
      )}
    </form>
  );
}
