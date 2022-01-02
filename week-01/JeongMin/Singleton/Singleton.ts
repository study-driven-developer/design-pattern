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
