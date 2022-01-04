### 싱글톤 패턴

Redux state tree에서 사용한다.

```js
export default function createStore(reducer, preloadedState, enhancer) {

  ~~~

  let currentState = preloadedState

  ~~~

  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }

  ~~~

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable,
  }
}

```

### 빌더 패턴

Redux-toolkit의 createSlice에서 extraReducer를 빌더패턴으로 구성한다.

```ts
export interface ActionReducerMapBuilder<State> {
  addCase<ActionCreator extends TypedActionCreator<string>>(
    actionCreator: ActionCreator,
    reducer: CaseReducer<State, ReturnType<ActionCreator>>
  ): ActionReducerMapBuilder<State>;

  addCase<Type extends string, A extends Action<Type>>(
    type: Type,
    reducer: CaseReducer<State, A>
  ): ActionReducerMapBuilder<State>;

  addMatcher<A extends AnyAction>(
    matcher: ActionMatcher<A> | ((action: AnyAction) => boolean),
    reducer: CaseReducer<State, A>
  ): Omit<ActionReducerMapBuilder<State>, "addCase">;

  addDefaultCase(reducer: CaseReducer<State, AnyAction>): {};
}
```

실사용예시

```ts
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      return { ...state };
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      onLoginSuccess({ accessToken: "TokenTest" });
      return { ...state, isSignedIn: true };
    });
    builder.addCase(silentRefresh.fulfilled, (state, { payload }) => {
      onLoginSuccess(payload);
      return { ...state, ...payload, isSignedIn: true };
    });
    builder.addCase(silentRefresh.rejected, () => {
      return { ...initialState };
    });
  },
});
```

다음과 같이 chain call을 할 수도 있다.

```ts
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        return { ...state };
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        onLoginSuccess({ accessToken: "TokenTest" });
        return { ...state, isSignedIn: true };
      })
      .addCase(silentRefresh.fulfilled, (state, { payload }) => {
        onLoginSuccess(payload);
        return { ...state, ...payload, isSignedIn: true };
      })
      .addCase(silentRefresh.rejected, () => {
        return { ...initialState };
      });
  },
});
```

### 프로토타입 패턴

Javascript 의 빌트인 함수인 Object.assign에서 프로토타입 패턴이 사용되고 있다.

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

### 팩토리 메서드 패턴

```ts
interface Toast {
  template: string;
  title: string;
  body: string;
  position: string;
  visible: boolean;
  hide(): void;
  render(
    title: string,
    body: string,
    duration: number,
    position: string
  ): string;
}
```

```ts
class MobileToast implements Toast {
  title: string;
  body: string;
  duration: number;
  visible = false;
  position = "center";
  template = `
        <div class="mobile-toast">
            <div class="mobile-toast--header">
              <h2>${this.title}</h2>
              <span>${this.duration}</span>
            </div>
            <hr/>
            <p class="mobile-toast--body">
              ${this.message}
            </p>
        </div>
    `;
  hide() {
    this.visible = false;
  }
  render(title: string, body: string, duration: number, position: string) {
    (this.title = title), (this.body = body);
    this.visible = false;
    this.duration = duration;
    this.position = "center";
    return this.template;
  }
}
class DesktopToast implements Toast {
  title: string;
  body: string;
  position: string;
  visible = false;
  duration: number;
  template = `
        <div class="desktop-toast">
            <div class="desktop-toast--header">
              <h2>${this.title}</h2>
              <span>${this.duration}</span>
            </div>
            <hr/>
            <p class="desktop-toast--body">
              ${this.message}
            </p>
        </div>
    `;
  hide() {
    this.visible = false;
  }
  render(title: string, body: string, duration: number, position: string) {
    (this.title = title), (this.body = body);
    this.visible = true;
    this.duration = duration;
    this.position = position;
    return this.template;
  }
}
```

```ts
class ToastFactory {
  createToast(type: "mobile" | "desktop"): Toast {
    if (type === "mobile") {
      return new MobileToast();
    } else {
      return new DesktopToast();
    }
  }
}
```

```ts
class App {
  toast: Toast;
  factory = new ToastFactory();
  render() {
    this.toast = this.factory.createToast(isMobile() ? "mobile" : "desktop");
    if (this.toast.visible) {
      this.toast.render("Toast Header", "Toast body");
    }
  }
}
```

### 추상 팩토리 패턴
