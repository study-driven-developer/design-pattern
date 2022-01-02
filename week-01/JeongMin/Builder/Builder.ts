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
