import { UnsubscribePocModule } from './unsubscribe-rxjs.module';

describe('UnsubscribePocModule', () => {
  let unsubscribePocModule: UnsubscribePocModule;

  beforeEach(() => {
    unsubscribePocModule = new UnsubscribePocModule();
  });

  it('should create an instance', () => {
    expect(unsubscribePocModule).toBeTruthy();
  });
});
