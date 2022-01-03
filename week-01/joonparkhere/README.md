## 디자인 패턴 감 잡기

**디자인 패턴**은 소프트웨어 설계 중 발생하는 자주 발생하는 문제를 풀어내기 위한 해결방법이다. 이는 어떠한 명확한 코드가 아니라, 특정 문제를 해결하기 위한 General Concept이다. 알고리즘은 항상 어떠한 목표를 달성할 수 있는 일련의 과정들을 명확히 정의한다면, 디자인 패턴은 어떠한 해결방법에 대한 추상적인 묘사의 방법이다. 때문에 동일한 패턴을 적용한 두 프로그램의 구현 코드는 서로 다를 수 있다. 비유를 하자면 알고리즘은 요리 레시피, 디자인 패턴은 청사진이라고 할 수 있다.

### 왜 배울까

- 디자인 패턴은 소프트웨어 설계의 자주 등장하는 문제들을 위한 시도 & 테스트해보기 위한 일종의 Toolkit 이다. 관련 문제를 직면하지 않더라도, 패턴을 알고 있는 것은 객체지향 설계의 원리를 이용하여 다양한 종류의 문제를 해결하는 방법을 가르쳐주기 때문에 유용하다.
- 디자인 패턴은 동료들과 함께 효율적으로 소통할 수 있는 공용 용어를 정의해준다. "그 부분은 싱글톤을 사용해줘" 라고 말하면, 쉽게 어떤 얘기인 지 이해할 수 있다. 패턴과 그 이름을 안다면 싱글톤에 대한 부연 설명이 필요하지 않게 된다.

### 패턴의 분류

디자인 패턴은 각 패턴 별 복잡성 및 세부 수준, 설계되는 전체 시스템에 대한 적용 가능 규모에 따라 구분된다. 가장 기본적이며 Low-level의 패턴들은 **idioms** (관용구) 라고 불린다. 가장 보편성을 띄고 High-level의 패턴들은 **Architectural Patterns**라고 불린다.

- Creational Pattern (생성 패턴)

  기존 코드의 유연성과 재사용성을 증진시켜주는 객체 생성에 관한 메커니즘을 제공

- Structural Pattern (구조 패턴)

  구조를 유연하고 효율적으로 유지하면서 객체와 클래스를 더 큰 구조로 만듦

- Behavioral Pattern (행동 패턴)

  코드 상의 효과적인 소통 및 객체 간의 책임 할당을 처리

---

## Creational Pattern

### Factory Method

#### Intent

Super-class 형태로 인터페이스를 이용해 객체를 생성하면서도 Sub-class에서는 생성될 객체의 세부 타입을 변경할 수 있는 방법이다.

![서비스 개요[^1]](images/factory-method-en.png)

#### Problem

애플리케이션에서 군수 관리를 위한 객체 생성을 구현한다고 하자. 처음에는 오직 트럭을 통한 방안만 구현하여 구현 코드는 `Truck` 클래스 내에 위치한다.

![문제점[^1]](images/factory-method-problem1-en.png)

그러나 서비스 규모가 커지면서 배를 통한 운송도 필요하게 되어, `Ship` 클래스를 구현해야 한다. 하지만 관련 구현이 모두 `Truck` 클래스에 의존적이므로 전반적인 코드 수정이 필연적이다. 이 상태가 유지된다면 다른 운송 수단이 추가될 때마다 이 문제는 점점 거대해지며, 구현 코드는 수많은 조건문의 분기들로 이루어져 코드의 악취가 나게 된다.

#### Solution Structure

![Truck과 Ship 클래스 예제](images/factory-method-solution2-en.png)

직접 구현 객체를 생성하는 부분을 Factory Method를 호출하여 생성하도록 수정한다. 이때 Factory Method의 반환 객체는 Super-class가 된다. Sub-class에서는 Factory Method를 오버라이딩하여 각 역할에 맞는 객체를 반환하도록 구현하면 된다. 이때 Sub-class에서는 Super-class를 상속하는 객체만을 반환해야 하는 약간의 한계점이 발생한다. 이로써 실제 서비스 동작은 Sub-class들을 통해 이루어지지만 Factory Method를 이용해 확장에 용이하도록 구조를 변경할 수 있다. 더불어 클라이언트는 모든 구현 객체의 상세 로직을 알 필요 없이, 오로지 그 객체의 역할만을 알면 된다.

