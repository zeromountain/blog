---
slug: react-compiler
title: React Compiler
description: about React Compiler
date: 2024-10-17
---

### 목차

1. 전통적인 컴파일러란 무엇인가?
2. 리액트 컴파일러 아키텍처
3. 리액트 컴파일러 실제 사용
4. 리액트 컴파일러 없이 문제 이해하기
5. 리액트 컴파일러 없이 문제 해결하기
6. 리액트 컴파일러 사용하여 문제 해결하기
7. 리액트 컴파일러로 최적화된 리액트 앱
8. 리액트 개발자 도구에서의 리액트 컴파일러
9. 심층 분석 — 리액트 컴파일러는 어떻게 작동하는가?
10. 리액트 컴파일러를 어떻게 선택하거나 제외할 수 있는가?
11. 리액트 18.x 에서 리액트 컴파일러를 사용할 수 있는가?
12. 살펴볼 만한 저장소들
13. 다음은 무엇인가요?
14. 전통적인 컴파일러란 무엇인가?

간단히 말해, 컴파일러는 고수준 프로그래밍 언어 코드(소스 코드)를 기계어로 변환하는 소프트웨어 프로그램/도구입니다. 소스 코드를 컴파일하고 기계어를 생성하기 위해 따라야 할 여러 단계가 있습니다.

어휘 분석기(Lexical Analyzer)는 소스 코드를 토큰화하고 토큰을 생성합니다.
구문 분석기(Syntax Analyzer)는 소스 코드 토큰을 논리적으로 구조화하기 위해 추상 구문 트리(AST)를 만듭니다.
의미 분석기(Semantic Analyzer)는 코드의 의미(또는 구문) 정확성을 검증합니다.
각 분석기에 의한 세 가지 유형의 분석 후, 일부 중간 코드(intermediate code)가 생성됩니다. 이는 IR 코드로도 알려져 있습니다.
IR 코드에 대해 최적화가 수행됩니다.
마지막으로, 최적화된 IR 코드로부터 컴파일러에 의해 기계어가 생성됩니다.

이제 컴파일러가 어떻게 작동하는지 기본을 이해했으니, 리액트 컴파일러에 대해 배우고 그것이 어떻게 작동하는지 이해해 봅시다.

리액트 컴파일러 아키텍처
리액트 컴파일러는 빌드 과정에서 사용되는 도구입니다. 이는 리액트 19 프로젝트에서 리액트 도구 생태계가 제공하는 설정 옵션을 사용하여 명시적으로 설정해야 합니다.

예를 들어, Vite를 사용하여 리액트 애플리케이션을 만드는 경우 컴파일러 설정은 vite.config.js 파일에서 이루어집니다.

리액트 컴파일러에는 세 가지 주요 설정 요소가 있습니다.

바벨 플러그인: 컴파일 과정에서 코드 변환을 돕습니다.
ESLint 플러그인: 리액트 규칙 위반을 포착하고 보고하는 데 도움을 줍니다.
컴파일러 코어: 코드 분석과 최적화를 수행하는 핵심 컴파일러 로직입니다. 바벨과 ESLint 플러그인 모두 코어 컴파일러 로직을 사용합니다.
컴파일 흐름은 다음과 같습니다.

바벨 플러그인은 컴파일할 함수(컴포넌트 또는 훅)를 식별합니다. 나중에 컴파일 과정에 포함하거나 제외하는 방법을 배우기 위해 몇 가지 설정을 볼 것입니다. 플러그인은 각 함수에 대해 코어 컴파일러 로직을 호출하고 최종적으로 추상 구문 트리를 생성합니다.
그런 다음 컴파일러 코어는 바벨 AST를 IR 코드로 변환하고, 이를 분석하며, 규칙이 위반되지 않았는지 확인하기 위해 다양한 유효성 검사를 실행합니다.
다음으로, 사용하지 않는 죽은 코드를 제거하기 위해 여러 패스(pass) 처리 과정을 거쳐 최적화할 코드의 양을 줄이려고 시도합니다. 코드는 메모이제이션을 사용하여 추가로 최적화됩니다.
마지막으로, 코드 생성 단계에서 변환된 AST가 최적화된 자바스크립트 코드로 다시 변환됩니다.
리액트 컴파일러 실제 사용
이제 리액트 컴파일러가 어떻게 작동하는지 알았으니, 리액트 19 프로젝트에서 이를 설정하는 방법을 살펴보고 다양한 최적화에 대해 배워보겠습니다.

