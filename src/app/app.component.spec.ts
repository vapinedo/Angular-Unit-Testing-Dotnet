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

  it("should toBeGreaterThan", () => {
    let a = 5;
    expect(a).toBeGreaterThan(4);
    expect(a).toBeGreaterThanOrEqual(a);
    expect(a).toBeLessThan(10);
    expect(a).toBeLessThanOrEqual(a);
  });

  it("should toMatch", () => {
    let input = "Real Madrid FC";
    expect(input).toMatch(/adrid/);
    expect(input).not.toMatch(/madrid/); // not madrid, but Madrid
  });

  it("should toBeCloseTo matcher", () => {
    const PI = 3.1415926;
    const e = 2.78;
    expect(PI).not.toBeCloseTo(e);
  });

  it("should toBeDefined & toBeUndefined matchers", () => {
    let personObj = {
      name: "Valp",
    };
    const addOperation = function add(a: number, b: number) {
      return a+b;
    };
    let favoriteSoccerTeam;
    expect(personObj).toBeDefined();
    expect("Hello world").toBeDefined();
    expect(addOperation).toBeDefined();
    expect(favoriteSoccerTeam).toBeUndefined();
  });

  it("should toBeNull", () => {
    let favoriteSerie = null;
    expect(favoriteSerie).toBeNull();
    expect(null).toBeNull();
  });

  it("shoud toContain", function() {
    const nominatedBestPlayers = ["Benzema", "mbappe", "ronaldo"];
    expect(nominatedBestPlayers).not.toContain("messi");
    expect(nominatedBestPlayers).not.toContain("benzema"); // case sensitive
    expect(nominatedBestPlayers).toContain("Benzema");
  });

  it("should toBeNaN", function() {
    const invalidNumber = NaN;
    const validNumber = 33;
    expect(invalidNumber).toBeNaN();
    expect(validNumber).not.toBeNaN();
    expect(0/0).toBeNaN();
    expect(5/0).not.toBeNaN(); // not NaN, but Infinity
    expect(0/5).not.toBeNaN(); // not NaN, but Zero
  });

  it("should toBePositiveInfinity", function() {
    expect(Infinity).toBePositiveInfinity();
    expect(5/0).toBePositiveInfinity();
  });

  it("should toBeNegativeInfinity", function() {
    expect(-Infinity).toBeNegativeInfinity();
    expect(5/-0).toBeNegativeInfinity();
    expect(-5/0).toBeNegativeInfinity();
  });
  
});
