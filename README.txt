모바일 결혼 소식 청첩장 — 안성현 & 정미현

구성
index.html : 청첩장 화면
app.js : 사진 슬라이드, 애니메이션, 댓글 연결
photos/04.jpg : 메인 사진
photos/그 외 파일 : 앨범 사진 17장
gallery.json : 앨범 사진 목록과 순서
firebase-config.js : 댓글 서비스 설정 (현재 미설정)

GitHub 업로드
1. GitHub의 wedding-announcement 저장소를 Public으로 전환합니다. (Settings > General > Danger Zone > Change repository visibility)
2. 저장소 Code > Add file > Upload files 에서 압축파일을 푼 뒤 index.html, app.js, gallery.json, firebase-config.js 및 photos 폴더 속 사진들을 올립니다. GitHub 웹 업로드는 폴더 전체 드래그가 가능한 PC 크롬을 권장합니다.
3. Settings > Pages > Build and deployment > Deploy from a branch > main / (root) > Save
4. 주소 예시: https://qkrtk1231-dot.github.io/wedding-announcement/
5. 공개 저장소의 사진은 링크를 아는 사람뿐 아니라 인터넷에서 접근 가능하므로 공개 범위를 확인하세요.

사진 변경
- 메인 사진: photos/04.jpg 를 같은 파일명으로 교체
- 앨범 사진: photos 폴더에 파일 추가/삭제 후 gallery.json의 photos 배열에서 파일명 추가/삭제/순서 변경
- GitHub에서 파일 변경 후 몇 분 뒤 공개 페이지에 반영됩니다.
- 별도의 클릭형 관리자 화면은 아직 구현되어 있지 않습니다.

댓글 활성화 (선택)
1. Firebase Console에서 새 프로젝트와 웹 앱 생성 후 웹 앱 설정값을 firebase-config.js의 null 대신 입력합니다.
2. Firestore Database 생성. weddingMessages 컬렉션은 첫 댓글 작성 때 자동 생성될 수 있습니다.
3. Firestore 보안 규칙을 적절히 설정해야 합니다. 공개 익명 댓글은 스팸/악성글 위험이 있어 CAPTCHA, 관리자 검수, 삭제 기능이 포함된 별도 백엔드 구성을 권장합니다.
4. 현재 버전은 Firebase 설정 전 댓글 입력 버튼이 비활성화됩니다. 공개 운영 전에 보안 설정을 반드시 완료하세요.

주의: GitHub Pages는 정적 호스팅이며 자체적으로 댓글을 저장하지 않습니다.