리액트 컴파일러 없이 문제 이해하기
리액트로 간단한 제품 페이지를 만들어 보겠습니다. 제품 페이지는 페이지에 있는 제품 수를 보여주는 제목, 제품 목록, 그리고 주요 제품들을 표시합니다.

컴포넌트 계층 구조와 컴포넌트 간 데이터 전달은 다음과 같습니다.

위 이미지에서 볼 수 있듯이,

ProductPage 컴포넌트는 Heading, ProductList, FeaturedProducts 세 개의 자식 컴포넌트를 가집니다.
ProductPage 컴포넌트는 products와 heading 두 개의 프로퍼티를 받습니다.
ProductPage 컴포넌트는 총 제품 수를 계산하고 이 값을 제목 텍스트 값과 함께 Heading 컴포넌트에 전달합니다.
ProductPage 컴포넌트는 products prop을 ProductList 자식 컴포넌트에 전달합니다.
마찬가지로, 주요 제품들을 계산하여 featuredProducts prop을 FeaturedProducts 자식 컴포넌트에 전달합니다.
다음은 ProductPage 컴포넌트의 소스 코드가 어떻게 보일지 나타낸 것입니다.

```jsx
import React from 'react';

import FeaturedProducts from './FeaturedProducts';
import Heading from './Heading';
import ProductList from './ProductList';

const ProductPage = ({ products, heading }) => {
  const featuredProducts = products.filter((product) => product.featured);
  const totalProducts = products.length;
  return (
    <div className="m-2">
      <Heading heading={heading} totalProducts={totalProducts} />
      <ProductList products={products} />
      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
};
export default ProductPage;
```

ProductPage 컴포넌트를 App.js 파일에서 다음과 같이 사용한다고 가정해 봅시다.

```jsx
import ProductPage from './components/compiler/ProductPage';

function App() {
  // 음식 상품 리스트
  const foodProducts = [
    {
      id: '001',
      name: 'Hamburger',
      image: '🍔',
      featured: true,
    },
    {
      id: '002',
      name: 'French Fries',
      image: '🍟',
      featured: false,
    },
    {
      id: '003',
      name: 'Taco',
      image: '🌮',
      featured: false,
    },
    {
      id: '004',
      name: 'Hot Dog',
      image: '🌭',
      featured: true,
    },
  ];
  return <ProductPage products={foodProducts} heading="The Food Product" />;
}
export default App;
```

좋아요. 그렇다면 문제는 어디에 있을까요? 문제는 리액트가 부모 컴포넌트가 다시 렌더링 될 때 자식 컴포넌트를 선제적으로 다시 렌더링 한다는 것입니다. 불필요한 렌더링은 최적화가 필요합니다. 먼저 문제를 완전히 이해해 봅시다.

각 자식 컴포넌트에 현재 타임스탬프를 추가해 보겠습니다. 이제 렌더링 된 사용자 인터페이스는 다음과 같이 보일 것입니다:

제목 옆에 보이는 큰 숫자는 컴포넌트 코드에 추가한 타임스탬프(자바스크립트 Date API의 간단한 Date.now() 함수 사용)입니다. 이제 ProductPage 컴포넌트의 heading 프로퍼티 값을 변경하면 어떻게 될까요?

변경 전:

```jsx
<ProductPage products={foodProducts} heading="The Food Product" />
```

변경 후(heading 값 끝에 s를 추가하여 products를 복수형으로 만들었습니다).

```jsx
<ProductPage products={foodProducts} heading="The Food Products" />
```

이제 사용자 인터페이스에서 즉각적인 변화를 볼 수 있을 것입니다. 세 개의 타임스탬프가 모두 업데이트되었습니다. 이는 프로퍼티 변경으로 인해 부모 컴포넌트가 다시 렌더링 될 때 세 개의 컴포넌트가 모두 다시 렌더링 되었기 때문입니다.

보시다시피, heading 프로퍼티는 Heading 컴포넌트에만 전달되었는데도 다른 두 자식 컴포넌트도 다시 렌더링 되었습니다. 이런 부분이 바로 최적화가 필요한 부분입니다.

리액트 컴파일러 없이 문제 해결하기
앞서 논의했듯이, 리액트는 메모이제이션을 위한 다양한 훅과 API를 제공합니다. 불필요하게 다시 렌더링 되는 컴포넌트를 보호하기 위해 React.memo() 또는 useMemo()를 사용할 수 있습니다.

