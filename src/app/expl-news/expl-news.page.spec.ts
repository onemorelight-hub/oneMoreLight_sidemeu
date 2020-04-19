import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplNewsPage } from './expl-news.page';

describe('ExplNewsPage', () => {
  let component: ExplNewsPage;
  let fixture: ComponentFixture<ExplNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
