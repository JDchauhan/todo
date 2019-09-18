import { TestBed } from '@angular/core/testing';

import { ListeditService } from './listedit.service';

describe('ListeditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListeditService = TestBed.get(ListeditService);
    expect(service).toBeTruthy();
  });
});
