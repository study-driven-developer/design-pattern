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