![코드 구조](images/fatcory-method-structure.png)

1. `Product`는 구현하고자 하는 객체의 역할에 집중한다.

2. `Concrete Prodocuts`들은 `Product` 인터페이스의 각 구현체들이다.

3. `Creator`는 인터페이스인 `Product`를 반환하는 Factory Method가 정의된 클래스이다.

   Factory Method가 알맞은 `Concrete Creator`를 호출할 수 있도록 구현체를 식별할 수 있는 파라미터가 전달되어야 한다.

4. `Concrete Creator`들은 Base Factory Method를 오버라이딩하여 각 구현체를 반환한다.

#### Applicability

- 사전에 정확히 어떠한 구현체 혹은 의존성이 필요한 지 알 수 없을 때 사용
- 클라이언트들에게 현재 개발한 코드의 향후 확장성을 제공하고자 할 때 사용
- 매번 새로운 객체를 생성하지 않고 존재하는 객체를 재사용하여 리소스를 절약
  1. 기존에 생성된 객체들에 대한 정보를 기록
  2. 객체 요청이 올 때, 기록된 정보 중에 사용되지 않고 있는 (Free) 객체를 탐색
  3. 그러한 객체가 있다면 반환하고, 없다면 새로운 객체를 생성하여 반환

> 너무 많은 Sub-class가 있는 경우 지나치게 코드가 복잡해질 수 있다. 이를 방지하기 위해 Sub-class 끼리 계층적인 구조를 갖도록 하는 것을 권장한다.

#### Code Example

