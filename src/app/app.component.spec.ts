import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show correct output after input changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.firstString = 'mmmmm m nnnnn y&friend&Paul has heavy hats! &';
    app.secondString = 'my frie n d Joh n has ma n y ma n y frie n ds n&';
    app.stringMix();
    fixture.detectChanges();

    // expect correct output from stringMix.
    expect(app.resultString).toEqual('1:mmmmmm/=nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=ee/=ss');

    // expect value to be reflected correctly on webpage.
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#result-string')?.textContent).toContain('1:mmmmmm/=nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=ee/=ss');
  });
});