예를 들어, React.memo()를 사용하여 ProductList 컴포넌트를 메모이제이션 할 수 있습니다. 이렇게 하면 products 프로퍼티가 변경되지 않는 한 ProductList 컴포넌트가 다시 렌더링 되지 않습니다.

useMemo() 훅을 사용하여 주요 제품 계산을 메모이제이션 수 있습니다. 두 구현 모두 아래 이미지에 표시되어 있습니다.

하지만 다시 한번, 위대한 벤 삼촌의 현명한 말을 상기해 보면, 지난 몇 년 동안 우리는 이러한 최적화 기술을 과도하게 사용하기 시작했습니다. 이러한 과도한 최적화는 애플리케이션의 성능에 부정적인 영향을 미칠 수 있습니다. 컴파일러를 사용할 수 있게 되면 이러한 다양한 최적화 작업을 컴파일러가 대신 처리할 수 있으므로 리액트 개발자들에게 상당한 이점이 됩니다.

이제 리액트 컴파일러를 사용하여 문제를 해결해 보겠습니다.

리액트 컴파일러 사용하여 문제 해결하기
다시 말씀드리면, 리액트 컴파일러는 빌드 과정에서 선택적으로 사용할 수 있는 도구입니다. 리액트 19 RC에 번들로 포함되어 있지 않습니다. 필요한 의존성을 설치하고 리액트 19 프로젝트에서 컴파일러를 설정해야 합니다.

컴파일러를 설정하기 전에, 프로젝트 디렉토리에서 다음 명령을 실행하여 코드베이스가 호환되는지 확인할 수 있습니다.

`npx react-compiler-healthcheck@experimental`
이 명령은 다음 사항을 확인하고 보고합니다.

컴파일러에 의해 최적화될 수 있는 컴포넌트의 수
리액트의 규칙이 준수되고 있는지
호환되지 않는 라이브러리가 있는지

호환성이 확인되면, 리액트 컴파일러가 지원하는 ESLint 플러그인을 설치할 차례입니다. 이 플러그인은 코드에서 리액트 규칙 위반을 감지하는 데 도움을 줍니다. 규칙을 위반하는 코드는 리액트 컴파일러에 의해 건너뛰어지며 최적화되지 않습니다.

`npm install eslint-plugin-react-compiler@experimental`
그런 다음 ESLint 설정 파일(예: Vite의 경우 .eslintrc.cjs)을 열고 다음 설정을 추가하세요.

```js
module.exports = {
  plugins: ['eslint-plugin-react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
```

다음으로, 리액트 컴파일러용 바벨 플러그인을 사용하여 프로젝트 전체에 컴파일러를 적용할 수 있습니다. 리액트 19로 새 프로젝트를 시작한다면, 프로젝트 전체에 리액트 컴파일러를 적용하는 것을 추천합니다. 리액트 컴파일러용 바벨 플러그인을 설치해 보겠습니다.

`npm install babel-plugin-react-compiler@experimental`
설치가 완료되면 바벨 설정 파일에 옵션을 추가하여 설정을 완료해야 합니다. Vite를 사용하고 있으므로 vite.config.js 파일을 열고 내용을 다음 코드 스니펫으로 교체하세요.

```js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ReactCompilerConfig = {
  /* ... */
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
});
```

여기서 babel-plugin-react-compiler를 설정에 추가했습니다. ReactCompilerConfig는 커스텀 런타임 모듈이나 다른 설정을 제공하고 싶을 때와 같은 고급 설정을 제공하는 데 필요합니다. 이 경우에는 고급 설정 없이 빈 객체로 남겨두었습니다.

이것으로 끝입니다. 리액트 컴파일러의 기능을 활용하기 위해 코드베이스에 설정을 완료했습니다. 이제부터 리액트 컴파일러는 프로젝트의 모든 컴포넌트와 훅을 검토하여 최적화를 적용하려고 시도할 것입니다.

Next.js, Remix, Webpack 등에서 리액트 컴파일러를 설정하고 싶다면, 이 가이드를 참조하세요.

리액트 컴파일러로 최적화된 리액트 앱
이제 리액트 컴파일러를 사용해 최적화된 리액트 앱을 가지게 되었습니다. 그럼, 이전에 했던 것과 같은 테스트를 다시 실행해 보겠습니다. 다시 한번 ProductPage 컴포넌트의 heading 프로퍼티 값을 변경해 보세요.

