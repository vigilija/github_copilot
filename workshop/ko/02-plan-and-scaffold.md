# 파트 2: 계획 및 스캐폴딩(scaffolding)

---

코드를 작성하기 전에 Copilot의 계획 워크플로를 사용해 아키텍처를 구상합니다. 먼저 계획하면 더 나은 시스템을 설계하고 Copilot이 고품질 코드를 생성하는 데 필요한 맥락을 제공할 수 있습니다.

## 작업 1: API 아키텍처 계획

<!-- track:vscode:start -->
1. Copilot Chat에서 **Plan** 모드로 전환합니다(채팅 패널 아래쪽의 모드 선택기를 클릭합니다).
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. 모드가 바뀔 때까지 **Shift+Tab**을 누르거나 `/plan`을 사용해 Copilot CLI를 **plan mode**로 전환합니다.
<!-- track:cli:end -->

2. 다음 프롬프트를 입력합니다.

   ```
   I need to build a server-side API proxy that fetches GitHub contribution data
   for any username. The endpoint is https://github.com/{username}.contribs which
   returns JSON. The browser should call our API same-origin only. Plan the
   implementation including the route structure, error handling, and a shared
   Redis cache with a five-minute TTL. If Redis is unavailable, fetch upstream
   without caching.
   ```

3. **계획을 검토합니다.** 계획 수립의 장점이 드러나는 단계입니다. 첫 응답을 그대로 수락하지 마십시오.
   - 불명확한 점은 설명을 요청합니다.
   - 적절하지 않다고 느껴지는 부분은 변경을 제안합니다.
   - 진행 방법에 만족할 때까지 계획을 반복해서 다듬습니다.

<!-- track:vscode:start -->
4. 계획이 만족스러우면 Copilot에 구현을 요청합니다. **Agent** 모드로 전환해 진행하라고 합니다.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. 계획이 만족스러우면 Copilot CLI에 구현을 진행하라고 합니다.
5. 승인하기 전에 `/diff`로 생성된 파일 변경 내용을 검토합니다.
<!-- track:cli:end -->

6. **결과:** 다음 위치에 API 라우트가 만들어집니다.

   ```
   src/pages/api/contributions/[username].ts
   ```

## 작업 2: API 테스트

> **⚠️ 변경 사항이 보이지 않나요?** 개발 서버에서 새 라우트를 인식하지 못하면 서버를 중지(`Ctrl+C`)한 다음 `npm run dev`로 다시 시작합니다.

1. 개발 서버가 실행 중인지 확인한 다음 엔드포인트를 테스트합니다.

   ```bash
   curl http://localhost:4321/api/contributions/octocat
   ```

2. 기여도 데이터가 포함된 JSON 응답을 확인합니다.
3. 잘못된 사용자 이름을 입력해 오류 상황도 테스트하고 적절한 오류 응답이 반환되는지 확인합니다.

API 라우트는 `GET /api/contributions/:username`입니다. GitHub 사용자 이름 형식에 맞는지 검증하고, 성공하면 upstream JSON을 반환합니다. 오류 응답은 코드와 메시지를 포함하는 `error` 필드가 있는 JSON 객체입니다(`400` 잘못된 사용자 이름, `403` 허용되지 않은 출처, `404` 사용자를 찾을 수 없음, `502` upstream 오류, `504` 시간 초과). 브라우저 요청은 같은 출처에서만 허용합니다. `Origin` 헤더가 없는 명령줄 요청은 허용됩니다.

`REDIS_URL`이 설정되어 있으면 공유 캐시가 Redis를 사용하며 성공한 응답을 5분 동안 보관합니다. Redis가 설정되지 않았거나 연결할 수 없으면 라우트가 캐시 문제를 기록하고 캐싱 없이 upstream에서 최신 데이터를 가져옵니다. CORS는 브라우저 액세스를 제어하며 명령줄이나 서버 클라이언트의 직접 액세스는 제어하지 않습니다.

## 작업 3: 배틀 페이지 계획

<!-- track:vscode:start -->
1. **Plan** 모드를 유지하고 다음 프롬프트를 입력합니다.
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. plan mode를 유지하거나 `/plan`을 실행하고 다음 프롬프트를 입력합니다.
<!-- track:cli:end -->

   ```
   Now I need the main page. Plan a battle page for "Mona Mayhem - GitHub
   Contribution Battle Arena" with: two username inputs (Player 1 and Player 2),
   a battle button, and a results area. Keep the UI simple — don't over-engineer
   the layout or styling at this stage. Plan the HTML structure, basic styling,
   and how the battle interaction will work.
   ```

2. **계획을 검토하고 반복해서 다듬습니다.** 질문을 하고, 변경을 제안하고, 접근 방식을 개선합니다.

<!-- track:vscode:start -->
3. 만족스러운 계획이 나오면 **Agent** 모드로 전환해 Copilot이 페이지를 만들도록 합니다.
<!-- track:vscode:end -->

<!-- track:cli:start -->
3. 만족스러우면 Copilot CLI에 승인한 계획을 구현하도록 합니다.
4. 승인하기 전에 `/diff`로 HTML 및 CSS 기본 구조를 다시 확인합니다.
<!-- track:cli:end -->

## 작업 4: 기본 구조 확인

> **⚠️ 변경 사항이 보이지 않나요?** 페이지가 올바르게 표시되지 않거나 업데이트되지 않았다면 개발 서버를 중지(`Ctrl+C`)하고 `npm run dev`로 다시 시작한 다음 브라우저를 새로 고칩니다.

1. 브라우저에서 http://localhost:4321을 엽니다.
2. 다음 항목이 표시되어야 합니다.
   - 게임 제목
   - 사용자 이름 입력란 2개(Player 1 및 Player 2)
   - 배틀 버튼
3. 버튼은 아직 작동하지 않습니다. 상호작용 로직을 연결하는 작업은 다음 단계에서 진행하므로 정상입니다.

---

## ✅ 파트 2 완료!

다음 내용을 익혔습니다.

- 구현부터 시작하지 않고 **코드 작성 전에 계획 수립**
- 아키텍처가 적절해질 때까지 **계획 반복 개선**
- 더 명확하고 안전한 워크플로로 **계획에서 구현으로 전환**
