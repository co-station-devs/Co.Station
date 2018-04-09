import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';

export const mockMatDialog = {
  open: () => {
    return {
      close: () => jest.fn(),
      afterClosed: () => {
        return {
          subscribe: () => Observable.of({ cancelled: false }),
          withLatestFrom: () => {
            return { subscribe: jest.fn() };
          }
        };
      }
    };
  }
};
