import TableData from "@/components/table-data";
import { supabase } from "@/libs/supabase-client";

type Content = {
  id: number;
  title: string;
  description: string;
};

async function getData(){
  const { data, error } = await supabase.from("content").select("*").eq("id", 1);

  console.log('Making request to Supabase');

  if (error) {
    throw error;
  }

  return data[0];
}

export default async function Home() {

  const data : Content = await getData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <TableData data={data} />
      </main>
    </div>
  );
}