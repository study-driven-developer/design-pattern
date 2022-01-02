## 블로그 링크

https://velog.io/@hustle-dev/Creational-Design-Patterns-Prototype

## 의도

프로토타입은 코드를 클래스에 종속시키지 않고 기존 객체를 복사할 수 있는 creational design pattern 이다.

모든 프로토타입 클래스에는 구체적인 클래스를 알 수 없는 경우에도 객체를 복사할 수 있는 공통 인터페이스가 있어야 한다. 프로토타입 객체는 동일한 클래스의 객체가 서로의 개인 필드에 액세스 할 수 있으므로 전체 복사본을 생성할 수 있다.

![](https://images.velog.io/images/hustle-dev/post/364a3026-1a5c-442d-9d9b-cb498192eba1/image.png)

## 문제

만약 어떤 객체가 있고, 해당 객체의 정확한 사본을 만들려고 한다고 해보자. 이 경우 어떻게 해야할까? 먼저 같은 클래스의 객체를 새로 만들어야 한다. 그런 다음 원래 객체의 모든 필드를 살펴보고 해당 값을 새 객체에 복사해야한다.

그러나 객체의 필드 중 일부는 비공개이고 객체 자체의 외부에서는 보이지 않을 수 있기 때문에 모든 객체를 이러한 방식으로 복사할 순 없다.

![](https://images.velog.io/images/hustle-dev/post/5e9b376d-df5d-4e32-9bc9-57d9354300f3/image.png)

> 객체를 외부에서 복사하는 것은 항상 가능한 것이 아니다.

직접적인 접근에는 한 가지 문제점이 더 있다. 복제를 만들려면 객체의 클래스를 알아야하므로 코드는 해당 클래스에 종속된다. 이외에도 메서드의 매개변수가 일부 인터페이스를 따르는 모든 객체를 허용하는 경우 객체가 따르는 인터페이스만 알고 구체적인 클래스는 알지 못하는 경우가 있다.

## 해결책

프로토타입 패턴은 복제 프로세스를 복제 중인 실제 객체에 위임한다. 이 패턴은 복제를 지원하는 모든 객체에 대한 공통 인터페이스를 선언한다. 이 인터페이스를 사용하면 코드를 해당 객체의 클래스에 커플링하지 않고 객체를 복제할 수 있다. 일반적으로 이러한 인터페이스에는 단일 clone 메서드만 포함된다.

복제 방법의 구현은 모든 클래스에서 매우 유사하다. 메서드는 현재 클래스의 객체를 만들고, 이전 객체의 모든 필드 값을 새 객체로 전달한다. 대부분의 프로그래밍 언어는 객체가 동일한 클래스에 속한 다른 객체의 개인 필드에 액세스할 수 있도록 허용하기 때문에 개인 필드를 복사할 수도 있다.

복제를 지원하는 객체를 프로토타입이라고 한다. 객체의 수십개의 필드와 수백 개의 가능한 구성이 있는 경우 이를 복제하는 것이 하위 분류의 대안이 될 수 있다.

![](https://images.velog.io/images/hustle-dev/post/405dee0a-9944-4816-8381-84ebcadc5277/image.png)

> 미리 만들어진 프로토타입은 하위 분류의 대안이 될 수 있다.

작동방식은 다음과 같다. 다양한 방법으로 구성된 객체 집합을 만들고, 구성한 객체와 같은 객체가 필요한 경우 처음부터 새 객체를 생성하는 대신 프로토타입만 복제하면 된다.

## 현실 유사성

실제로 프로토타입은 제품 양산을 시작하기 전에 다양한 테스트를 수행하는데 사용된다. 그러나 이 경우 프로토타입은 실제 생산에 참여하지 않고 수동적인 역할을 대신한다.

![](https://images.velog.io/images/hustle-dev/post/d083ac9c-ae27-40fe-881f-9ff6ad9c118a/image.png)

> 셀의 분할

산업용 프로토타입은 실제로 자신을 복제하지 않기 때문에 패턴에 훨씬 더 가까운 유사점은 유사분열 과정이다. 유사 분열 후에 한 쌍의 동일한 세포가 형성된다. 원본 셀은 프로토타입 역할을 하며 복사본을 만드는데 적극적인 역할을 한다.

## 구조

`기본 구현`

![](https://images.velog.io/images/hustle-dev/post/80c846a7-7426-4555-b084-71d17c29c0a7/image.png)

1. 프로토타입 인터페이스는 복제 방법을 선언한다. 대부분의 경우 단일 복제 방법이다.

2. 콘크리트 프로토타입 클래스는 복제 방법을 구현한다. 이 방법은 원본 객체의 데이터를 복제본에 복사할 뿐만 아니라 연결된 객체 복제, 재귀 종속성 해제 등과 관련된 복제 프로세스의 일부 사례도 처리할 수 있다.

3. 클라이언트는 프로토타입 인터페이스를 따르는 모든 객체의 사본을 생성할 수 있다.

`프로토타입 레지스트리 구현`

![](https://images.velog.io/images/hustle-dev/post/214840ed-3394-4cd0-8f91-05210d6db11c/image.png)

프로토타입 레지스트리를 사용하면 자주 사용하는 프로토타입에 쉽게 액세스할 수 있다. 이 파일에는 복사할 준비가 된 사전 빌드된 객체 세트가 저장된다. 가장 간단한 프로토타입 레지스트리는 `이름 → 프로토타입 해시맵`이다. 그러나 간단한 이름보다 더 나은 검색 기준이 필요한 경우 훨씬 강력한 버전의 레지스트리를 작성할 수 있다.

## 적용가능성

- 복사해야 하는 객체의 특정 클래스에 따라 코드가 달라지지 않아야 하는 경우 프로토타입 패턴을 사용해라.

- 각 객체를 초기화 하는 방법만 다른 하위 클래스의 수를 줄이려면 이 패턴을 사용하라. 누군가 특정 구성으로 객체를 만들 수 있도록 이러한 하위 클래스를 만들 수 있다.

### 장단점

### 장점

- 구체적인 클래스에 결합하지 않고 객체를 복사할 수 있다.

- 반복적인 초기화 코드를 제거하여 사전 빌드된 프로토타입을 복제할 수 있다.

- 복잡한 객체를 더욱 편리하게 제작할 수 있다.

- 복잡한 객체에 대한 구성 사전 설정을 처리할 때 상속 대신 사용할 수 있다.

### 단점

- 순환 참조가 있는 복잡한 객체를 복제하는 것은 매우 까다로울 수 있다.

## Abstract Method in TypeScript

### TypeScript의 패턴 사용

복잡도: ★☆☆

인기: ★★☆

사용 예: 프로토타입 패턴은 JS의 네이티브 Object.assign() 메서드를 사용하여 TS에서 즉시 사용할 수 있다.

식별: 프로토타입은 복제 또는 복사 방법 등으로 쉽게 인식될 수 있다.

`index.ts`

```ts
// 이 예시 클래스는 복제 능력을 가지고 있다.
// 여기서 어떤식으로 다른 타입의 field 값들이 복제되는지 살펴보자.
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    console.log('clone', clone);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log('Primitive field values have been carried over to a clone. Yay!');
  } else {
    console.log('Primitive field values have not been copied. Booo!');
  }
  if (p1.component === p2.component) {
    console.log('Simple component has not been cloned. Booo!');
  } else {
    console.log('Simple component has been cloned. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('Component with back reference has not been cloned. Booo!');
  } else {
    console.log('Component with back reference has been cloned. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('Component with back reference is linked to original object. Booo!');
  } else {
    console.log('Component with back reference is linked to the clone. Yay!');
  }

  console.log(p1);
  console.log('');
  console.log(p2);
}

clientCode();
```

> 원시값은 그대로 복사되어 값이 같을때 처리가 되지만 `circularReference`와 `component` 같은 참조 타입은 값은 복사되지만 서로 참조하고 있는 값이 다르기 때문에 값이 다를 때 처리를 해준 결과가 복사되었음을 알리고 있다.

`결과`

![](https://images.velog.io/images/hustle-dev/post/397a4003-0529-45f7-afd3-acf0e17379c8/image.png)

## 요약

프로토타입 패턴은 다른 객체의 프로토타입 역할을하는 객체를 만드는 프로토타입 상속을 기반으로 한다. 이는 객체를 생성하는데 시간과 노력이 많이 들고 이미 유사한 객체가 존재하는 경우에 사용된다.

## 참고 사이트

- https://refactoring.guru/design-patterns/prototype

- https://refactoring.guru/design-patterns/prototype/typescript/example
