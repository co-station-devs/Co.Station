import { BaseService } from './base.service';
import { of } from 'rxjs/observable/of';

let service: BaseService;
const mockHttpService = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}as any;


describe('[Isolated] ResponseComponent', () => {
  beforeEach(() => {
    service = new BaseService<any>(mockHttpService);
    service.type = {};
    service.service_url = 'http://mock.api';
  });

  test('list', (next) => {
    // Arrange
    mockHttpService.get.mockReturnValue(of({ success: true, data: { docs: [{ _id: 'Testing something' }] } }));

    // Act
    service.list({}).subscribe(r => {
      // Assert
      expect(mockHttpService.get).toHaveBeenCalledWith('http://mock.api', {params: {}});

      next();
    });
  });


  test('Create', (next) => {
    // Arrange
    mockHttpService.post.mockReturnValue(of({ success: true, data: { _id: 'Testing something' } }));

    // Act
    service.create({ message: '456' }).subscribe(r => {
      // Assert
      expect(mockHttpService.post).toHaveBeenCalledWith('http://mock.api', { message: '456' });

      next();
    });
  });

  test('read', (next) => {
    // Arrange
    mockHttpService.get.mockReturnValue(of({ success: true, data: { _id: 'Testing something' } }));

    // Act
    service.read('123').subscribe(r => {
      // Assert
      expect(mockHttpService.get).toHaveBeenCalledWith('http://mock.api/123');

      next();
    });
  });

  test('update', (next) => {
    // Arrange
    mockHttpService.put.mockReturnValue(of({ success: true, data: { docs: [{ _id: 'Testing something' }] } }));

    // Act
    service.update({ _id: '123' }).subscribe(r => {
      // Assert
      expect(mockHttpService.put).toHaveBeenCalledWith('http://mock.api', { _id: '123' });

      next();
    });
  });


  test('delete', (next) => {
    // Arrange
    mockHttpService.delete.mockReturnValue(of({ success: true }));

    // Act
    service.delete('123').subscribe(r => {
      // Assert
      expect(mockHttpService.delete).toHaveBeenCalledWith('http://mock.api/123');

      next();
    });
  });
});