- Practice with Go

  [Github Repository](https://github.com/joonparkhere/records/tree/main/content/post/design-pattern/project/hello-creational-pattern/factory-method)

- Spring Framework

  ```java
  public interface BeanFactory {
      Object getBean(String name) throws BeansException;
      <T> T getBean(String name, Class<T> requiredType) throws BeansException;
      // ...
  }
  ```

  ```java
  public class SimpleJndiBeanFactory extends JndiLocatorSupport implements BeanFactory {
      @Override
  	public Object getBean(String name) throws BeansException {
  		return getBean(name, Object.class);
  	}
      
      @Override
  	public <T> T getBean(String name, Class<T> requiredType) throws BeansException {
  		try {
  			if (isSingleton(name))
  				return doGetSingleton(name, requiredType);
  			else
  				return lookup(name, requiredType);
  		}
  		catch (Exception ex) { ... }
  	}
      // ...
  }
  ```

[^1]: [Factory Method Origin](https://refactoring.guru/design-patterns/factory-method)

---

### Abstract Factory

#### Intent

구현 클래스에 커플링되지 않고 비슷한 특성을 갖는 객체들을 생성하는 방법이다.

![개요[^2]](images/abstract-factory-en.png)

#### Problem

![예시[^2]](images/abstract-factory-problem-en.png)

예를 들어, `Chair`, `Sofa`, `CoffeeTable` 세 개의 제품이 있고, 각 제품마다 `Modern`, `Victorian`, `ArtDeco` 세 개의 디자인을 갖는다면, `Chair`의 Factory Method에 세 디자인에 대한 구현 로직이 있어야 한다. 여기서 디자인이 추가된다면 점점 코드가 복잡해지고, 다른 가구와의 코드 중복이 발생한다. 더불어 구현체의 코드 수정이 불가피하다.

#### Solution Structure

![Chair 클래스 예제 코드[^2]](images/abstract-factory-solution1.png)

Abstract Factory 패턴은 먼저 각 특성을 갖는 구현체의 역할을 명시할 인터페이스를 선언하고, 각 구현체들을 만든다. 예를 들어, 모든 `Chair` 구현체는 `Chair` 인터페이스를 구현해야 한다.

![Abstract Factory 예제 코드[^2]](images/abstract-factory-solution2.png)

그리고 생성 메서드를 포함한 Abstract Factory를 선언한다. 구현체와의 디커플링을 위해 생성 메서드는 추상 객체를 반환해야 한다. 이제 각 특성을 갖는 객체를 생성하는 Factory 클래스를, `AbstractFactory` 인터페이스를 구현하여 만든다. 예를 들어, `ModernFurnitureFactory`는 `ModernChair`, `ModernSofa`, `ModernCoffeeTable` 객체 생성을 담당한다.

![Abstract Factory 구조[^2]](images/abstract-factory-structure.png)

0. 우선 각각의 구현체가 갖는 특성들을 행렬 형태로 정리해 본다.
1. `Abstract Product`들은 공통된 역할을 명시하는 인터페이스다.
2. `Concrete Product`들은 추상 객체의 구현체이며 각 특성에 의해 그룹핑된 클래스이다.
3. `Abstract Factory`는 추상 객체들을 생성하는 메서드들을 갖는 인터페이스다.
4. `Concrete Factory`들은 Factory의 구현체이며, 각 특성에 맞는 구현체를 생성한다.

#### Applicability

- 다양한 특성을 갖는 여러 객체들이 있고, 이후 특성을 추가할 때 구현체의 코드를 건들지 않기를 원하거나 사전에 어느 정도의 확장성을 고려해야 할 지 감이 오지 않을 때 사용

> Factory Method 방법과 마찬가지로, 점점 더 많은 특성을 갖는 구현체가 늘어날 수록 코드가 복잡해질 수 있다.

#### Code Example

- Practice with Go

  [Github Repository](https://github.com/joonparkhere/records/tree/main/content/post/design-pattern/project/hello-creational-pattern/abstract-factory)

- Spring framework

  ```java
  public abstract class AbstractFactoryBean<T>
  		implements FactoryBean<T>, BeanClassLoaderAware, BeanFactoryAware, InitializingBean, DisposableBean {
      protected abstract T createInstance() throws Exception;
      // ...
  }
  ```

  ```java
  public class ListFactoryBean extends AbstractFactoryBean<List<Object>> {
      @Override
  	protected List<Object> createInstance() {
  		if (this.sourceList == null) throw new IllegalArgumentException("'sourceList' is required");
          
  		List<Object> result = null;
  		if (this.targetListClass != null) 
              result = BeanUtils.instantiateClass(this.targetListClass);
  		else 
  			result = new ArrayList<>(this.sourceList.size());
          
  		Class<?> valueType = null;
  		if (this.targetListClass != null)
  			valueType = ResolvableType.forClass(this.targetListClass).asCollection().resolveGeneric();
  		if (valueType != null) {
  			TypeConverter converter = getBeanTypeConverter();
  			for (Object elem : this.sourceList)
  				result.add(converter.convertIfNecessary(elem, valueType));
  		}
  		else {
  			result.addAll(this.sourceList);
  		}
          
  		return result;
  	}
      // ...
  }
  ```

  ```java
  public class MapFactoryBean extends AbstractFactoryBean<Map<Object, Object>> {
      @Override
  	protected Map<Object, Object> createInstance() {
  		if (this.sourceMap == null) throw new IllegalArgumentException("'sourceMap' is required");
  
  		Map<Object, Object> result = null;
  		if (this.targetMapClass != null)
  			result = BeanUtils.instantiateClass(this.targetMapClass);
  		else
  			result = CollectionUtils.newLinkedHashMap(this.sourceMap.size());
          
  		Class<?> keyType = null;
  		Class<?> valueType = null;
  		if (this.targetMapClass != null) {
  			ResolvableType mapType = ResolvableType.forClass(this.targetMapClass).asMap();
  			keyType = mapType.resolveGeneric(0);
  			valueType = mapType.resolveGeneric(1);
  		}
  		if (keyType != null || valueType != null) {
  			TypeConverter converter = getBeanTypeConverter();
  			for (Map.Entry<?, ?> entry : this.sourceMap.entrySet()) {
  				Object convertedKey = converter.convertIfNecessary(entry.getKey(), keyType);
  				Object convertedValue = converter.convertIfNecessary(entry.getValue(), valueType);
  				result.put(convertedKey, convertedValue);
  			}
  		}
  		else {
  			result.putAll(this.sourceMap);
  		}
          
  		return result;
  	}
      // ...
  }
  ```

  ```java
  public class SetFactoryBean extends AbstractFactoryBean<Set<Object>> {
      @Override
  	protected Set<Object> createInstance() {
  		if (this.sourceSet == null) throw new IllegalArgumentException("'sourceSet' is required");
          
  		Set<Object> result = null;
  		if (this.targetSetClass != null) 
              result = BeanUtils.instantiateClass(this.targetSetClass);
  		else 
              result = new LinkedHashSet<>(this.sourceSet.size())
  
  		Class<?> valueType = null;
  		if (this.targetSetClass != null)
  			valueType = ResolvableType.forClass(this.targetSetClass).asCollection().resolveGeneric();
  		if (valueType != null) {
  			TypeConverter converter = getBeanTypeConverter();
  			for (Object elem : this.sourceSet)
  				result.add(converter.convertIfNecessary(elem, valueType));
  		}
  		else {
  			result.addAll(this.sourceSet);
  		}
          
  		return result;
  	}
      // ...
  }
  ```

[^2]: [Abstarct Factory Origin](https://refactoring.guru/design-patterns/abstract-factory)

---

### Builder

#### Intent

Builder 패턴은 복잡한 객체를 체계적으로 생성할 수 있도록 돕는 방안이다.

#### Problem

만약 아래와 같이 다양하면서 반복적인 객체들이 복잡하게 얽혀있다고 할 때, 생성자는 객체가 복잡한 만큼 거대해지게 된다.

![House 예제[^3]](images/builder-problem1.png)

가장 간단한 해결책은 `House` 클래스를 상속한 Sub-class들을 만들어서 각각의 객체들을 Sub-class에서 생성하도록 하는 것이다. 그러나 Sub-class 수가 많아질수록, 심지어는 하나의 필드가 추가되더라도, 점점 계층 구조가 깊어지게 된다.

다른 해결책은 Sub-class를 만들지 않고, 하나의 클래스에서 거대한 생성자로 모든 필드들을 처리하는 것이다. 하지만 이렇게 되면 필드값을 세팅하기 위한 생성자 파라미터에 의미없는 값들이 너무나도 많아지게 된다.

![House Giant Constructor[^3]](images/builder-problem2.png)

#### Solution Structure

![Extract Builder Class[^3]](images/builder-solution1.png)

Builder 패턴은 객체 생성하는 코드를 별도의 클래스로 추출하여 진행하도록 한다. 해당 클래스는 `buildWalls`, `buildDoor` 등과 같은 생성 로직을 담고 있다. 여기서 중요한 점은 어떠한 객체를 생성하기 위해서 모든 로직들을 호출하지 않아도 된다는 점이다. 객체 생성에 필요한 필드값을 세팅하는 메서드들만 호출하여 만든다.

![Builder Structure](images/builder-structure.png)

1. `Builder` 인터페이스는 객체 생성에 공통적으로 필요한 필드를 세팅한다.

2. `Concrete Builder`들은 각 객체마다 다른 로직을 가진 필드를 세팅한다. (e.g., `buildStepA()`, `buildStepB()`)

   더불어 세팅한 결과를 조회할 수 있는 메서드를 구현해야 한다. (e.g., `getResult()`)

3. `Product`들은 생성된 객체다. 이 객체들은 동일한 클래스 계층 구조나 인터페이스에 속하지 않을 수 있다.

4. `Director`는 반복되는 객체 생성 과정을 별도의 메서드로 구현해, 재사용할 수 있도록 한다.

   이 클래스는 필수로 있어야 하는 것은 아니다.

#### Applicability

- 아래와 같이 망원경처럼 점점 길이지는 생성자들을 제거 가능

  ```java
  class Pizza {
      Pizza(int size) { ... }
      Pizza(int size, boolean cheese) { ... }
      Pizza(int size, boolean cheese, boolean pepperoni) { ... }
      // ...
  }
  ```

- Composite Tree 패턴 (복잡한 객체의 성질) 을 가진 클래스를 생성

> 객체를 생성하기 위해 `Builder`, `Director` 클래스가 필요하는 등, 이전보다 코드 복잡성이 높아질 수 있다.

#### Code Example

- Practice with Go

  [Github Repository](https://github.com/joonparkhere/records/tree/main/content/post/design-pattern/project/hello-creational-pattern/builder)

- Spring Security

  ```java
  public interface WebSecurityConfigurer<T extends SecurityBuilder<Filter>> extends SecurityConfigurer<Filter, T> {
  }
  ```

  ```java
  public abstract class WebSecurityConfigurerAdapter implements WebSecurityConfigurer<WebSecurity> {
      protected WebSecurityConfigurerAdapter() {
  		this(false);
  	}
  
  	protected WebSecurityConfigurerAdapter(boolean disableDefaults) {
  		this.disableDefaults = disableDefaults;
  	}
      
      @Autowired
  	public void setApplicationContext(ApplicationContext context) {
  		/* ... */
  	}
      
      @Autowired(required = false)
  	public void setTrustResolver(AuthenticationTrustResolver trustResolver) {
  		this.trustResolver = trustResolver;
  	}
  
  	@Autowired(required = false)
  	public void setContentNegotationStrategy(ContentNegotiationStrategy contentNegotiationStrategy) {
  		this.contentNegotiationStrategy = contentNegotiationStrategy;
  	}
  
  	@Autowired
  	public void setObjectPostProcessor(ObjectPostProcessor<Object> objectPostProcessor) {
  		this.objectPostProcessor = objectPostProcessor;
  	}
  
  	@Autowired
  	public void setAuthenticationConfiguration(AuthenticationConfiguration authenticationConfiguration) {
  		this.authenticationConfiguration = authenticationConfiguration;
  	}
      // ...
  }
  ```

[^3]: [Builder Origin](https://refactoring.guru/design-patterns/builder)

---

### Prototype

#### Intent

Prototype 패턴은 코드의 의존성 없이 특정 객체와 동일한 객체를 복사하고 싶을 때 사용한다.

#### Problem

단순히 객체를 복사하기 위해서는 동일한 클래스의 빈 객체를 생성하고, 복사하고자 하는 객체가 가진 필드 값들과 동일하게 전부 세팅해야 한다. 그러나 만약 private 필드나 외부에서 접근할 수 없는 것이 있는 경우에는 문제가 발생할 수 있다. 더불어 이처럼 구현한다면, 객체 복사과정이 객체의 구현에 의존하게 된다.

#### Solution Structure

Prototype 패턴은 객체 복사 과정을 해당 객체가 하도록 위임하는 형태이다.

![Prototype Structure[^4]](images/prototype-structure.png)

1. `Prototype` 인터페이스는 복사하는 역할을 갖는 메서드를 갖는다.
2. `Concrete Prototype`은 복사 역할의 메서드를 구현해야 한다.
3. `Client`는 인터페이스의 복사 역할의 메서드를 호출하여 객체 복사를 한다.

#### Applicability

- 복사하고자 하는 객체에 의존하여 진행하고 싶지 않은 경우 이용

> 때때로 객체를 복사하는 과정에서 순환 참조가 발생할 수 있다.

#### Code Example

- Practice with Go

  [Github Repository](https://github.com/joonparkhere/records/tree/main/content/post/design-pattern/project/hello-creational-pattern/prototype)

- java.lang.Object

  ```java
  public class Object {
      public boolean equals(Object obj) {
          return (this == obj);
      }
      
      @IntrinsicCandidate
      protected native Object clone() throws CloneNotSupportedException;
      
      public String toString() {
          return getClass().getName() + "@" + Integer.toHexString(hashCode());
      }
      // ...
  }
  ```

  ```java
  public class ArrayList<E> extends AbstractList<E>
          implements List<E>, RandomAccess, Cloneable, java.io.Serializable
  {
      public Object clone() {
          try {
              ArrayList<?> v = (ArrayList<?>) super.clone();
              v.elementData = Arrays.copyOf(elementData, size);
              v.modCount = 0;
              return v;
          } catch (CloneNotSupportedException e) {
              // this shouldn't happen, since we are Cloneable
              throw new InternalError(e);
          }
      }
      // ...
  }
  ```

[^4]: [Prototype Origin](https://refactoring.guru/design-patterns/prototype)

---

### Singleton

#### Intent

Singleton 패턴은 클래스가 오직 하나의 인스턴스만을 갖고 전역 접근 가능하도록 하는 방법이다.

#### Problem

아래의 두 가지 문제를 해결하고자 한다. 이때 Singleton 패턴은 SRP 원칙을 위배한다.

1. 클래스가 오직 하나의 인스턴스만을 갖도록 한다. 이때 일반적인 클래스 생성자는 항상 새로운 인스턴스를 반환하므로, 생성자 접근을 제어하고 다른 방식으로 인스턴스를 반환하는 로직 구현이 필요하다.
2. 그렇게 만들어진 인스턴스를 전역에서 접근 가능하도록 한다. 더불어 그 인스턴스가 오버라이팅되지 않도록 보호한다.

#### Solution Structure

클래스의 기본 생성자는 외부에서 접근하지 못하도록 private 제어를 건다. 대신 private 생성자를 호출하거나 이미 생성된 인스턴스를 반환하는 정적 메서드를 제공한다.

![Singleton Structure[^5]](images/singleton-structure-en.png)

1. `Singleton` 클래스는 항상 동일한 인스턴스를 반환하도록 `getInstance`와 같은 정적 메서드를 포함한다.

   정적 메서드은 **lazy initialization**을 지원해야 한다. 메서드가 처음 호출될 때만 새 인스턴스를 생성한 후 정적 필드 값으로 넣어준다. 이후 메서드를 호출할 때는 동일한 인스턴스를 반환한다.

#### Applicability

- 어느 클래스가 오직 하나의 인스턴스만을 갖도록 해야할 때 사용

> SRP (Single Responsibilty Principle) 을 위배한다. 이 패턴은 동시에 두 가지 문제를 해결하려 한다.
>
> 패턴 이용을 위해 추가적인 (어쩌면 지저분한) 코드가 필요하다.
>
> Singleton 패턴으로 인해 좋지 않는 구조 설계가 가려질 수 있다.
>
> 멀티 스레드 환경에서는 별도의 조치가 추가적으로 필요하다.
>
> 유닛 테스트 환경에서 제대로 된 테스트가 어렵다. 별도로 모킹하는 과정이 필요하다.

#### Code Example

- Practice with Go

  [Github Repository](https://github.com/joonparkhere/records/tree/main/content/post/design-pattern/project/hello-creational-pattern/singleton)

- Spring Container Singleton

  ```java
  public class GenericApplicationContext extends AbstractApplicationContext implements BeanDefinitionRegistry {
  	private final DefaultListableBeanFactory beanFactory;
      // ...
  }
  ```

  ```java
  public class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory
  		implements ConfigurableListableBeanFactory, BeanDefinitionRegistry, Serializable {
      @Override
  	public <T> T getBean(Class<T> requiredType, @Nullable Object... args) throws BeansException {
  		Assert.notNull(requiredType, "Required type must not be null");
  		Object resolved = resolveBean(ResolvableType.forRawClass(requiredType), args, false);
  		if (resolved == null) throw new NoSuchBeanDefinitionException(requiredType);
  		return (T) resolved;
  	}
      
      @Nullable
  	private <T> T resolveBean(ResolvableType requiredType, @Nullable Object[] args, boolean nonUniqueAsNull) {
  		NamedBeanHolder<T> namedBean = resolveNamedBean(requiredType, args, nonUniqueAsNull);
  		if (namedBean != null)
  			return namedBean.getBeanInstance();
          
  		BeanFactory parent = getParentBeanFactory();
  		if (parent instanceof DefaultListableBeanFactory)
  			return ((DefaultListableBeanFactory) parent).resolveBean(requiredType, args, nonUniqueAsNull);
  		else if (parent != null) {
  			ObjectProvider<T> parentProvider = parent.getBeanProvider(requiredType);
  			if (args != null)
  				return parentProvider.getObject(args);
  			else
  				return (nonUniqueAsNull ? parentProvider.getIfUnique() : parentProvider.getIfAvailable());
  		}
          
  		return null;
  	}
      // ...
  }
  ```

  스프링은 서버 환경에서 Singleton이 만들어져 사용하는 것을 적극 지원한다. 하지만 자바의 기본적인 Singleton 패턴의 구현 방식은 여러 단점이 있기 때문에, 스프링은 직접 Singleton Container 역할을 하는 Singleton Registry를 만들어 관리한다. **Singleton Registry**는 IoC 방식의 컨테이너를 이용해 기존 Singleton 방식의 단점을 해결한다.

  스프링의 빈들은 `Bean Factory`에 의해 관리되며 기본적으로 빈의 생명주기 Scope는 Singleton이다. 별도의 설정이 없다면 `DefaultListableBeanFactory`를 스프링 부트에서 기본으로 사용한다. 위의 `resolveBean` 메서드 내에서는 `private`, `static`와 같은 접근 제어자를 통한 Singleton 패턴이 없다.

[^5]: [Singleton Origin](https://refactoring.guru/design-patterns/singleton)