이번에는 자식 컴포넌트들이 다시 렌더링 되는 것을 보지 못할 것입니다. 따라서 타임스탬프도 업데이트되지 않을 것입니다. 하지만 데이터가 변경된 컴포넌트의 일부분만 변경 사항을 반영하는 것을 볼 수 있을 것입니다. 또한 더 이상 코드에서 memo, useMemo(), 또는 useCallback()을 사용할 필요가 없습니다.

여기서 시각적으로 작동하는 것을 볼 수 있습니다.

리액트 개발자 도구에서의 리액트 컴파일러
리액트 DevTools 버전 5.0 이상은 리액트 컴파일러에 대한 내장 지원을 제공합니다. 리액트 컴파일러에 의해 최적화된 컴포넌트 옆에 Memo ✨ 텍스트가 있는 배지를 볼 수 있습니다. 이는 정말 멋진 기능입니다!

심층 분석 — 리액트 컴파일러는 어떻게 작동하는가?
리액트 19 코드에서 리액트 컴파일러가 어떻게 작동하는지 확인했으니, 이제 뒤에서 무슨 일이 일어나는지 자세히 살펴보겠습니다. 리액트 컴파일러 플레이그라운드를 사용하여 변환된 코드와 최적화 단계를 탐색해 보겠습니다.

Heading 컴포넌트를 예시로 사용하겠습니다. 다음 코드를 플레이그라운드의 가장 왼쪽 섹션에 복사하여 붙여 넣으세요.

```jsx
const Heading = ({ heading, totalProducts }) => {
  return (
    <nav>
      <h1 className="text-2xl">
        {heading}({totalProducts}) - {Date.now()}
      </h1>
    </nav>
  );
};
```

플레이그라운드의 \_JS 탭 안에 즉시 일부 자바스크립트 코드가 생성되는 것을 볼 수 있습니다. 리액트 컴파일러는 컴파일 과정의 일부로 이 자바스크립트 코드를 생성합니다. 이제 단계별로 살펴보겠습니다.

```js
function anonymous_0(t0) {
  const $ = _c(4);
  const { heading, totalProducts } = t0;
  let t1;
  if ($[0] === Symbol.for('react.memo_cache_sentinel')) {
    t1 = Date.now();
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  let t2;
  if ($[1] !== heading || $[2] !== totalProducts) {
    t2 = (
      <nav>
        <h1 className="text-2xl">
          {heading}({totalProducts}) - {t1}
        </h1>
      </nav>
    );
    $[1] = heading;
    $[2] = totalProducts;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  return t2;
}
```

컴파일러는 \_c()라는 훅을 사용하여 캐시할 항목들의 배열을 생성합니다. 위 코드에서는 네 개의 항목을 캐시하기 위해 네 개의 요소를 가진 배열이 생성되었습니다.

```js
const $ = _c(4);
```

그렇다면, 캐시해야 할 항목들은 무엇일까요?

이 컴포넌트는 heading과 totalProducts 두 개의 프로퍼티를 받습니다. 컴파일러는 이들을 캐시해야 합니다. 따라서 캐시할 수 있는 항목 배열에 두 개의 요소가 필요합니다.
헤더의 Date.now()도 캐시 되어야 합니다.
JSX 자체도 캐시 되어야 합니다. 위의 항목들이 변경되지 않는 한 JSX를 다시 계산할 필요가 없습니다.
따라서 총 네 개의 항목을 캐시해야 합니다.

컴파일러는 if-block을 사용하여 메모이제이션 블록을 생성합니다. 컴파일러의 최종 반환 값은 세 가지 의존성을 가진 JSX입니다.

`Date.now()` 값
heading과 totalProducts 두 개의 프로퍼티
출력 JSX는 위의 항목 중 하나라도 변경될 때 재계산이 필요합니다. 이는 컴파일러가 위의 각각에 대해 두 개의 메모이제이션 블록을 생성해야 함을 의미합니다.

첫 번째 메모이제이션 블록은 다음과 같습니다.

```js
if ($[0] === Symbol.for('react.memo_cache_sentinel')) {
  t1 = Date.now();
  $[0] = t1;
} else {
  t1 = $[0];
}
```

이 if-블록은 `Date.now()`의 값을 캐시할 수 있는 배열의 첫 번째 인덱스에 저장합니다. 변경되지 않는 한 매번 동일한 값을 재사용합니다.

마찬가지로, 두 번째 메모이제이션 블록에서는 아래와 같습니다.

