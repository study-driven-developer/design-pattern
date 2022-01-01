## 블로그 링크

https://velog.io/@hustle-dev/Creational-Design-Patterns-Factory-Method

---

**Creational Design Patterns**은 [[디자인 패턴] - 디자인 패턴 소개](https://velog.io/@hustle-dev/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%86%8C%EA%B0%9C) 부분에서 이야기 했듯이, 다양한 객체 생성 메커니즘을 제공하여 기존 코드의 유연성과 재사용성을 증가시킨다.

Factory Method의 도입부분에서 이를 다른 명칭으로 **가상 생성자**라고 부른다.

## 의도

**Factory Method**는 슈퍼클래스에서 객체를 만들기 위한 인터페이스를 제공하면서도, 하위 클래스가 생성될 객체의 유형을 변경할 수 있는 creational design pattern이다.

좀 더 이야기하면 Factory Method는 **직접 생성자 호출(constructor) 대신 객체를 생성하는데 사용되는 메서드를 정의**한다. 하위 클래스는 이 메서드를 재정의하여 생성될 객체의 클래스를 변경할 수 있다.

## 문제

이에 대해 자세하게 설명하기 위해, 물류 관리 어플리케이션을 만든다고 가정하자. 앱을 처음 설계할 때 트럭 운송 전용으로 만들었다면 코드의 대부분은 `Truck Class`와 관련된 부분이 많을 것이다.

얼마 후, 이 앱이 인기가 많아져서 해상 운송 회사로부터 해상 물류를 앱에 포함시켜달라는 요청을 받았다고 해보자.

![](https://images.velog.io/images/hustle-dev/post/21b24d10-8ff3-470a-a755-f7f2fa5586be/image.png)

> 이 순간, 코드가 이미 기존 클래스에 커플링되어 있다면 프로그램에 새 클래스를 추가하는 것은 간단하지 않을 것이다.
> → **결합도가 높아진 코드들을 분리하고 새로운 클래스를 추가**해야하기 때문

앱에 선박을 추가하려면 전체 코드베이스를 변경해야한다. 게다가, 나중에 다른 운송 수단을 앱에 추가하기로 결정한다면, 이 모든것들을 다시 또 해야하는 상황을 맞닥뜨리게 될 것이다.

결과적으로, 운송 객체의 등급에 따라 앱의 동작을 전환하는 조건들로 가득 찬 더러운 코드를 갖게된다.

## 해결책

Factory Method 패턴은 **`new` 연산자를 사용하여 직접 객체 생성을 호출하는 방법 보다 특수 Factory Method 호출 방법으로 바꿀 것을 제안**한다. 객체는 여전히 새 연산자를 통해 생성되지만 Factory Method 내에서 호출되고 있다. Factory Method에 의해 반환되는 객체는 종종 제품이라고 불린다.

![](https://images.velog.io/images/hustle-dev/post/07df9cf3-1bf3-49eb-b677-65909f43c800/image.png)

언뜻 보면 이 변경은 무의미해 보일 수 있다. 생성자 호출을 프로그램의 한 부분에서 다른 부분으로 옮겼을 뿐이기 때문이다. 그러나 이제 하위 클래스에서 공장 메서드를 재정의하고 메서드에 의해 생성되는 제품 클래스를 변경할 수 있다.

또한 약간의 제한이 있는데 하위 클래스는 이러한 제품들이 공통 기본 클래스나 인터페이스를 가지고 있는 경우에만 다른 유형의 제품을 반환할 수 있다. 또한 기본 클래스의 Factory Method는 반환 형식을 이 인터페이스로 선언해야 한다.

![](https://images.velog.io/images/hustle-dev/post/2d8e41ae-4081-4fc1-8e59-4c7feb8b03ba/image.png)

예를 들어 `Truck Class`와 `Ship Class`는 모두 `Transport Interface`를 구현해야 하며, 이 인터페이스는 배달이라는 메서드를 선언한다. 트럭은 육로로 화물을 운송하고 배는 해상으로 화물을 운송하기 때문에 `RoadLogistics` 클래스의 Factory Method는 트럭 객체를 반환하고 `SeaLogistics` 클래스의 Factory Method는 선박을 반환한다.

![](https://images.velog.io/images/hustle-dev/post/01fa1646-952c-438c-b088-dcb3821e873e/image.png)

Factory Method를 사용하는 코드(클라이언트 코드라고도 함)는 다양한 하위 클래스에서 반환되는 실제 제품 간의 차이를 인식하지 못한다. 고객은 코든 제품을 추상 운송으로 취급하며 모든 운송 객쳉는 배송 방법이 있어야 한다는 것을 알고 있지만, 정확히 어떻게 작동하는지는 고객에게 중요하지 않다.

## 구조

![](https://images.velog.io/images/hustle-dev/post/486aba27-7fc9-4f35-a5c7-dd84918ae536/image.png)

1. **제품**은 인터페이스를 선언하며 이는 creator와 하위 클래스 가 생성할 수 있는 모든 객체에 공통부분이다.

2. **Concrete 제품**은 제품 인터페이스의 다른 구현체이다.

3. **Creator 클래스**는 새 제품 객체를 반환하는 공장 메서드를 선언한다. 이 방법의 반환 유형이 제품 인터페이스와 일치하는지 여부가 중요하다.

Factory method를 추상 메서드로 선언하여 모든 하위 클래스가 자체 버전의 메서드로 구현하도록 할 수 있다. 또는 기본 Factory method가 일부 기본 제품 유형을 반환할 수 있다.

보통 Creator Class는 제품과 관련된 핵심 비즈니스 논리가 이미 존재한다. Factory method는 이 논리를 구체적인 제품 클래스에서 분리하는 데 도움이 된다. 예시로 소프트웨어 개발 회사는 프로그래머를 위한 교육 부서를 가질 수 있지만, 회사 전체의 주된 기능은 여전히 프로그래머를 교육시켜 생산하는 것이 아닌 코드를 작성하는 것이다.

4. Concrete Creators는 기본 Factory Method를 재정의하여 다른 유형의 제품을 반환한다.

Factory Method는 항상 새로운 인스턴스를 생성할 필요는 없다. 또한 캐시, 객체 풀 또는 다른 소스에서 기존 객체를 반환할 수 있다.

## 장단점

### 장점

- Creator(생성자함수)와 Concrete(제품, 결과물)간의 긴밀한 결합을 피할 수 있다.

- 제품 생성 코드를 프로그램의 한 곳으로 이동하여 **단일 책임 원칙**을 잘 보여줄 수 있다.

- 열기/닫기 원리. 기존 클라이언트 코드를 위반하지 않고 프로그램에 새로운 유형의 제품을 도입할 수 있다.

### 단점

- 패턴을 구현하려면 새로운 하위 클래스를 많이 도입해야해서 코드가 더 복잡해 질 수 있다. 가장 좋은 시나리오는 패턴을 기존 Creator 클래스 계층에 도입하는 경우이다.

## Factory Method in TypeScript

### TypeScript의 패턴 사용

복잡도: ★☆☆

인기: ★★★

사용 예: Factory Method 패턴은 TS 코드에서 널리 사용된다. 이 기능은 코드에 높은 수준의 유연성을 제공해야할 때 유용하다.

식별: Factory Method는 구체적인 클래스에서 객체를 생성하지만 추상 타입이나 인터페이스의 객체로 반환하는 생성 메서드로 인식할 수 있다.

`index.ts`

```ts
// 이 Creator 클래스는 Product클래스의 객체를 반환하는 Factory Method를 선언
// Creator의 하위 클래스는 일반적으로 이 메서드의 구현을 제공한다.
abstract class Creator {
  // 이 factoryMethod의 일부 기본 구현을 제공할 수도 있다.
  public abstract factoryMethod(): Product;

  // 주된 책임이 제품을 만드는 것이 아닌 제품 객체에 의존하는 몇 가지 핵심 비즈니스 논리 포함
  // 하위 클래스는 공장 메서드를 재정의하고 다른 유형의 제품을 반환함으로써 간접적으로 비즈니스 논리 변경 가능
  public someOperation(): string {
    // 제품 객체를 생성하기 위한 factoryMethod 호출!
    const product = this.factoryMethod();

    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

// 결과 제품의 유형을 변경하기 위해 factoryMethod 재정의 (overriding 하여)
class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}
```

## JS 간단한 예제

객체 생성을 나머지 코드와 분리한 예제

```js
function Vehicle() {}

function Car() {
  this.say = function () {
    console.log('I am a Car');
  };
}

function Bike() {
  this.say = function () {
    console.log('I am a Bike');
  };
}

function Train() {
  this.say = function () {
    console.log('I am a Train');
  };
}

function VehicleFactory() {
  this.createVehicle = function (vehicleType) {
    let vehicle;
    switch (vehicleType) {
      case 'car':
        vehicle = new Car();
        break;
      case 'Bike':
        vehicle = new Bike();
        break;
      case 'Train':
        vehicle = new Train();
        break;
      default:
        vehicle = new Vehicle();
    }

    return vehicle;
  };
}

const vehicleFactory = new VehicleFactory();

let car = vehicleFactory.createVehicle('car');

car.say();
```

## 참고 사이트

- https://refactoring.guru/design-patterns/factory-method/typescript/example

- https://refactoring.guru/design-patterns/factory-method

- https://sangcho.tistory.com/entry/%EC%9B%B9%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80%EC%95%8C%EC%95%84%EC%95%BC%ED%95%A07%EA%B0%80%EC%A7%80%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4
