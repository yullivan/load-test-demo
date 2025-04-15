import { fetchData } from "@/utils/api";

interface ItemResponse {
  id: number;
  name: string;
  description: string;
}

// 서버 컴포넌트에서 데이터를 가져오는 비동기 함수
async function getItems(): Promise<ItemResponse[]> {
  try {
    // 서버 컴포넌트에서 직접 API 호출
    const data = await fetchData("/items");
    return data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    // 에러가 발생한 경우 빈 배열 반환
    return [];
  }
}

export default async function DataPage() {
  // 서버에서 데이터 가져오기
  const data = await getItems();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">데이터 목록</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="mt-2">{item.description}</p>
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
