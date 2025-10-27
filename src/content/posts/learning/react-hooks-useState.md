---
title: "React useState 훅 완벽 가이드"
date: "2025-01-15"
category: "학습내용"
tags: ["React", "Hooks", "useState", "JavaScript"]
description: "React의 가장 기본적인 훅인 useState에 대해 깊이 있게 알아봅니다."
thumbnail: "/images/posts/react-hooks.jpg"
---

# React useState 훅 완벽 가이드

React의 `useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 가장 기본적인 Hook입니다.

## useState란?

`useState`는 React 16.8 버전부터 도입된 Hook으로, 클래스 컴포넌트의 `this.state`를 함수형 컴포넌트에서 사용할 수 있게 만들어줍니다.

## 기본 사용법

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

## 주요 특징

### 1. 초기값 설정

`useState`의 인자로 초기값을 전달할 수 있습니다.

```javascript
const [name, setName] = useState('홍길동');
const [age, setAge] = useState(25);
const [isActive, setIsActive] = useState(true);
```

### 2. 함수형 업데이트

이전 상태를 기반으로 새로운 상태를 계산할 때는 함수형 업데이트를 사용하는 것이 좋습니다.

```javascript
// ❌ 좋지 않은 방법
setCount(count + 1);

// ✅ 권장하는 방법
setCount(prevCount => prevCount + 1);
```

**이유**: React는 상태 업데이트를 배치 처리하기 때문에, 여러 번의 업데이트가 동시에 일어날 경우 함수형 업데이트를 사용해야 정확한 값을 보장받을 수 있습니다.

### 3. 객체와 배열 상태 관리

객체나 배열을 상태로 관리할 때는 불변성을 유지해야 합니다.

```javascript
// 객체 업데이트
const [user, setUser] = useState({ name: '김철수', age: 30 });

// ✅ 올바른 방법: 스프레드 연산자 사용
setUser(prev => ({ ...prev, age: 31 }));

// 배열 업데이트
const [items, setItems] = useState([1, 2, 3]);

// ✅ 올바른 방법: 새로운 배열 생성
setItems(prev => [...prev, 4]);
```

## 주의사항

1. **Hook은 최상위에서만 호출**: 조건문, 반복문, 중첩 함수 내에서 호출하면 안 됩니다.
2. **React 함수 컴포넌트 내에서만 호출**: 일반 JavaScript 함수에서는 사용할 수 없습니다.
3. **상태 업데이트는 비동기**: `setState` 직후 상태가 즉시 변경되지 않습니다.

## 실전 예제

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 마무리

`useState`는 React의 가장 기본적이면서도 강력한 Hook입니다. 이를 제대로 이해하고 사용하는 것이 React 개발의 첫 걸음입니다.

다음에는 `useEffect`와 `useContext` 등 다른 Hook들에 대해서도 알아보겠습니다!
