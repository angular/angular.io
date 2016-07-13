# 의사결정(decisions needed)

  - 1) 우리는 #docregion 태그로 표시할 수 있는 모든 문서를 마크업(mark up)하거나 서브 디렉토리에 있는 모든 실행가능한 예제를 분리시키기려고 합니다.

# 할일(todo)

  - 1) 추출된 조각을 파쇄하기 전에 여전히 ts파일을 js파일로 변환해야 합니다.
  - 2) 소스 테스트를 변경할 때 조각 파쇄기를 업데이트하기 위해서 감시(watches)를 만들어야 합니다.
  - 3) 조각을 보수하기 위해서는 여전히 메커니즘을 만들어야 합니다. ( '_' 아마도 그 이름은 접두사).

# 노트(notes)

  - 1) html 파일범위 구문

          <!--#docregion main  -->

          <!--#enddocregion -->
  - 2) js/ts 파일범위 구문

        // #docregion main

        // #enddocregion

# 타입스크립트 컴파일러 호출(typescript compiler call)
  tsc --m commonjs --t es5 --emitDecoratorMetadata --experimentalDecorators --sourceMap app.ts

