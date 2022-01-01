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
    // 이제 이를 사용하여 로직 구현
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

// function clientCode(creator: Creator) {
//   console.log("Client: I'm not aware of the creator's class, but it still works.");
//   console.log(creator.someOperation());
// }

// /**
//  * The Application picks a creator's type depending on the configuration or
//  * environment.
//  */
// console.log('App: Launched with the ConcreteCreator1.');
// clientCode(new ConcreteCreator1());
// console.log('');

// console.log('App: Launched with the ConcreteCreator2.');
// clientCode(new ConcreteCreator2());
