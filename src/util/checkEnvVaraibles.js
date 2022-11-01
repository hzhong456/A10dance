import dotenv from 'dotenv';
dotenv.config();

const checkEnvVariables = () => {
  let shouldExit = false;
  if(typeof process.env.POSTGRES_HOST === 'undefined') {
    console.error('POSTGRES_HOST is not set.');
    shouldExit = true;
  }

  if(typeof process.env.POSTGRES_PORT === 'undefined') {
    console.error('POSTGRES_PORT is not set.');
    shouldExit = true;
  }

  if(typeof process.env.POSTGRES_USERNAME === 'undefined') {
    console.error('POSTGRES_USERNAME is not set.');
    shouldExit = true;
  }

  if(typeof process.env.POSTGRES_PASSWORD === 'undefined') {
    console.error('POSTGRES_PASSWORD is not set.');
    shouldExit = true;
  }

  if(typeof process.env.SECRET === 'undefined') {
    console.error('SECRET is not set.');
    shouldExit = true;
  }

  if(typeof process.env.POSTGRES_DATABASE === 'undefined') {
    console.error('POSTGRES_DATABASE is not set.');
    shouldExit = true;
  }

  if(shouldExit) {
    process.exit(-1);
  }
};

export {checkEnvVariables};
