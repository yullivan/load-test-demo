// k6는 부하 테스트를 위한 오픈 소스 도구입니다
import http from 'k6/http'; // HTTP 요청을 보내기 위한 k6 모듈 임포트
import { check, sleep } from 'k6'; // 응답 검증과 지연 시간 설정을 위한 함수 임포트

// 테스트 옵션 설정 - 테스트의 전체적인 동작 방식을 정의합니다
export let options = {
    vus: 1, // 가상 사용자(Virtual User) 수 - 동시에 1명의 사용자가 테스트를 수행합니다
    duration: '10s', // 테스트 지속 시간 - 10초 동안 테스트를 실행합니다

    thresholds: { // 성능 기준값 설정 - 이를 초과하면 테스트가 실패로 간주됩니다
        http_req_duration: ['p(99)<1500'], // 99%의 요청이 1.5초(1500ms) 이내에 완료되어야 함
    },
};

// 테스트 환경에 따른 URL 설정
// Docker Compose 환경에서는 frontend 컨테이너의 주소를 사용
// 로컬 테스트 시에는 'http://localhost:3000'으로 변경하세요
const FRONTEND_URL = 'http://frontend:3000';

// 기본 시나리오 함수 - 테스트의 주요 흐름을 정의합니다
export default function () {
    toMainPage(); // 메인 페이지 접속 테스트
    toItemsPage(); // 아이템 목록 페이지 접속 테스트
    sleep(1); // 1초 대기 - 실제 사용자의 행동을 시뮬레이션하고 서버에 과부하를 방지합니다
};

// 메인 페이지 테스트 함수
function toMainPage() {
    let res = http.get(`${FRONTEND_URL}/`); // 메인 페이지에 GET 요청을 보냅니다
    check(res, { // 응답 검증 - 설정한 조건이 충족되는지 확인합니다
        'Main Page status is 200': (r) => r.status === 200, // HTTP 상태 코드가 200(성공)인지 확인
        'Main Page content check': (r) => r.body.includes('Next.js') // 응답 본문에 'Next.js' 문자열이 포함되어 있는지 확인
    });
    console.log(`Main Page Response: Status ${res.status}, Time ${res.timings.duration}ms`); // 테스트 결과 로깅
}

// 아이템 목록 페이지 테스트 함수
function toItemsPage() {
    let res = http.get(`${FRONTEND_URL}/items`); // 아이템 페이지에 GET 요청을 보냅니다
    check(res, { // 응답 검증
        'Items Page status is 200': (r) => r.status === 200, // HTTP 상태 코드 확인
        'Items Page content check': (r) => r.body.includes('데이터 목록'), // 페이지에 '데이터 목록' 문자열이 있는지 확인
        'Items data loaded': (r) => !r.body.includes('데이터가 없습니다') // '데이터가 없습니다'가 없는지 확인하여 데이터 로딩 여부 확인
    });
    console.log(`Items Page Response: Status ${res.status}, Time ${res.timings.duration}ms`); // 테스트 결과 로깅
}