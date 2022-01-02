## 블로그 링크

https://velog.io/@hustle-dev/Creational-Design-Patterns-Builder

## 의도

빌더는 복잡한 객체를 단계별로 생성할 수 있는 creational design pattern이다. 이 패턴을 사용하면 동일한 구성 코드를 사용하여 객체의 다양한 유형과 표현을 생성할 수 있다.

다른 creational pattern과 달리 **빌더는 제품이 공통 인터페이스를 가질 필요가 없다.** **따라서 동일한 공정으로 서로 다른 제품을 생산**할 수 있다.

![](https://images.velog.io/images/hustle-dev/post/96946dbb-4478-4d01-8c79-8a2be4479a19/image.png)

## 문제

많은 분야와 중첩된 객체의 번거로운 단계별 초기화가 필요한 복잡한 객체를 상상해보자. 이러한 초기화 코드는 일반적으로 많은 매개변수를 가진 생성자 안에 묻혀있을 것이다. 만약 클라이언트 코드에 이러한 부분이 흩어져 있다면 그것은 더 안좋은 일이다.

![](https://images.velog.io/images/hustle-dev/post/5043f600-a279-4c96-b836-3a8a99c783b5/image.png)

> 객체의 생성 가능한 **모든 구성에 대해 하위 클래스를 만든다면, 프로그램이 너무 복잡해진다.**

예를 들어, 집이라는 객체를 작성하는 방법을 생각해보자. 간단한 집 객체를 생성하기 위해 4개의 벽과 1개의 바닥을 만들고, 문을 설치하고, 창문을 맞추고, 지붕을 지어야 한다. 그러나 뒤뜰, 난방 시스템, 배관 등이 있는 다른 집을 객체로 만들기 위한다면 어떤 문제가 발생할까?

가장 간단한 해결책은 기본 집 클래스를 확장하고 매개변수의 모든 조합을 포함하도록 하위 클래스 집합을 만드는 것이다. 그러나 이 방법을 사용하면, 결국에는 엄청나게 많은 하위 분류를 가지게 될 것이다.

하위 분류의 늘어남을 수반하지 않는 다른 접근법이 있다. 집 객체를 제어하는 모든 가능한 매개변수를 사용하여 기본 하우스 클래스에서 바로 거대한 생성자를 작성할 수 있다. 이 접근법은 하위분류의 필요성을 없애주지만, 또 다른 문제를 야기한다.

![](https://images.velog.io/images/hustle-dev/post/0e96cb14-3979-4c76-b43e-be626b00fce1/image.png)

> 매개변수가 많은 생성자의 단점으로 모든 매개변수가 항상 필요한 것은 아니라는 점이다.

대부분의 매개변수는 사용되지 않으므로 생성자 호출 코드가 매우 더러워질 것이다.

## 해결책

빌더 패턴은 **자체 클래스에서 객체 생성자 코드를 추출하여 빌더라는 개별 객체로 이동하는 것을 제안**한다.

![](https://images.velog.io/images/hustle-dev/post/7a0db9e9-2f47-4cad-86d7-0072214d9ca6/image.png)

> 빌더 패턴을 적용하면 복잡한 객체를 단계별로 구성할 수 있다. 빌더는 제품이 제작되는 동안 다른 객체가 제품에 접근하는 것을 허용하지 않는다.

패턴은 객체 구성을 단계 집합(`buildWalls()`, `buildDoors()` 등)으로 구성한다. 객체를 생성하려면 반드시 빌더 객체에서 이러한 단계를 차례로 실행시켜야 한다. **중요한 점은 모든 단계를 호출할 필요가 없다는 점**이다. 객체의 특정 구성을 생성하는데 필요한 단계만 호출할 수 있다.

제품의 다양한 표현을 작성해야 할 때 일부 구성 단계는 다른 구현이 필요할 수도 있다. 예를 들어 오두막의 벽은 나무로 지어지지만 성벽은 돌로 지어져야 한다.

이 경우 동일한 빌드 단계 세트를 구현하지만 다른 방식으로 여러 개의 빌더 클래스를 만들 수 있다. 그런다음 이러한 빌더를 건설 프로세스에 사용하여 다양한 종류의 객체를 생성할 수 있다.

![](https://images.velog.io/images/hustle-dev/post/35d1a30c-4186-40b2-90f5-e8feb2bbfcd8/image.png)

> 여러 빌더들이 다양한 방법으로 같은 업무를 수행한다.

예를 들어 3가지의 건축가가 있다고 상상해보자

- 나무와 유리로 모든 것을 짓는 건축가
- 돌과 철로 모든 것을 짓는 건축가
- 금과 다이아몬드를 사용해서 모든 것을 짓는 건축가

첫 번째 건축가에게 평범한 집을, 두 번째 건축가에게는 작은 성을, 세 번째 건축가에게는 궁전을 만들게 할 수 있다. 그러나 이것은 빌드 단계를 호출하는 클라이언트가 공통 인처페이스를 사용하여 빌더와 상호 작용할 수 있는 경우에만 작동한다.

### Director

나아가 제품을 구성하는 데 사용하는 빌더 단계에 대한 일련의 호출을 디렉터라는 별도의 클래스로 추출할 수 있다. Director 클래스는 건축 단계를 실행할 순서를 정의하는 반면 빌더는 이러한 단계에 대한 구현을 제공한다.

![](https://images.velog.io/images/hustle-dev/post/62755644-c175-4392-9fe6-1d159bbbecde/image.png)

> Director는 작동하는 제품을 얻기 위해 어떤 빌드 단계를 실행해야 하는지 알고있다.

프로그래멩서 director 클래스는 꼭 존재해야만 하는 것은 아니다. 언제든지 클라이언트 코드에서 직접 특정 순서로 빌딩 단계를 호출할 수 있다. 그러나 director 클래스는 프로그램 전체에서 재사용할 수 있도록 다양한 구성 루틴을 배치하는 데 좋은 클래스여서 이를 활용하는 것도 나쁘지 않다.(필요하다면)

또한 director 클래스는 클라이언트 코드에서 제품 구성 내역을 완전히 숨긴다. 클라이언트는 빌더를 디렉터와 연결하고, 빌더를 디렉터와 함께 시작하고, 빌더로부터 결과를 얻기만 하면 된다.

## 구조

![](https://images.velog.io/images/hustle-dev/post/9ad4c82c-b77a-41a4-b4ab-6f79513b1025/image.png)

1. **빌더 인터페이스**는 모든 유형의 빌더에 공통적인 제품 빌드 단계를 선언한다.

2. **콘크리트 빌더**는 시공 단계의 다양한 구현을 제공한다. 콘크리트 빌더는 공통 인터페이스를 따르지 않는 제품을 생산할 수도 있다.

3. **제품은 결과 객체**이다. 서로 다른 빌더들이 만든 제품들은 같은 클래스 계층 구조나 인터페이스에 종속적일 필요가 없다.

4. **Director 클래스**는 특정 제품 구성을 작성하고 재사용할 수 있도록 구성 단계를 호출하는 순서를 정의한다.

5. 클라이언트는 빌더 객체 중 하나를 디렉터와 연결하여 디렉터는 그 빌더 객체를 사용하여 이후 작업을 수행한다.

## 적용가능성

- builder 패턴을 사욯아여 **텔레스코픽 생성자**를 제거하자.

예시

```js
class Pizza {
    Pizza(int size) { ... }
    Pizza(int size, boolean cheese) { ... }
    Pizza(int size, boolean cheese, boolean pepperoni) { ... }
    // ...
```

- 일부 제품(예: 석조 및 목조 주택)의 다른 표현을 코드가 작성할 수 있도록 하려면 작성기 패턴을 사용해라.

- 합성 트리 또는 기타 복잡한 객체를 작성할 때 빌더 패턴을 사용하자.

## 장단점

### 장점

- 객체를 단계별로 생성하거나 생성 단계를 연기하거나 단계를 반복적으로 실행할 수 있다.

- 다양한 제품 표현을 제작할 때 동일한 빌더 코드를 재사용할 수 있다.

- 단일 책임원칙을 지킬 수 있다.

### 단점

- 패턴은 여러 개의 새 클래스를 만들어야 하므로 코드의 전반적인 복잡성이 증가한다.

## Abstract Method in TypeScript

### TypeScript의 패턴 사용

복잡도: ★★☆

인기: ★★★

사용 예: 빌더 패턴은 TS에서 잘 알려진 패턴이다. 특히 가능한 구성 옵션이 많은 객체를 생성해야할 때 유용하다.

식별: 빌더 패턴은 단일 생성 메서드와 결과 객체를 구성하는 여러 메서드를 가진 클래스에서 인식될 수 있다. 빌더 메서드는 메서드체인이 지원하는 경우가 많다.

예시: `someBuilder.setValueA(1).setValueB(2).create()`

`index.ts`

```ts
// 빌더 인터페이스는 제품 객체의 다른 부분들을 생성하기 위한 메서드를 명시한다.
interface Builder {
  produceWindows(): void;
  produceDoors(): void;
  produceWalls(): void;
}

// 콘크리트 빌더 클래스는 빌더 인터페이스를 따르고 빌드 단계에 대한 명시적 수행을 제공한다.
// 프로그램에서 아마 다르게 수행되는 여러개의 빌더 변형들이 존재할 것이다.
class WoodHouseBuilder implements Builder {
  private product: woodHouse;

  // 새로 만드는 인스턴스에는 추가 조립에서 사용되는 빈 제품 객체가 포함되어 있어야 한다.
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new woodHouse();
  }

  // 모든 생산 단계는 동일한 제품의 인스턴스에서 작동한다.
  public produceWindows(): void {
    this.product.parts.push('windows');
  }

  public produceDoors(): void {
    this.product.parts.push('doors');
  }

  public produceWalls(): void {
    this.product.parts.push('wall');
  }

  // 만든 제품의 결과를 보여주는 메서드를 제공
  // 다양한 유형의 빌더가 동일한 인터페이스를 따르지 않는 오나전히 다른 제품을 만들 수도 있기 때문
  // reset 메서드는 필수가 아니지만 보통 클라이언트에게 쵲오 결과를 반환후, 다른 제품을 생산할
  // 준비를 하기 위해 붙여준다.
  public getProduct(): woodHouse {
    const result = this.product;
    this.reset();
    return result;
  }
}

// 다른 creational pattern과 달리 서로다른 콘크리트 빌더들은 관련없는 제품을 생산할 수 있다.
// 다양한 빌더의 결과가 항상 동일한 인터페이스를 따르지 않을 수 있다.
class woodHouse {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`WoodHouse parts: ${this.parts.join(', ')}\n`);
  }
}

// 디렉터는 오로지 특정 작업의 빌드 단계의 실행과 관련한 책임을 가진다.
// 특정 주문이나 구성에 따라 제품을 생산할 때 도움이 된다.
class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableWoodHouse(): void {
    this.builder.produceWindows();
  }

  public buildFullFeaturedWoodHouse(): void {
    this.builder.produceWindows();
    this.builder.produceWalls();
    this.builder.produceDoors();
  }
}

function clientCode(director: Director) {
  const builder = new WoodHouseBuilder();
  director.setBuilder(builder);

  console.log('Standard basic product:');
  director.buildMinimalViableWoodHouse();
  builder.getProduct().listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedWoodHouse();
  builder.getProduct().listParts();

  console.log('Custom product:');
  builder.produceWindows();
  builder.produceDoors();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
```

`결과`

![](https://images.velog.io/images/hustle-dev/post/d39d94bc-1467-488b-955c-4cf005c3e90b/image.png)

## 요약

빌더 패턴은 객체를 생성할 때 많은 파라미터 값들이 전달될 때 생길 수 있는 문제들을 해결한다. 이를 해결하기 위해 별도의 Builder 클래스를 만들어 필요한 값들에 대해서 메서드(체이닝)를 통해 원하는 값들을 생성한다. 이렇게 메서드들을 통해 코드의 가독성 또한 높일 수 있다.

## 참고 사이트

- https://refactoring.guru/design-patterns/builder

- https://refactoring.guru/design-patterns/builder/typescript/example
