## 블로그 링크

https://velog.io/@hustle-dev/Creational-Design-Patterns-Singleton

## 의도

싱글톤은 클래스에 인스턴스가 하나만 있는 동시에 이 인스턴스에 전역 액세스 지점을 제공할 수 있는 creational desing pattern이다.

싱글톤은 글로벌 변수와 거의 비슷한 장단점을 가지고 있다. 글로벌 변수는 어디에서든 가져다 사용하기 쉽지만, 코드의 모듈성을 깨뜨린다.

![](https://images.velog.io/images/hustle-dev/post/a849677b-aedb-411c-9adf-00aa0151db52/image.png)

## 문제

싱글톤 패턴은 두 가지 문제를 동시에 해결하지만 단발성 책임원칙을 위반한다.

1. **클래스에 인스턴스가 하나만 존재하게 보증**한다. 가장 일반적인 이유는 데이터베이스나 파일과 같은 일부 공유 리소스에 대한 액세스를 제어하기 위함이다.

작동방식은 다음과 같다. 객체를 만들었지만 얼마 후 새로운 객체를 만들기로 결정했다고 상상해보자. 새로 만든 객체를 받는 대신 이미 기존에 만들어둔 객체를 받게 된다.

생성자 호출은 항상 설계에 의해 새로운 객체를 반환해야 하기 때문에 이 동작은 일반 생성자로 구현이 불가능하다.

![](https://images.velog.io/images/hustle-dev/post/8078eec7-29b2-4a37-82d7-12dda9bcd211/image.png)

> 클라이언트들은 자신이 항상 같은 대상을 사용하고 있다는 사실조차 모를 수도 있다.

2. **해당 인스턴스에 글로벌 액세스 지점을 제공**한다. 이러한 전역 변수들은 매우 편리하지만 어떤 코드라도 잠재적으로 그 변수들의 내용을 덮어쓰고 앱을 손상시킬 수 있기 때문에 매우 안전하지 않다.

전역 변수와 마찬가지로 싱글톤 패턴을 사용하면 프로그램의 모든 위치에서 일부 객체에 액세스할 수 있다. 그러나 다른 코드에 의해 해당 인스턴스가 덮어쓰이지 않도록 보호하기도 한다.

## 해결책

싱글톤의 모든 구현체는 다음의 두가지를 공통으로 가진다.

- 다른 객체가 싱글톤 클래스와 함게 `new` 연산자를 사용하지 못하도록 기본 생성자를 비공개로 만든다.
- 생성자 역할을 하는 정적 생성 메서드를 만든다. 이 메서드는 객체를 생성하고 정적 필드에 저장하기 위해 개인 생성자를 호출한다. 이 메서드에 대한 다음 호출을 모두 캐시된 객체를 반환한다.

코드가 싱글톤 클래스에 액세스 할 수 있는 경우 싱글톤의 정적 메서드를 호출할 수 있다. 그래서 그 메서드가 호출될 때마다 항상 같은 객체가 반환된다.

## 현실 유사성

정부는 싱글톤 패턴의 훌륭한 예이다. 한 나라는 오직 하나의 공식적인 정부만 가질 수 있다. 정부를 구성하는 개인의 신원과 상관없이 'X의 정부'라는 호칭은 담당자들의 집단을 식별하는 글로벌 접근 지점이다.

## 구조

![](https://images.velog.io/images/hustle-dev/post/f377ae0f-8137-48dc-b126-cbe3c8fbbe61/image.png)

1. 싱글톤 클래스는 자체 클래스의 동일한 인스턴스를 반환하는 정적 메서드 `getInstance`를 선언한다.

싱글톤의 생성자는 클라이언트 코드로부터 숨겨져야 한다. 싱글톤 객체를 가져오는 유일한 방법은 `getInstance` 메서드를 호출하는 것이다.

## 적용가능성

- 프로그램의 클래스가 모든 클라이언트에서 사용할 수 있는 단일 인스턴스만 있어야 할 경우 Singleton 패턴을 사용한다.

- 전역 변수를 보다 엄격하게 제어해야하는 경우 Singleton 패턴을 사용한다.

## 장단점

### 장점

- 클래스에 인스턴스가 하나만 있는지 확인할 수 있다.

- 해당 인스턴스에 대한 전역 액세스 지점을 얻을 수 있다.

- 싱글톤 객체는 처음 요청될 때만 초기화된다.

### 단점

- 단일 책임 원칙을 위반한다.

- 싱글톤 패턴은 프로그램의 구성 요소들이 서로에 대해 너무 많이 알고 있을 때 나쁜 디자인을 가리게 만드는 원인이 될 수 있다.

- 여러 스레드가 싱글톤 객체를 여러 번 만들지 않도록 패턴은 멀티스레드 환경과 같은 특별한 환경을 필요로 한다.

- 많은 테스트 프레임워크가 모의 객체를 만들 때 상속에 의존하기 때문에 싱글톤의 클라이언트 코드를 유닛 테스트 하는 것은 어려울 수 있다. 싱글톤 클래스의 생성자는 비공개이고 정적 메서드를 재정의하는 것은 대부분의 언어에서 불가능하는 것도 문제가 될 수 있다.

## Abstract Method in TypeScript

### TypeScript의 패턴 사용

복잡도: ★☆☆

인기: ★★☆

사용 예: 많은 개발자들이 싱글톤을 안티패턴으로 간주한다. 이것이 타입스크립트에서 사용률이 감소하는 이유이다.

식별: 싱글톤은 동일한 캐시된 객체를 반환하는 정적 생성 방법으로 인식될 수 있다.

`index.ts`

```ts
// 싱글톤 클래스는 getInstance 메서드를 정의하여 클라이언트가
// 유일한 싱글톤 인스턴스에 접근할 수 있도록 한다.
class Singleton {
  private static instance: Singleton;

  // 싱글톤의 생성자는 `new`연산자로 호출되어 직접적으로 생성되는 것을
  // 막기 위해 항상 private 이어야 한다.
  private constructor() {}

  // 정적 메서드는 싱글톤 인스턴스에 대한 접근을 제어한다.
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public someBusinessLogic() {}
}

function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}

clientCode();
```

## 요약

싱글톤 패턴은 오직 하나의 인스턴스를 가져야 하고 전역에서 접근할 수 있도록 제한하기 위해 사용한다. 이 패턴은 하나의 앱에서 특정 작업을 한 곳에서 처리해야할 때 매우 유용하다.

## 참고 사이트

- https://refactoring.guru/design-patterns/singleton

- https://refactoring.guru/design-patterns/singleton/typescript/example

- https://sangcho.tistory.com/entry/%EC%9B%B9%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80%EC%95%8C%EC%95%84%EC%95%BC%ED%95%A07%EA%B0%80%EC%A7%80%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4
