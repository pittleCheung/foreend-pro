import { SkipAuthGuard } from './skip-auth.guard';

describe('SkipAuthGuard', () => {
  it('should be defined', () => {
    expect(new SkipAuthGuard()).toBeDefined();
  });
});
