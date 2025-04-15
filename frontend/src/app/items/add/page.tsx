"use server";
import { redirect } from "next/navigation";
import { postData } from "@/utils/api";

// 서버 액션: 폼 제출 처리
async function createItem(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name || !description) {
    throw new Error("이름과 설명은 필수 입력 항목입니다.");
  }

  await postData("/items", { name, description });

  // 완료 후 아이템 목록 페이지로 리다이렉션
  redirect("/items");
}

export default function AddItemPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">새 아이템 추가</h1>

      <form action={createItem} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded h-32"
            required
          ></textarea>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            저장
          </button>
          <a
            href="/items"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            취소
          </a>
        </div>
      </form>
    </div>
  );
}
