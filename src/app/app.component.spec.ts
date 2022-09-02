import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { addition } from './Calculator';

describe('AppComponent', () => {
  let component = new AppComponent();

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

  it(`should have as title 'angular-unit-testing-dotnet'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-unit-testing-dotnet');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-unit-testing-dotnet app is running!');
  });

  it("should show an alert message", () => {
    const message = "Hello";
    const output = component.showMessage(message);
    expect(output).toBe(message);
  });

  xit("should the addition result", () => {
    const output = addition(10, 20);
    expect(output).toBe(30);
  });

  it("should toBe and toEqual test case", () => {
    let a = "hello";
    let b = "hello";
    let x = [1, 2, 3];
    let y = [1, 2, 3];
    expect(a).toBe(b);
    expect(x).toEqual(y);
  });
});
