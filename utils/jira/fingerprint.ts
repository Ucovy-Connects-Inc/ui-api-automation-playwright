import crypto from 'crypto';

export function createFingerprint(
  testTitle: string,
   env: string,
  testFile: string,
  errorMessage: string,
  errorStack?: string
): string {
  const raw = [
    testTitle,
    env,
    testFile,
    errorMessage,
    errorStack?.split('\n')[0] // first stack line = assertion identity
  ].join('|');

  return crypto
    .createHash('sha256')
    .update(raw)  
    .digest('hex');
}
