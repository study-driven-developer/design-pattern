## 블로그

https://velog.io/@hustle-dev/Creational-Design-Patterns-Abstract-Method

## 의도

Abstract Factory는 구체적인 클래스를 만들지 않고 관련 객체들을 생성할수 있는 creational design pattern(생성 패턴)이다.

Abstract Factory는 구별되는 모든 제품을 만들기 위한 인터페이스를 정의하지만 실제 제품 생성은 구체적인 공장 클래스에 맡기며 각 공장의 유형은 특정 제품 종류에 해당한다.

![](https://images.velog.io/images/hustle-dev/post/8a4e2cbf-868e-42a0-bd16-85fd9d7df1e5/image.png)

## 문제

가구 가게 시뮬레이터를 만든다고 상상해 보자. 코드는 아래과 같은 클래스로 구성될 것이다.

1. 예를들어 의자 + 소파 + 커피 테이블과 같은 관련 제품군이 있다고 하자.

2. 이 제품군의 여러 변형들이 아래와같이 Art Deco, Victorian, Modern으로 제공된다고 가정하자.

![](https://images.velog.io/images/hustle-dev/post/3eaa86f0-4234-4a30-9c7a-1939ab20f487/image.png)

이러한 상황에서 동일한 제품군의 다른 객체와 일치하도록 개별 가구 객체를 생성하는 방법이 필요하다.

> 프로그램에 새 제품이나 관련 제품군을 추가할 때 핵심 코드를 변경하지 않고 생성하는 방법이 필요!

## 해결책

Abstract Factory 패턴이 제안하는 첫 번재는 제품군의 개별 제품에 대한 인터페이스를 명시적으로 선언하는 것이다. 그러면 모든 종류의 제품이 해당 인터페이스를 따르도록 할 수 있다.

![](https://images.velog.io/images/hustle-dev/post/f8561ad5-5e8d-471c-b6f1-407f293e61f6/image.png)

> 동일한 개체의 모든 변형을 단일 클래스 계층 구조로 이동

다음 단계는 제품 군에 속하는 모든 제품에 대한 생성 방법 목록이 포함된 `AbstractFactory`를 선언하는 것이다. 이러한 메서드는 이전에 추출한 인터페이스가 나타내는 추상 제품 유형을 반환해야 한다.
![](https://images.velog.io/images/hustle-dev/post/aeba09e4-d6af-46dc-aac0-5b6b20790504/image.png)

> 각 Concrete 공장은 특정 제품 변형(Victorian, Modern 등등)을 생산하는 클래스에 해당한다.

제품군의 각 변형을 위해 `AbstractFactory` 인터페이스를 기반으로 별도의 공장 클래스를 만든다. 공장은 특정 종류(Victorian, Modern...)에 따른 의자, 소파, 커피테이블 객체만을 만들 수 있다.

클라이언트 코드는 각각의 추상 인터페이스를 통해 공장과 제품 모두에서 동작해야한다. 이를 통해 실제 클라이언트 코드를 손상시키지 않고 클라이언트 코드로 전달되는 공장 유형 및 클라이언트 코드가 수신하는 제품 변형을 변경할 수 있다.

## 구조

![](https://images.velog.io/images/hustle-dev/post/20150b25-e6bf-47f9-8b8f-dd2c7688f07b/image.png)

1. **Abstract Products**는 제품군을 구성하는 구별 되지만 관련된 제품 집합에 대한 인터페이스를 선언한다.

2. **Concrete Proudcts**는 변형별로 분류된 추상적인 제품을 다양하게 구현한 것이다. 각각의 추상적 산물(의자/소파)은 주어진 모든 변형(Victorian, Modern)으로 구현되어야 한다.

3. **Abstract Factory** 인터페이스는 각 추상 제품을 생성하기 위한 메서드 집합을 선언한다.

4. **Concrete Factory**는 Abstract Factory의 생성 방법을 구현한다. 각 콘크리트 공장은 제품의 특정 변형에 해당하며 해당 변형 제품만 만든다.

5. Concrete Factory는 콘크리트 제품을 인스턴스화하지만 생성 메서드의 이름은 그에 상응하는 추상 제품을 반환해야한다. 이를 통해 공장을 사용하는 클라이언트 코드가 공장에서 공급되는 제품의 특정 변형과 결합되지 않는다. 클라이언트는 추상 인터페이스를 통해 객체와 통신하는 한 구체적인 공장/제품 변형 모델과 작업할 수 있다.

## 적용가능성

- 코드가 다양한 관련 제품군과 함께 작동하면서, 제품의 특정 클래스에 종속되지 않는 구조를 원하다면 추상 팩토리를 사용하라.

## 장단점

### 장점

- factory에서 납품받는 제품들이 서로 호환됨을 확신할 수 있다.

- concrete 제품과 클라이언트 코드 간의 긴밀한 결합을 피할 수 있다.

- 단일 책임원칙(factory method pattern과 같음)

- 열기/닫기 원리(factory method pattern과 같음)

### 단점

- 패턴과 함께 많은 새로운 인터페이스와 클래스가 도입되기 때문에 코드가 필요 이상으로 복잡해질 수 있다.

## Abstract Method in TypeScript

### TypeScript의 패턴 사용

복잡도: ★★☆

인기: ★★★

사용 예: Abstract Factory패턴은 TS에서 매우 일반적이다. 많은 프레임워와 라이브러리는 표준 구성요소를 확장하고 사용자가 정의할 수 있는 방법을 제공하기 위해 이를 사용한다.

식별: 패턴은 메서드로 알아보기 쉬우므로 Factory Object를 반환한다. 그 이후, 공장은 특정 하위 구성 요소를 만드는데 사용한다.

`index.ts`

```ts
// 서로 다른 추상 제품을 반환하는 메서드 집합 선언
// 이러한 제품들을 제품군이라고 부르며 높은 수준의 주제나 개념에 의해 연관
// 앞서 언급된 의자, 소파 예제 사용
interface AbstractFactory {
  createChair(): Chair;
  createSofa(): Sofa;
}

// 콘크리트 공장을 정의하는 부분이며 이 예시에선 Victorian, Modern으로 나누어서 진행
// 단일 변형(variant)에 속하는 제품군 생산
// 추상 제품을 반환하는 한편 메서드 내에선 콘크리트 제품이 인스턴스화 됨
class VictorianFurnitureFactory implements AbstractFactory {
  public createChair(): Chair {
    return new VictorianChairs();
  }

  public createSofa(): Sofa {
    return new VictorianSofas();
  }
}

class ModernFurnitureFactory implements AbstractFactory {
  public createChair(): Chair {
    return new ModernChairs();
  }

  public createSofa(): Sofa {
    return new ModernSofas();
  }
}

// 변형 되기전 공통된 인터페이스
// 의자는 앉을 수 있다 라는 메서드를 가짐
interface Chair {
  sitOn(): string;
}

// 이러한 콘크리트 제품은 해당 콘크리트 공장에서 생산됨
class VictorianChairs implements Chair {
  public sitOn(): string {
    return '앉을 수 있는 의자1';
  }
}

class ModernChairs implements Chair {
  public sitOn(): string {
    return '앉을 수 있는 의자2';
  }
}

// 다른 제품의 공통 인터페이스
interface Sofa {
  // 소파에는 누울수도 있음
  lieOn(): string;

  // 다른 유용한 함수 (의자와 같이 할 수 있는)
  anotherUsefulFunctionB(collaborator: Chair): string;
}

class VictorianSofas implements Sofa {
  public lieOn(): string {
    return '누울 수도 있는 소파1';
  }

  public anotherUsefulFunctionB(collaborator: Chair): string {
    const result = collaborator.sitOn();
    return `소파1와 (${result})가 같이 협력한 결과`;
  }
}

class ModernSofas implements Sofa {
  public lieOn(): string {
    return '누울수도 있는 소파2';
  }

  public anotherUsefulFunctionB(collaborator: Chair): string {
    const result = collaborator.sitOn();
    return `소파 2와(${result})가 같이 협력한 결과`;
  }
}

function clientCode(factory: AbstractFactory) {
  const chair = factory.createChair();
  const sofa = factory.createSofa();

  console.log(sofa.lieOn());
  console.log(sofa.anotherUsefulFunctionB(chair));
}

console.log('빅토리안 가구 공장에서 만든 가구 테스팅');
clientCode(new VictorianFurnitureFactory());

console.log('');

console.log('모던 가구 공장에서 만든 가구 테스팅');
clientCode(new ModernFurnitureFactory());
```

## 요약

추상 공장 패턴은 구체적인 클래스를 만들지 않고 관련 제품군들과 같이 작동하며 결합도를 낮출 수 있는 패턴이다.

디자인패턴 구현 방법

- 제품을 위한 인터페이스 정의
- 인터페이스를 이용하여 그 제품을 위한 특정 제품 클래스를 정의
- 공장에서 무엇을 만들어야 하는지 추상화한 인터페이스를 정의
- 인터페이스를 이용하여 특정 공장의 클래스를 정의(여기서 제품군에 맞는 제품 클래스들을 `new`연산자와 같이 생성자로 호출해서 사용)

## 참고 사이트

- https://refactoring.guru/design-patterns/abstract-factory

- https://refactoring.guru/design-patterns/abstract-factory/typescript/example
