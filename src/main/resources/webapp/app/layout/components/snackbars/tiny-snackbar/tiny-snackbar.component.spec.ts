import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinySnackbarComponent } from './tiny-snackbar.component';

describe('TinySnackbarComponent', () => {
  let component: TinySnackbarComponent;
  let fixture: ComponentFixture<TinySnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinySnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinySnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
