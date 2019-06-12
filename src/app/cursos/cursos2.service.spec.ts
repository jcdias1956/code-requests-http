import { TestBed } from '@angular/core/testing';

import { Cursos2Service } from './cursos2.service';

describe('Cursos2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cursos2Service = TestBed.get(Cursos2Service);
    expect(service).toBeTruthy();
  });
});