```js
if ($[1] !== heading || $[2] !== totalProducts) {
  t2 = (
    <nav>
      <h1 className="text-2xl">
        {heading}({totalProducts}) - {t1}
      </h1>
    </nav>
  );
  $[1] = heading;
  $[2] = totalProducts;
  $[3] = t2;
} else {
  t2 = $[3];
}
```

여기서는 heading 또는 totalProducts 프로퍼티의 값 변경을 확인합니다. 이 중 하나라도 변경되면 JSX를 재계산해야 합니다. 그리고 모든 값을 캐시할 수 있는 배열에 저장합니다. 값에 변화가 없다면 이전에 계산된 JSX를 캐시에서 반환합니다.

이제 다른 컴포넌트의 소스 코드를 왼쪽에 붙여 넣고 생성된 자바스크립트 코드를 살펴봄으로써 위에서 한 것처럼 무슨 일이 일어나는지 이해할 수 있습니다. 이를 통해 컴파일 과정에서 컴파일러가 메모이제이션 기법을 어떻게 시행하는지 더 잘 파악할 수 있을 것입니다.

리액트 컴파일러를 어떻게 선택하거나 제외할 수 있는가?
리액트 컴파일러를 지금까지 한 Vite 프로젝트와 같은 방식으로 설정하면, 프로젝트의 모든 컴파일러와 훅에 대해 활성화됩니다.

하지만 경우에 따라 리액트 컴파일러를 선택적으로 적용하고 싶다면 어떻게 할까요? 그런 경우, compilationMode: "annotation" 옵션을 사용하여 "opt-in" 모드로 컴파일러를 실행할 수 있습니다.

```js
// ReactCompilerConfig에 옵션 지정
const ReactCompilerConfig = {
  compilationMode: 'annotation',
};
```

그런 다음 컴파일을 적용하고 싶은 컴포넌트와 훅에 "use memo" 지시어로 주석을 달아주세요.

```jsx
// src/ProductPage.jsx
export default function ProductPage() {
  'use memo';
  // ...
}
```

반대로, "use no memo" 지시어도 있습니다. 컴파일 후 컴포넌트가 예상대로 작동하지 않아 문제가 확인되고 해결될 때까지 일시적으로 컴파일을 비활성화하고 싶은 드문 경우가 있을 수 있습니다. 그런 경우 이 지시어를 사용할 수 있습니다.

```jsx
function AComponent() {
  'use no memo';
  // ...
}
```

리액트 18.x 에서 리액트 컴파일러를 사용할 수 있는가?
리액트 컴파일러는 필요한 호환성 때문에 리액트 19와 함께 사용하는 것이 권장됩니다. 만약 애플리케이션을 리액트 19로 업그레이드할 수 없다면, 캐시 함수의 커스텀 구현이 필요할 것입니다. 이에 대한 해결 방법을 설명하는 이 스레드를 살펴보세요.

살펴볼 만한 저장소들
이 글에서 사용된 모든 소스 코드는 이 저장소에 있습니다.
리액트 19와 그 기능들을 사용하여 코딩을 시작하고 싶다면, 여기 리액트 19 RC, Vite, 그리고 TailwindCSS로 구성된 템플릿 저장소가 있습니다. 한번 시도해 보시기 바랍니다.
다음은 무엇인가요?
더 자세히 알아보려면,

여기에서 리액트 컴파일러의 공식 문서를 확인하세요.
워킹 그룹의 토론을 확인해 보세요.
다음으로, React와 Next.js와 같은 생태계를 기본 개념과 프로젝트를 통해 배우고 싶은 분들에게 좋은 소식이 있습니다. 제 유튜브 채널에서 22개 이상의 비디오 튜토리얼과 12시간 이상의 흥미로운 콘텐츠를 무료로 볼 수 있는 이 재생목록을 확인해 보세요. 여러분도 마음에 들어하시길 바랍니다.

이제 마무리하겠습니다. 이 글을 읽으면서 즐거우셨나요? 새로운 것을 배우셨나요? 그렇다면 이 콘텐츠가 도움이 되었는지 알고 싶습니다.

제 유튜브 채널을 구독해 주세요.
실력 향상 팁을 놓치고 싶지 않다면 X(트위터)나 링크드인에서 저를 팔로우하세요.
깃헙에서 제 오픈 소스 작업을 확인하고 팔로우해 주세요.
GreenRoots 블로그에 정기적으로 유익한 글을 올리고 있습니다. 도움이 될 것입니다.
다음 글에서 곧 뵙겠습니다. 그때까지 건강 조심하시고, 계속 배움을 이어가세요.
