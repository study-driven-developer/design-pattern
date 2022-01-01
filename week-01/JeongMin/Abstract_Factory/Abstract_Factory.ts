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
    return '앉을 수 있는 빅토리안 의자';
  }
}

class ModernChairs implements Chair {
  public sitOn(): string {
    return '앉을 수 있는 현대식의 의자';
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
    return '누울 수도 있는 빅토리안 소파';
  }

  public anotherUsefulFunctionB(collaborator: Chair): string {
    const result = collaborator.sitOn();
    return `빅토리안 소파와 (${result})가 같이 협력한 결과`;
  }
}

class ModernSofas implements Sofa {
  public lieOn(): string {
    return '누울수도 있는 현대식의 소파';
  }

  public anotherUsefulFunctionB(collaborator: Chair): string {
    const result = collaborator.sitOn();
    return `현대식의 소파와(${result})가 같이 협력한 결과`;
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
